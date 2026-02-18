<?php
declare(strict_types=1);

function parse_origins(): array {
  $orig = (string) envv('CORS_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000');
  return array_values(array_filter(array_map('trim', explode(',', $orig))));
}

function is_origin_allowed(?string $origin): bool {
  if (!$origin) return false;
  $list = parse_origins();
  if (in_array($origin, $list, true)) return true;

  // support *.domaine.com
  foreach ($list as $allowed) {
    if (str_starts_with($allowed, '*.')) {
      $domain = ltrim(substr($allowed, 2), '.');
      $host = parse_url($origin, PHP_URL_HOST) ?? '';
      if ($host === $domain || str_ends_with($host, '.'.$domain)) return true;
    }
  }
  return false;
}

function apply_cors(): void {
  $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
  if ($origin && is_origin_allowed($origin)) {
    header('Access-Control-Allow-Origin: '.$origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
  }

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
  }
}
