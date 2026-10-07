<?php
declare(strict_types=1);

require __DIR__ . '/../src/Bootstrap.php';
require __DIR__ . '/../src/Cors.php';
require __DIR__ . '/../src/Csrf.php';
require __DIR__ . '/../src/RateLimiter.php';
require __DIR__ . '/../src/Validate.php';
require __DIR__ . '/../src/Mailer.php';
require __DIR__ . '/../src/Database.php';
require __DIR__ . '/../src/Auth.php';
require __DIR__ . '/../src/HtmlSanitizer.php';
require __DIR__ . '/../src/Articles.php';

apply_cors(); // CORS + OPTIONS 200

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path   = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

if (str_contains($_SERVER['REQUEST_URI'] ?? '', 'diag_path')) {
  require __DIR__ . '/test_image.php';
  exit;
}

// =================== Helpers ===================
function client_accepts_gzip(): bool {
  return function_exists('gzencode')
    && str_contains($_SERVER['HTTP_ACCEPT_ENCODING'] ?? '', 'gzip');
}

function send_static_file(string $fullPath): void {
  if (!file_exists($fullPath) || !is_file($fullPath)) {
    http_response_code(404);
    exit;
  }

  // Détection MIME : l'extension d'abord (finfo renvoie text/plain pour les .js/.css,
  // ce que les navigateurs refusent pour les modules), finfo en dernier recours.
  $mime = 'application/octet-stream';
  $ext = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
  $map = [
    'html'=>'text/html; charset=UTF-8','htm'=>'text/html; charset=UTF-8',
    'css'=>'text/css; charset=UTF-8','js'=>'application/javascript; charset=UTF-8',
    'mjs'=>'application/javascript; charset=UTF-8','json'=>'application/json; charset=UTF-8',
    'svg'=>'image/svg+xml','png'=>'image/png','jpg'=>'image/jpeg','jpeg'=>'image/jpeg',
    'gif'=>'image/gif','webp'=>'image/webp','avif'=>'image/avif','ico'=>'image/x-icon',
    'woff'=>'font/woff','woff2'=>'font/woff2','map'=>'application/json; charset=UTF-8',
    'txt'=>'text/plain; charset=UTF-8','xml'=>'application/xml; charset=UTF-8'
  ];
  if (isset($map[$ext])) {
    $mime = $map[$ext];
  } elseif (function_exists('finfo_open')) {
    $f = finfo_open(FILEINFO_MIME_TYPE);
    if ($f) {
      $detected = finfo_file($f, $fullPath);
      if ($detected) $mime = $detected;
      finfo_close($f);
    }
  }

  // Nettoyer le buffer de sortie pour éviter la corruption
  if (ob_get_level()) {
    ob_clean();
  }
  
  header('Content-Type: '.$mime);
  // Cache long pour assets fingerprintés
  header('Cache-Control: public, max-age=31536000, immutable');

  $compressible = str_starts_with($mime, 'text/')
    || in_array(strtok($mime, ';'), ['application/javascript', 'application/json', 'image/svg+xml'], true);
  if ($compressible && client_accepts_gzip()) {
    $content = file_get_contents($fullPath);
    if ($content !== false) {
      $encoded = gzencode($content, 6);
      if ($encoded !== false) {
        header('Content-Encoding: gzip');
        header('Vary: Accept-Encoding');
        header('Content-Length: '.strlen($encoded));
        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') {
          echo $encoded;
        }
        exit;
      }
    }
  }

  $filesize = filesize($fullPath);
  if ($filesize !== false) {
    header('Content-Length: '.$filesize);
  }
  
  if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') {
    readfile($fullPath);
  }
  exit;
}

function resolve_public_file(string $distRoot, string $requestedPath): string|false {
  $normalizedPath = str_replace('\\', '/', rawurldecode($requestedPath));
  $candidate = realpath($distRoot.'/'.ltrim($normalizedPath, '/'));
  if ($candidate === false || !is_file($candidate)) {
    return false;
  }

  $publicPrefix = rtrim($distRoot, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
  if (!str_starts_with($candidate, $publicPrefix)) {
    return false;
  }

  return $candidate;
}

function serve_html_file(string $file, int $status = 200): void {
  if (!is_file($file)) {
    json_response(['ok'=>false,'message'=>'Fichier HTML introuvable'], 500);
  }
  http_response_code($status);
  header('Content-Type: text/html; charset=UTF-8');
  header('Cache-Control: public, max-age=300, must-revalidate');
  if (client_accepts_gzip()) {
    $content = file_get_contents($file);
    if ($content !== false) {
      $encoded = gzencode($content, 6);
      if ($encoded !== false) {
        header('Content-Encoding: gzip');
        header('Vary: Accept-Encoding');
        header('Content-Length: '.strlen($encoded));
        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') {
          echo $encoded;
        }
        exit;
      }
    }
  }
  if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') {
    readfile($file);
  }
  exit;
}

