<?php
declare(strict_types=1);

/**
 * Authentification admin par session PHP :
 * - cookie HttpOnly + SameSite=Strict (+ Secure en production)
 * - régénération de l'ID de session à la connexion
 * - expiration d'inactivité et durée de vie absolue
 * - jeton CSRF lié à la session pour toutes les requêtes admin modifiantes
 * - limitation des tentatives de connexion par IP et par email
 */

const ADMIN_IDLE_TIMEOUT = 2 * 60 * 60;   // 2h sans activité
const ADMIN_MAX_LIFETIME = 12 * 60 * 60;  // 12h maximum

function admin_session_start(): void {
  if (session_status() === PHP_SESSION_ACTIVE) return;

  $secure = filter_var(envv('SESSION_SECURE', is_prod() ? 'true' : 'false'), FILTER_VALIDATE_BOOLEAN);
  ini_set('session.use_strict_mode', '1');
  ini_set('session.use_only_cookies', '1');
  ini_set('session.sid_length', '48');
  ini_set('session.sid_bits_per_character', '6');

  $savePath = dirname(__DIR__).'/storage/sessions';
  if (!is_dir($savePath)) @mkdir($savePath, 0770, true);
  if (is_dir($savePath) && is_writable($savePath)) session_save_path($savePath);

  session_name('am_admin');
  session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'secure'   => $secure,
    'httponly' => true,
    'samesite' => 'Strict',
  ]);
  session_start();
}

function admin_fingerprint(): string {
  return hash('sha256', (string)($_SERVER['HTTP_USER_AGENT'] ?? ''));
}

function admin_destroy_session(): void {
  admin_session_start();
  $_SESSION = [];
  $p = session_get_cookie_params();
  setcookie(session_name(), '', [
    'expires' => time() - 3600, 'path' => $p['path'], 'secure' => $p['secure'],
    'httponly' => true, 'samesite' => 'Strict',
  ]);
  session_destroy();
}

/** Retourne l'admin connecté ou null (et invalide les sessions expirées). */
function admin_current(): ?array {
  admin_session_start();
  $id = $_SESSION['admin_id'] ?? null;
  if (!$id) return null;

  $now = time();
  $expired = ($now - (int)($_SESSION['last_activity'] ?? 0)) > ADMIN_IDLE_TIMEOUT
    || ($now - (int)($_SESSION['login_time'] ?? 0)) > ADMIN_MAX_LIFETIME
    || !hash_equals((string)($_SESSION['fingerprint'] ?? ''), admin_fingerprint());
  if ($expired) {
    admin_destroy_session();
    return null;
  }
  $_SESSION['last_activity'] = $now;

  $stmt = db()->prepare('SELECT id, email, name FROM admins WHERE id = ?');
  $stmt->execute([(int)$id]);
  $admin = $stmt->fetch();
  if (!$admin) {
    admin_destroy_session();
    return null;
  }
  return $admin;
}

function admin_csrf_token(): string {
  admin_session_start();
  if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
  return $_SESSION['csrf'];
}

