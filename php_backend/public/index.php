<?php
declare(strict_types=1);

require __DIR__ . '/../src/Bootstrap.php';
require __DIR__ . '/../src/Cors.php';
require __DIR__ . '/../src/Csrf.php';
require __DIR__ . '/../src/RateLimiter.php';
require __DIR__ . '/../src/Validate.php';
require __DIR__ . '/../src/Mailer.php';

apply_cors(); // CORS + OPTIONS 200

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path   = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

// =================== Helpers ===================
function send_static_file(string $fullPath): void {
  if (!file_exists($fullPath) || !is_file($fullPath)) {
    http_response_code(404);
    exit;
  }

  // Détection MIME
  $mime = 'application/octet-stream';
  if (function_exists('finfo_open')) {
    $f = finfo_open(FILEINFO_MIME_TYPE);
    if ($f) {
      $detected = finfo_file($f, $fullPath);
      if ($detected) $mime = $detected;
      finfo_close($f);
    }
  } else {
    $ext = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
    $map = [
      'html'=>'text/html; charset=UTF-8','htm'=>'text/html; charset=UTF-8',
      'css'=>'text/css; charset=UTF-8','js'=>'application/javascript; charset=UTF-8',
      'mjs'=>'application/javascript; charset=UTF-8','json'=>'application/json; charset=UTF-8',
      'svg'=>'image/svg+xml','png'=>'image/png','jpg'=>'image/jpeg','jpeg'=>'image/jpeg',
      'gif'=>'image/gif','webp'=>'image/webp','ico'=>'image/x-icon',
      'woff'=>'font/woff','woff2'=>'font/woff2','map'=>'application/json; charset=UTF-8',
      'txt'=>'text/plain; charset=UTF-8'
    ];
    if (isset($map[$ext])) $mime = $map[$ext];
  }

  // Nettoyer le buffer de sortie pour éviter la corruption
  if (ob_get_level()) {
    ob_clean();
  }
  
  header('Content-Type: '.$mime);
  // Cache long pour assets fingerprintés
  header('Cache-Control: public, max-age=31536000, immutable');
  
  // Vérifier la taille du fichier
  $filesize = filesize($fullPath);
  if ($filesize !== false) {
    header('Content-Length: ' . $filesize);
  }
  
  readfile($fullPath);
  exit;
}

function serve_react_index(string $distRoot): void {
  $index = $distRoot.'/index.html';
  if (!is_file($index)) {
    json_response(['ok'=>false,'message'=>'index.html non trouvé dans /dist'], 500);
  }
  header('Content-Type: text/html; charset=UTF-8');
  // Cache court pour HTML (déploiements)
  header('Cache-Control: public, max-age=60');
  readfile($index);
  exit;
}

// =================== Détection API ===================
$isApi = ($path === '/health') || (strpos($path, '/api/') === 0);

// =================== Rate limit (API seulement) ===================
if ($isApi) {
  $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
  if (!rate_limit_check('api:'.$ip)) {
    json_response(['ok'=>false,'message'=>'Trop de requêtes'], 429);
  }
}

// =================== ROUTES API ===================
if ($path === '/health' && $method === 'GET') {
  json_response(['ok'=>true]);
}

/* -------- GET /api/csrf -------- */
if ($path === '/api/csrf' && $method === 'GET') {
  $token = csrf_issue_token();
  json_response(['csrfToken' => $token]);
}

/* -------- POST /api/contact -------- */
if ($path === '/api/contact' && $method === 'POST') {
  if (!csrf_validate_from_request()) {
    $msg = 'Erreur de sécurité CORS/CSRF';
    if (!is_prod()) $msg .= ' (token invalide ou manquant)';
    json_response(['ok'=>false,'message'=>$msg], 403);
  }

  $body = get_body_json();
  $validated = validate_contact_payload($body);
  if (!$validated['valid']) {
    json_response(['ok'=>false,'errors'=>$validated['errors']], 400);
  }

  // honeypot
  if (!empty($validated['data']['website'])) {
    json_response(['ok'=>true,'message'=>'Merci !']);
  }

  try {
    send_contact_mail($validated['data']);
    json_response(['ok'=>true,'message'=>'Message envoyé']);
  } catch (Throwable $e) {
    error_log('ERR /api/contact: '.$e->getMessage());
    json_response(['ok'=>false,'message'=>'Erreur serveur'], 500);
  }
}