/** Remplit la coquille HTML (racine vide) avec les balises <head> d'une page dynamique. */
function render_shell(string $shellFile, array $seo): string {
  $html = (string) file_get_contents($shellFile);
  $e = fn($v) => htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
  $head = [
    '<title>'.$e($seo['title']).'</title>',
    '<meta name="description" content="'.$e($seo['description']).'" />',
    '<meta name="robots" content="'.$e($seo['robots']).'" />',
    '<meta property="og:title" content="'.$e($seo['title']).'" />',
    '<meta property="og:description" content="'.$e($seo['description']).'" />',
    '<meta property="og:type" content="'.$e($seo['type'] ?? 'website').'" />',
    '<meta name="twitter:card" content="summary_large_image" />',
  ];
  if (!empty($seo['canonical'])) {
    $head[] = '<link rel="canonical" href="'.$e($seo['canonical']).'" />';
    $head[] = '<meta property="og:url" content="'.$e($seo['canonical']).'" />';
  }
  if (!empty($seo['image'])) {
    $head[] = '<meta property="og:image" content="'.$e($seo['image']).'" />';
    $head[] = '<meta name="twitter:image" content="'.$e($seo['image']).'" />';
  }
  if (!empty($seo['schema'])) {
    $json = json_encode(array_filter($seo['schema']), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG);
    $head[] = '<script type="application/ld+json">'.$json.'</script>';
  }
  return preg_replace_callback('/<meta name="seo-head-marker"[^>]*>/', fn() => implode("\n    ", $head), $html, 1) ?? $html;
}

// =================== Détection API ===================
$isApi = ($path === '/health') || (strpos($path, '/api/') === 0);

// =================== Rate limit (API seulement) ===================
if ($isApi) {
  $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
  // L'espace admin a son propre compteur (l'édition génère plus de requêtes).
  $isAdminApi = str_starts_with($path, '/api/admin/');
  if (!rate_limit_check(($isAdminApi ? 'admin:' : 'api:').$ip, $isAdminApi ? (int) envv('ADMIN_RATE_MAX', 600) : null)) {
    json_response(['ok'=>false,'message'=>'Trop de requêtes'], 429);
  }
}

// =================== ROUTES API ===================
if ($path === '/health' && $method === 'GET') {
  json_response(['ok'=>true]);
}

// Ancienne adresse du blog : /blog(/slug) → /articles(/slug)
if (preg_match('~^/blog(/[a-z0-9-]{1,140})?/?$~', $path, $m) && ($method === 'GET' || $method === 'HEAD')) {
  header('Location: /articles'.($m[1] ?? ''), true, 301);
  exit;
}