/** Bloque la requête si l'admin n'est pas connecté ou si le CSRF est invalide (méthodes modifiantes). */
function require_admin(string $method): array {
  $admin = admin_current();
  if (!$admin) json_response(['ok'=>false,'message'=>'Non authentifié'], 401);

  if (!in_array($method, ['GET','HEAD'], true)) {
    $header = (string)($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
    $token = (string)($_SESSION['csrf'] ?? '');
    if ($token === '' || !hash_equals($token, $header)) {
      json_response(['ok'=>false,'message'=>'Jeton de sécurité invalide'], 403);
    }
  }
  return $admin;
}

/** Vérifie les identifiants ; retourne l'admin ou null. Temps de réponse homogène. */
function admin_attempt_login(string $email, string $password): ?array {
  $stmt = db()->prepare('SELECT id, email, name, password_hash FROM admins WHERE email = ?');
  $stmt->execute([mb_strtolower(trim($email))]);
  $row = $stmt->fetch();

  // Hash factice pour éviter de révéler l'existence d'un compte via le temps de réponse.
  $hash = $row['password_hash'] ?? password_hash(random_bytes(16), admin_password_algo());
  $valid = password_verify($password, $hash);
  if (!$row || !$valid) return null;

  if (password_needs_rehash($row['password_hash'], admin_password_algo())) {
    db()->prepare('UPDATE admins SET password_hash = ? WHERE id = ?')
      ->execute([password_hash($password, admin_password_algo()), $row['id']]);
  }

  admin_session_start();
  session_regenerate_id(true);
  $_SESSION = [
    'admin_id'      => (int)$row['id'],
    'login_time'    => time(),
    'last_activity' => time(),
    'fingerprint'   => admin_fingerprint(),
    'csrf'          => bin2hex(random_bytes(32)),
  ];
  db()->prepare("UPDATE admins SET last_login_at = ? WHERE id = ?")->execute([db_now(), $row['id']]);

  unset($row['password_hash']);
  return $row;
}

/**
 * Modifie l'email et/ou le mot de passe de l'admin connecté.
 * Le mot de passe actuel est toujours exigé. Retourne ['errors' => [...]] ou ['admin' => [...]].
 */
function admin_update_account(int $adminId, array $in): array {
  $current = (string)($in['current_password'] ?? '');
  $email = mb_strtolower(trim((string)($in['email'] ?? '')));
  $name = trim((string)($in['name'] ?? ''));
  $newPassword = (string)($in['new_password'] ?? '');

  $stmt = db()->prepare('SELECT id, email, name, password_hash FROM admins WHERE id = ?');
  $stmt->execute([$adminId]);
  $row = $stmt->fetch();
  if (!$row) return ['errors' => ['current_password' => 'Compte introuvable']];

  if ($current === '' || strlen($current) > 1024 || !password_verify($current, $row['password_hash'])) {
    return ['errors' => ['current_password' => 'Mot de passe actuel incorrect'], 'wrong_password' => true];
  }

  $errors = [];
  if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 190) {
    $errors['email'] = 'Email invalide';
  } elseif ($email !== $row['email']) {
    $exists = db()->prepare('SELECT 1 FROM admins WHERE email = ? AND id != ?');
    $exists->execute([$email, $adminId]);
    if ($exists->fetchColumn()) $errors['email'] = 'Cet email est déjà utilisé';
  }
  if (mb_strlen($name) > 190) $errors['name'] = 'Nom trop long';
  if ($newPassword !== '') {
    if (strlen($newPassword) < 12) $errors['new_password'] = 'Le mot de passe doit contenir au moins 12 caractères';
    elseif (strlen($newPassword) > 1024) $errors['new_password'] = 'Mot de passe trop long';
    elseif (hash_equals($current, $newPassword)) $errors['new_password'] = 'Le nouveau mot de passe doit être différent de l’actuel';
  }
  if ($errors) return ['errors' => $errors];

  $hash = $newPassword !== '' ? password_hash($newPassword, admin_password_algo()) : $row['password_hash'];
  db()->prepare('UPDATE admins SET email = ?, name = ?, password_hash = ? WHERE id = ?')
    ->execute([$email, $name, $hash, $adminId]);

  // Nouvel identifiant de session après un changement d'identifiants.
  session_regenerate_id(true);
  $_SESSION['csrf'] = bin2hex(random_bytes(32));

  return ['admin' => ['id' => $adminId, 'email' => $email, 'name' => $name], 'password_changed' => $newPassword !== ''];
}

function admin_password_algo(): string|int {
  return defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_BCRYPT;
}

/** Compteur d'échecs de connexion (fichier), séparé du rate limit général. */
function login_throttle_key(string $kind, string $value): string {
  return sys_get_temp_dir().'/php_rate_limits/login_'.md5($kind.':'.$value).'.json';
}

function login_is_locked(string $ip, string $email): bool {
  $max = (int) envv('LOGIN_MAX_ATTEMPTS', 5);
  $window = (int) envv('LOGIN_LOCK_WINDOW', 900);
  foreach ([['ip', $ip, $max * 3], ['email', mb_strtolower($email), $max]] as [$kind, $value, $limit]) {
    $file = login_throttle_key($kind, $value);
    if (!is_file($file)) continue;
    $entries = array_filter(json_decode((string)file_get_contents($file), true) ?: [], fn($t) => $t > time() - $window);
    if (count($entries) >= $limit) return true;
  }
  return false;
}

function login_record_failure(string $ip, string $email): void {
  $window = (int) envv('LOGIN_LOCK_WINDOW', 900);
  $dir = sys_get_temp_dir().'/php_rate_limits';
  if (!is_dir($dir)) @mkdir($dir, 0775, true);
  foreach ([['ip', $ip], ['email', mb_strtolower($email)]] as [$kind, $value]) {
    $file = login_throttle_key($kind, $value);
    $entries = is_file($file) ? (json_decode((string)file_get_contents($file), true) ?: []) : [];
    $entries = array_values(array_filter($entries, fn($t) => $t > time() - $window));
    $entries[] = time();
    file_put_contents($file, json_encode($entries), LOCK_EX);
  }
}

function login_clear_failures(string $email): void {
  @unlink(login_throttle_key('email', mb_strtolower($email)));
}
