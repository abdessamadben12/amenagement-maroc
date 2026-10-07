<?php
declare(strict_types=1);

/**
 * Connexion PDO unique. Deux moteurs au choix via DB_DRIVER dans .env :
 * - sqlite (défaut) : fichier DB_PATH, relatif à php_backend/, aucun serveur nécessaire
 * - mysql : DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS (hébergement mutualisé, phpMyAdmin…)
 * Les tables sont créées automatiquement à la première connexion.
 */
function db(): PDO {
  static $pdo = null;
  if ($pdo instanceof PDO) return $pdo;

  $options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
  ];

  if (db_driver() === 'mysql') {
    $dsn = sprintf(
      'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
      (string) envv('DB_HOST', '127.0.0.1'),
      (int) envv('DB_PORT', 3306),
      (string) envv('DB_NAME', 'amenagement_maroc'),
    );
    $pdo = new PDO($dsn, (string) envv('DB_USER', 'root'), (string) envv('DB_PASS', ''), $options);
    $pdo->exec("SET time_zone = '+00:00'");
  } else {
    $path = (string) envv('DB_PATH', 'storage/database.sqlite');
    if (!preg_match('~^(?:[A-Za-z]:[\\\\/]|/)~', $path)) {
      $path = dirname(__DIR__).'/'.$path;
    }
    $dir = dirname($path);
    if (!is_dir($dir)) @mkdir($dir, 0770, true);

    $pdo = new PDO('sqlite:'.$path, null, null, $options);
    $pdo->exec('PRAGMA foreign_keys = ON');
    $pdo->exec('PRAGMA journal_mode = WAL');
  }

  db_migrate($pdo);
  return $pdo;
}

function db_driver(): string {
  return strtolower((string) envv('DB_DRIVER', 'sqlite')) === 'mysql' ? 'mysql' : 'sqlite';
}

/** Date courante UTC au format SQL (identique pour SQLite et MySQL). */
function db_now(): string {
  return gmdate('Y-m-d H:i:s');
}

function db_schema(string $driver): array {
  if ($driver === 'mysql') {
    return [
      "CREATE TABLE IF NOT EXISTS admins (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(190) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(190) NOT NULL DEFAULT '',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_login_at DATETIME NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
      "CREATE TABLE IF NOT EXISTS articles (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(190) NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content MEDIUMTEXT NOT NULL,
        cover_image VARCHAR(500) NOT NULL DEFAULT '',
        category VARCHAR(100) NOT NULL DEFAULT '',
        status ENUM('draft','published') NOT NULL DEFAULT 'draft',
        author_id INT UNSIGNED NULL,
        published_at DATETIME NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_articles_status_pub (status, published_at),
        CONSTRAINT fk_articles_author FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci",
    ];
  }

  return [
    "CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      last_login_at TEXT
    )",
    "CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      cover_image TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
      author_id INTEGER REFERENCES admins(id) ON DELETE SET NULL,
      published_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )",
    "CREATE INDEX IF NOT EXISTS idx_articles_status_pub ON articles(status, published_at)",
  ];
}

function db_migrate(PDO $pdo): void {
  foreach (db_schema(db_driver()) as $sql) $pdo->exec($sql);
}
