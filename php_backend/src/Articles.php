<?php
declare(strict_types=1);

const ARTICLE_PUBLIC_FIELDS = 'id, title, slug, excerpt, cover_image, category, published_at, updated_at';

function slugify(string $text): string {
  $text = trim($text);
  if (function_exists('transliterator_transliterate')) {
    $text = (string) transliterator_transliterate('Any-Latin; Latin-ASCII; Lower()', $text);
  } else {
    $text = strtr(mb_strtolower($text), [
      'à'=>'a','â'=>'a','ä'=>'a','á'=>'a','ã'=>'a','ç'=>'c','é'=>'e','è'=>'e','ê'=>'e','ë'=>'e',
      'î'=>'i','ï'=>'i','í'=>'i','ô'=>'o','ö'=>'o','ó'=>'o','õ'=>'o','ù'=>'u','û'=>'u','ü'=>'u','ú'=>'u',
      'ÿ'=>'y','ñ'=>'n','œ'=>'oe','æ'=>'ae','’'=>'-',"'"=>'-',
    ]);
  }
  $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
  return trim(substr($text, 0, 120), '-');
}

function unique_slug(string $base, ?int $ignoreId = null): string {
  $base = $base !== '' ? $base : 'article';
  $slug = $base;
  $i = 2;
  $stmt = db()->prepare('SELECT 1 FROM articles WHERE slug = ? AND id != ?');
  while (true) {
    $stmt->execute([$slug, $ignoreId ?? 0]);
    if (!$stmt->fetchColumn()) return $slug;
    $slug = $base.'-'.$i++;
  }
}

function validate_article_payload(array $in): array {
  $errors = [];
  $title = trim((string)($in['title'] ?? ''));
  $slug = slugify((string)($in['slug'] ?? ''));
  $excerpt = trim((string)($in['excerpt'] ?? ''));
  $category = trim((string)($in['category'] ?? ''));
  $coverImage = trim((string)($in['cover_image'] ?? ''));
  $status = (string)($in['status'] ?? 'draft');
  $content = sanitize_html((string)($in['content'] ?? ''));

  if (mb_strlen($title) < 3 || mb_strlen($title) > 200) $errors['title'] = 'Le titre doit contenir entre 3 et 200 caractères';
  if (mb_strlen($excerpt) > 500) $errors['excerpt'] = 'Le résumé ne doit pas dépasser 500 caractères';
  if (mb_strlen($category) > 60) $errors['category'] = 'Catégorie trop longue';
  if (!in_array($status, ['draft', 'published'], true)) $errors['status'] = 'Statut invalide';
  if ($coverImage !== '' && sanitize_url($coverImage, ['https']) === null) $errors['cover_image'] = 'Image de couverture invalide';
  if (mb_strlen($content) > 500000) $errors['content'] = 'Contenu trop long';
  if ($status === 'published' && trim(strip_tags($content)) === '' && !str_contains($content, '<img')) {
    $errors['content'] = 'Le contenu est vide';
  }

  return [
    'valid'  => empty($errors),
    'errors' => $errors,
    'data'   => [
      'title' => $title,
      'slug' => $slug !== '' ? $slug : slugify($title),
      'excerpt' => $excerpt,
      'category' => $category,
      'cover_image' => $coverImage,
      'status' => $status,
      'content' => $content,
    ],
  ];
}

function article_find(int $id): ?array {
  $stmt = db()->prepare('SELECT * FROM articles WHERE id = ?');
  $stmt->execute([$id]);
  return $stmt->fetch() ?: null;
}

function article_find_published_by_slug(string $slug): ?array {
  $stmt = db()->prepare("SELECT ".ARTICLE_PUBLIC_FIELDS.", content FROM articles WHERE slug = ? AND status = 'published'");
  $stmt->execute([$slug]);
  return $stmt->fetch() ?: null;
}

function articles_list_published(int $page, int $perPage): array {
  $total = (int) db()->query("SELECT COUNT(*) FROM articles WHERE status = 'published'")->fetchColumn();
  $stmt = db()->prepare("SELECT ".ARTICLE_PUBLIC_FIELDS." FROM articles WHERE status = 'published' ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?");
  $stmt->bindValue(1, $perPage, PDO::PARAM_INT);
  $stmt->bindValue(2, ($page - 1) * $perPage, PDO::PARAM_INT);
  $stmt->execute();
  return ['items' => $stmt->fetchAll(), 'total' => $total, 'page' => $page, 'perPage' => $perPage];
}

function articles_list_admin(): array {
  return db()->query('SELECT id, title, slug, category, status, published_at, updated_at FROM articles ORDER BY updated_at DESC')->fetchAll();
}

function article_save(array $data, int $authorId, ?int $id = null): array {
  $data['slug'] = unique_slug($data['slug'], $id);
  $existing = $id ? article_find($id) : null;
  // La date de publication est fixée à la première publication.
  $publishedAt = $existing['published_at'] ?? null;
  if ($data['status'] === 'published' && !$publishedAt) $publishedAt = gmdate('Y-m-d H:i:s');

  $params = [
    $data['title'], $data['slug'], $data['excerpt'], $data['content'],
    $data['cover_image'], $data['category'], $data['status'], $publishedAt,
  ];
  if ($id) {
    db()->prepare("UPDATE articles SET title=?, slug=?, excerpt=?, content=?, cover_image=?, category=?, status=?, published_at=?, updated_at=? WHERE id=?")
      ->execute([...$params, db_now(), $id]);
  } else {
    db()->prepare('INSERT INTO articles (title, slug, excerpt, content, cover_image, category, status, published_at, author_id) VALUES (?,?,?,?,?,?,?,?,?)')
      ->execute([...$params, $authorId]);
    $id = (int) db()->lastInsertId();
  }
  return article_find($id);
}

function article_delete(int $id): bool {
  $stmt = db()->prepare('DELETE FROM articles WHERE id = ?');
  $stmt->execute([$id]);
  return $stmt->rowCount() > 0;
}

/**
 * Upload d'image sécurisé : taille limitée, type MIME réel vérifié, nom aléatoire,
 * extension imposée par le type détecté (jamais celle du client).
 */
function handle_image_upload(array $file): string {
  $maxBytes = (int) envv('UPLOAD_MAX_BYTES', 5 * 1024 * 1024);
  if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) throw new InvalidArgumentException('Fichier manquant ou invalide');
  if (($file['size'] ?? 0) > $maxBytes) throw new InvalidArgumentException('Image trop lourde (max '.round($maxBytes / 1048576).' Mo)');
  if (!is_uploaded_file($file['tmp_name'])) throw new InvalidArgumentException('Fichier invalide');

  $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
  $extensions = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
  if (!isset($extensions[$mime]) || @getimagesize($file['tmp_name']) === false) {
    throw new InvalidArgumentException('Format non supporté (JPG, PNG, WebP ou GIF)');
  }

  $sub = gmdate('Y/m');
  // UPLOADS_DIR peut être défini par index.php (dossier public servi sous /uploads).
  $dir = (defined('UPLOADS_DIR') ? UPLOADS_DIR : __DIR__.'/../public/uploads').'/'.$sub;
  if (!is_dir($dir) && !mkdir($dir, 0755, true)) throw new RuntimeException('Impossible de créer le dossier uploads');

  $name = bin2hex(random_bytes(16)).'.'.$extensions[$mime];
  if (!move_uploaded_file($file['tmp_name'], $dir.'/'.$name)) throw new RuntimeException('Échec de l’enregistrement');
  @chmod($dir.'/'.$name, 0644);
  return '/uploads/'.$sub.'/'.$name;
}
