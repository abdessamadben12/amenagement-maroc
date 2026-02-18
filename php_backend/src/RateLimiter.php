<?php
declare(strict_types=1);

/**
 * Rate limit file-based par IP (compatible mutualisé).
 * Fenêtre glissante simple: on compte les timestamps récents dans un fichier.
 */
function rate_limit_check(string $key): bool {
  $dir = sys_get_temp_dir().'/php_rate_limits';
  if (!is_dir($dir)) @mkdir($dir, 0775, true);

  $file = $dir.'/'.md5($key).'.log';
  $now = time();
  $window = (int) envv('RATE_WINDOW', 900); // 15 min
  $max = (int) envv('RATE_MAX', 100);

  $entries = [];
  if (file_exists($file)) {
    $content = file($file, FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES) ?: [];
    foreach ($content as $line) {
      $t = (int) $line;
      if ($t >= $now - $window) $entries[] = $t;
    }
  }

  $entries[] = $now;

  if (count($entries) > $max) {
    return false; // bloqué
  }

  file_put_contents($file, implode("\n", $entries)."\n", LOCK_EX);
  return true;
}
