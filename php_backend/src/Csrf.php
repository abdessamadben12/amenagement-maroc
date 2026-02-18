<?php
declare(strict_types=1);

/**
 * CSRF "double-submission cookie":
 * - GET /api/csrf : génère un token, le met en cookie HttpOnly et le renvoie dans le JSON.
 * - POST : le client renvoie le token dans header "X-CSRF-Token".
 * - On compare header === cookie.
 */

function csrf_cookie_name(): string {
  return (string) envv('CSRF_COOKIE_NAME', 'csrf_token');
}

function csrf_issue_token(): string {
  $token = bin2hex(random_bytes(32));
  $secure = filter_var(envv('CSRF_SECURE', 'false'), FILTER_VALIDATE_BOOLEAN);
  $sameSite = (string) envv('CSRF_SAMESITE', 'lax'); // lax/none/strict

  setcookie(
    csrf_cookie_name(),
    $token,
    [
      'expires'  => time()+60*60, // 1h
      'path'     => '/',
      'secure'   => $secure,
      'httponly' => true,
      'samesite' => ucfirst(strtolower($sameSite))
    ]
  );
  return $token;
}

function csrf_validate_from_request(): bool {
  $cookie = $_COOKIE[csrf_cookie_name()] ?? '';
  $header = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  return is_string($cookie) && is_string($header) && hash_equals($cookie, $header);
}
