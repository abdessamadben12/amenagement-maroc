<?php
declare(strict_types=1);

/**
 * Crée ou met à jour un compte administrateur.
 * Usage : php bin/create-admin.php email@exemple.com ["Nom"]
 * Le mot de passe est demandé de façon interactive (12 caractères minimum).
 */

if (PHP_SAPI !== 'cli') {
  http_response_code(404);
  exit;
}

require __DIR__ . '/../src/Bootstrap.php';
require __DIR__ . '/../src/Database.php';
require __DIR__ . '/../src/Auth.php';

$email = mb_strtolower(trim((string)($argv[1] ?? '')));
$name = trim((string)($argv[2] ?? ''));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  fwrite(STDERR, "Usage : php bin/create-admin.php email@exemple.com [\"Nom\"]\n");
  exit(1);
}

function prompt_secret(string $label): string {
  fwrite(STDOUT, $label);
  $isWindows = PHP_OS_FAMILY === 'Windows';
  if (!$isWindows) shell_exec('stty -echo');
  $value = rtrim((string) fgets(STDIN), "\r\n");
  if (!$isWindows) shell_exec('stty echo');
  fwrite(STDOUT, "\n");
  return $value;
}

$password = getenv('ADMIN_PASSWORD') ?: prompt_secret('Mot de passe : ');
if (!getenv('ADMIN_PASSWORD') && prompt_secret('Confirmer : ') !== $password) {
  fwrite(STDERR, "Les mots de passe ne correspondent pas.\n");
  exit(1);
}
if (strlen($password) < 12) {
  fwrite(STDERR, "Le mot de passe doit contenir au moins 12 caractères.\n");
  exit(1);
}

$hash = password_hash($password, admin_password_algo());
$stmt = db()->prepare('SELECT id FROM admins WHERE email = ?');
$stmt->execute([$email]);
if ($id = $stmt->fetchColumn()) {
  db()->prepare('UPDATE admins SET password_hash = ?, name = COALESCE(NULLIF(?, \'\'), name) WHERE id = ?')->execute([$hash, $name, $id]);
  echo "Mot de passe mis à jour pour {$email}.\n";
} else {
  db()->prepare('INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)')->execute([$email, $hash, $name]);
  echo "Administrateur {$email} créé.\n";
}