/* -------- POST /api/devis -------- */
if ($path === '/api/devis' && $method === 'POST') {
  if (!csrf_validate_from_request()) {
    $msg = 'Erreur de sécurité CORS/CSRF';
    if (!is_prod()) $msg .= ' (token invalide ou manquant)';
    json_response(['ok'=>false,'message'=>$msg], 403);
  }

  $body = get_body_json();
  $validated = validate_devis_payload($body);
  if (!$validated['valid']) {
    json_response(['ok'=>false,'errors'=>$validated['errors']], 400);
  }

  // honeypot
  if (!empty($validated['data']['website'])) {
    json_response(['ok'=>true,'message'=>'Merci !']);
  }

  try {
    send_devis_mail($validated['data']);
    json_response(['ok'=>true,'message'=>'Demande de devis envoyée']);
  } catch (Throwable $e) {
    error_log('ERR /api/devis: '.$e->getMessage());
    json_response(['ok'=>false,'message'=>'Erreur serveur'], 500);
  }
}

// =================== FRONT (SPA React) ===================
$distRoot = realpath(__DIR__.'/');
if ($distRoot === false) {
  json_response(['ok'=>false,'message'=>'Dossier /dist introuvable'], 500);
}

// Vérification du dossier dist
if (!is_dir($distRoot)) {
    json_response(['ok'=>false,'message'=>'Dossier /dist introuvable'], 500);
}

// Servir les fichiers statiques d'abord
if (!$isApi && ($method === 'GET' || $method === 'HEAD')) {
  
  // Essayer de servir le fichier directement depuis dist
  $requestedFile = $distRoot . $path;
  
  // Vérifier si le fichier existe directement
  if (file_exists($requestedFile) && is_file($requestedFile)) {
    send_static_file($requestedFile);
  }
  
  // Si non trouvé, chercher dans les sous-dossiers communs de React
  $assetPaths = [
    $path, // Chemin direct
    '/assets' . $path,
    '/static' . $path,
    '/assets/' . basename($path),
    '/static/' . basename($path),
    '/assets/js/' . basename($path),
    '/assets/css/' . basename($path),
    '/assets/images/' . basename($path),
    '/icons/' . basename($path),
    '/images/' . basename($path),
  ];
  
  foreach ($assetPaths as $assetPath) {
    $candidate = $distRoot . $assetPath;
    if (file_exists($candidate) && is_file($candidate)) {
      send_static_file($candidate);
    }
  }
  
  // Si c'est un fichier CSS/JS/IMAGE et non trouvé, essayer de le trouver par pattern
  $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
  if (in_array($extension, ['js', 'css', 'png', 'jpg', 'jpeg', 'svg', 'ico', 'woff', 'woff2'])) {
    
    // Chercher récursivement le fichier par son nom dans dist
    $filename = basename($path);
    $iterator = new RecursiveIteratorIterator(
      new RecursiveDirectoryIterator($distRoot)
    );
    
    foreach ($iterator as $file) {
      if ($file->isFile() && $file->getFilename() === $filename) {
        send_static_file($file->getRealPath());
      }
    }
  }
  
  // En dernier recours, servir index.html (SPA mode)
  serve_react_index($distRoot);
}

// Pour les autres méthodes (POST, PUT, etc.) sur des routes front → 405
if (!$isApi) {
  http_response_code(405);
  header('Allow: GET, HEAD');
  exit;
}

// Si on arrive ici et que c'est une API non gérée → 404
json_response(['ok'=>false,'message'=>'Not Found'], 404);