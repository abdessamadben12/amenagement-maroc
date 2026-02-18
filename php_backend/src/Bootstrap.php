<?php
declare(strict_types=1);

use Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';

$root = dirname(__DIR__);
if (file_exists($root.'/.env')) {
  Dotenv::createImmutable($root)->load();
}

function envv(string $key, $default = null) {
  return $_ENV[$key] ?? $_SERVER[$key] ?? $default;
}

function json_response(array $payload, int $code = 200): void {
  http_response_code($code);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($payload, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
  exit;
}

function get_body_json(): array {
  $raw = file_get_contents('php://input');
  $data = json_decode($raw ?? '', true);
  return is_array($data) ? $data : [];
}

function is_prod(): bool {
  return strtolower((string)envv('APP_ENV', 'production')) === 'production';
}