if ($path === '/services/revonation' && ($method === 'GET' || $method === 'HEAD')) {
  header('Location: /services/renovation', true, 301);
  exit;
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

// =================== ARTICLES (public) ===================

/* -------- GET /api/articles?page=1 -------- */
if ($path === '/api/articles' && $method === 'GET') {
  $page = max(1, (int)($_GET['page'] ?? 1));
  $perPage = min(50, max(1, (int)($_GET['perPage'] ?? 9)));
  json_response(['ok'=>true] + articles_list_published($page, $perPage));
}

/* -------- GET /api/articles/{slug} -------- */
if ($method === 'GET' && preg_match('~^/api/articles/([a-z0-9-]{1,140})$~', $path, $m)) {
  $article = article_find_published_by_slug($m[1]);
  if (!$article) json_response(['ok'=>false,'message'=>'Article introuvable'], 404);
  json_response(['ok'=>true,'article'=>$article]);
}

// =================== ADMIN ===================
if (str_starts_with($path, '/api/admin/')) {
  header('Cache-Control: no-store');

  /* -------- POST /api/admin/login -------- */
  if ($path === '/api/admin/login' && $method === 'POST') {
    if (!csrf_validate_from_request()) json_response(['ok'=>false,'message'=>'Jeton de sécurité invalide'], 403);

    $body = get_body_json();
    $email = trim((string)($body['email'] ?? ''));
    $password = (string)($body['password'] ?? '');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    if (login_is_locked($ip, $email)) {
      json_response(['ok'=>false,'message'=>'Trop de tentatives. Réessayez dans 15 minutes.'], 429);
    }
    if (!email_ok($email) || $password === '' || strlen($password) > 1024) {
      login_record_failure($ip, $email);
      json_response(['ok'=>false,'message'=>'Email ou mot de passe incorrect'], 401);
    }

    $admin = admin_attempt_login($email, $password);
    if (!$admin) {
      login_record_failure($ip, $email);
      json_response(['ok'=>false,'message'=>'Email ou mot de passe incorrect'], 401);
    }
    login_clear_failures($email);
    json_response(['ok'=>true,'admin'=>$admin,'csrfToken'=>admin_csrf_token()]);
  }

  /* -------- GET /api/admin/me -------- */
  if ($path === '/api/admin/me' && $method === 'GET') {
    $admin = admin_current();
    if (!$admin) json_response(['ok'=>false,'message'=>'Non authentifié'], 401);
    json_response(['ok'=>true,'admin'=>$admin,'csrfToken'=>admin_csrf_token()]);
  }

  /* -------- POST /api/admin/logout -------- */
  if ($path === '/api/admin/logout' && $method === 'POST') {
    require_admin($method);
    admin_destroy_session();
    json_response(['ok'=>true]);
  }

  $admin = require_admin($method);

  /* -------- PUT /api/admin/account (email, nom, mot de passe) -------- */
  if ($path === '/api/admin/account' && $method === 'PUT') {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (login_is_locked($ip, $admin['email'])) {
      json_response(['ok'=>false,'message'=>'Trop de tentatives. Réessayez dans 15 minutes.'], 429);
    }
    $result = admin_update_account((int)$admin['id'], get_body_json());
    if (!empty($result['wrong_password'])) login_record_failure($ip, $admin['email']);
    if (isset($result['errors'])) {
      json_response(['ok'=>false,'message'=>'Formulaire invalide','errors'=>$result['errors']], 400);
    }
    json_response(['ok'=>true,'admin'=>$result['admin'],'csrfToken'=>admin_csrf_token(),'passwordChanged'=>$result['password_changed']]);
  }

  /* -------- GET|POST /api/admin/articles -------- */
  if ($path === '/api/admin/articles') {
    if ($method === 'GET') json_response(['ok'=>true,'items'=>articles_list_admin()]);
    if ($method === 'POST') {
      $v = validate_article_payload(get_body_json());
      if (!$v['valid']) json_response(['ok'=>false,'message'=>'Formulaire invalide','errors'=>$v['errors']], 400);
      json_response(['ok'=>true,'article'=>article_save($v['data'], (int)$admin['id'])], 201);
    }
  }

  /* -------- GET|PUT|DELETE /api/admin/articles/{id} -------- */
  if (preg_match('~^/api/admin/articles/(\d{1,10})$~', $path, $m)) {
    $id = (int)$m[1];
    if (!article_find($id)) json_response(['ok'=>false,'message'=>'Article introuvable'], 404);

    if ($method === 'GET') json_response(['ok'=>true,'article'=>article_find($id)]);
    if ($method === 'PUT') {
      $v = validate_article_payload(get_body_json());
      if (!$v['valid']) json_response(['ok'=>false,'message'=>'Formulaire invalide','errors'=>$v['errors']], 400);
      json_response(['ok'=>true,'article'=>article_save($v['data'], (int)$admin['id'], $id)]);
    }
    if ($method === 'DELETE') {
      article_delete($id);
      json_response(['ok'=>true]);
    }
  }

  /* -------- POST /api/admin/uploads (multipart, champ "image") -------- */
  if ($path === '/api/admin/uploads' && $method === 'POST') {
    try {
      json_response(['ok'=>true,'url'=>handle_image_upload($_FILES['image'] ?? [])], 201);
    } catch (InvalidArgumentException $e) {
      json_response(['ok'=>false,'message'=>$e->getMessage()], 400);
    } catch (Throwable $e) {
      error_log('ERR upload: '.$e->getMessage());
      json_response(['ok'=>false,'message'=>'Erreur serveur'], 500);
    }
  }

  json_response(['ok'=>false,'message'=>'Not Found'], 404);
}

/* -------- GET /sitemap-articles.xml -------- */
if ($path === '/sitemap-articles.xml' && ($method === 'GET' || $method === 'HEAD')) {
  $site = rtrim((string) envv('SITE_URL', 'https://amenagement-maroc.com'), '/');
  $rows = db()->query("SELECT slug, updated_at FROM articles WHERE status = 'published' ORDER BY published_at DESC")->fetchAll();
  header('Content-Type: application/xml; charset=UTF-8');
  header('Cache-Control: public, max-age=3600');
  echo '<?xml version="1.0" encoding="UTF-8"?>'."\n".'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
  foreach ($rows as $r) {
    echo '  <url><loc>'.escape_html($site.'/articles/'.$r['slug']).'</loc><lastmod>'.substr($r['updated_at'], 0, 10).'</lastmod></url>'."\n";
  }
  echo '</urlset>';
  exit;
}

/* -------- Fichiers uploadés (utile avec `php -S` ; Apache les sert directement) -------- */
if (str_starts_with($path, '/uploads/') && ($method === 'GET' || $method === 'HEAD')) {
  $uploadsRoot = realpath(__DIR__.'/uploads');
  $file = $uploadsRoot ? resolve_public_file($uploadsRoot, substr($path, strlen('/uploads'))) : false;
  if ($file === false || !preg_match('/\.(jpe?g|png|webp|gif)$/i', $file)) {
    http_response_code(404);
    exit;
  }
  header('X-Content-Type-Options: nosniff');
  send_static_file($file);
}

// =================== FRONT (SPA React) ===================
$configuredDist = (string) envv('FRONTEND_DIST', dirname(__DIR__, 2).'/dist');
if (!preg_match('~^(?:[A-Za-z]:[\\\\/]|/)~', $configuredDist)) {
  $configuredDist = dirname(__DIR__).'/'.$configuredDist;
}
$distRoot = realpath($configuredDist);
if ($distRoot === false) {
  $distRoot = realpath(__DIR__.'/');
}
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
  $requestedFile = resolve_public_file($distRoot, $path);
  
  // Vérifier si le fichier existe directement
  if ($requestedFile !== false) {
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
    $candidate = resolve_public_file($distRoot, $assetPath);
    if ($candidate !== false) {
      send_static_file($candidate);
    }
  }
  
  // Si c'est un fichier CSS/JS/IMAGE et non trouvé, essayer de le trouver par pattern
  $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
  if (in_array($extension, ['js', 'css', 'png', 'jpg', 'jpeg', 'webp', 'avif', 'svg', 'ico', 'woff', 'woff2'])) {
    
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
  
  // Servir le HTML prérendu correspondant à la route.
  $routeIndexPath = rtrim($path, '/').'/index.html';
  if ($path === '/') {
    $routeIndexPath = '/index.html';
  }
  $routeIndex = resolve_public_file($distRoot, $routeIndexPath);
  if ($routeIndex !== false) {
    serve_html_file($routeIndex);
  }

  // Routes dynamiques : coquille SPA (générée par le prérendu) + balises SEO injectées.
  $shell = resolve_public_file($distRoot, '/_shell.html');
  if ($shell !== false && ($path === '/admin' || str_starts_with($path, '/admin/'))) {
    header('X-Robots-Tag: noindex, nofollow');
    header('Cache-Control: no-store');
    echo render_shell($shell, [
      'title' => 'Administration | Aménagement Maroc',
      'description' => 'Espace d’administration',
      'robots' => 'noindex, nofollow',
    ]);
    exit;
  }
  if ($shell !== false && preg_match('~^/articles/([a-z0-9-]{1,140})/?$~', $path, $m)) {
    $article = article_find_published_by_slug($m[1]);
    if ($article) {
      $site = rtrim((string) envv('SITE_URL', 'https://amenagement-maroc.com'), '/');
      $description = $article['excerpt'] !== ''
        ? $article['excerpt']
        : mb_substr(trim(preg_replace('/\s+/', ' ', strip_tags($article['content'])) ?? ''), 0, 160);
      $image = $article['cover_image'] !== ''
        ? (str_starts_with($article['cover_image'], '/') ? $site.$article['cover_image'] : $article['cover_image'])
        : $site.'/logo_Aménagement.png';
      header('Cache-Control: public, max-age=300, must-revalidate');
      echo render_shell($shell, [
        'title' => $article['title'].' | Aménagement Maroc',
        'description' => $description,
        'robots' => 'index, follow',
        'canonical' => $site.'/articles/'.$article['slug'],
        'image' => $image,
        'type' => 'article',
        'schema' => [
          '@context' => 'https://schema.org',
          '@type' => 'BlogPosting',
          'headline' => $article['title'],
          'description' => $description,
          'image' => $image,
          'datePublished' => $article['published_at'] ? gmdate('c', strtotime($article['published_at'].' UTC')) : null,
          'dateModified' => gmdate('c', strtotime($article['updated_at'].' UTC')),
          'mainEntityOfPage' => $site.'/articles/'.$article['slug'],
          'publisher' => ['@type' => 'Organization', 'name' => 'Aménagement Maroc', 'logo' => $site.'/logo_Aménagement.png'],
        ],
      ]);
      exit;
    }
  }

  // Une route inconnue doit renvoyer un vrai statut HTTP 404.
  $notFound = resolve_public_file($distRoot, '/404.html');
  if ($notFound !== false) {
    serve_html_file($notFound, 404);
  }

  json_response(['ok'=>false,'message'=>'Page introuvable'], 404);
}

// Pour les autres méthodes (POST, PUT, etc.) sur des routes front → 405
if (!$isApi) {
  http_response_code(405);
  header('Allow: GET, HEAD');
  exit;
}

// Si on arrive ici et que c'est une API non gérée → 404
json_response(['ok'=>false,'message'=>'Not Found'], 404);
