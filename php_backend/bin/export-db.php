<?php
declare(strict_types=1);

/**
 * Exporte la base (admins + articles) en fichier .sql importable dans MySQL / phpMyAdmin.
 * Usage : php bin/export-db.php [--no-admins] [--out=chemin/fichier.sql]
 * Par défaut : storage/exports/amenagement-maroc-AAAAMMJJ-HHMMSS.sql
 */

if (PHP_SAPI !== 'cli') {
  http_response_code(404);
  exit;
}

require __DIR__ . '/../src/Bootstrap.php';
require __DIR__ . '/../src/Database.php';

$opts = getopt('', ['no-admins', 'out:']);
$out = $opts['out'] ?? dirname(__DIR__).'/storage/exports/amenagement-maroc-'.gmdate('Ymd-His').'.sql';
if (!is_dir(dirname($out))) mkdir(dirname($out), 0770, true);

/** Échappement compatible MySQL (le backslash est un caractère d'échappement en MySQL). */
function sql_value($v): string {
  if ($v === null) return 'NULL';
  if (is_int($v) || is_float($v)) return (string) $v;
  return "'".strtr((string) $v, ["\\" => "\\\\", "'" => "\'", "\0" => "\0", "\n" => "\n", "\r" => "\r", "\x1a" => "\Z"])."'";
}

$tables = isset($opts['no-admins']) ? ['articles'] : ['admins', 'articles'];
$sql = [
  '-- Export Aménagement Maroc — '.gmdate('Y-m-d H:i:s').' UTC (source : '.db_driver().')',
  '-- Import : phpMyAdmin > Importer, ou : mysql -u USER -p NOM_BASE < fichier.sql',
  'SET NAMES utf8mb4;',
  "SET time_zone = '+00:00';",
  'SET FOREIGN_KEY_CHECKS = 0;',
  '',
];
foreach (db_schema('mysql') as $create) {
  $sql[] = preg_replace('/^\s+/m', '  ', $create).';';
  $sql[] = '';
}

$counts = [];
foreach ($tables as $table) {
  $rows = db()->query("SELECT * FROM $table ORDER BY id")->fetchAll();
  $counts[$table] = count($rows);
  if (!$rows) continue;
  $columns = array_keys($rows[0]);
  $sql[] = "-- $table";
  foreach ($rows as $row) {
    $values = array_map(fn($c) => sql_value($c === 'id' || $c === 'author_id' ? ($row[$c] === null ? null : (int) $row[$c]) : $row[$c]), $columns);
    $sql[] = "REPLACE INTO `$table` (`".implode('`, `', $columns)."`) VALUES (".implode(', ', $values).');';
  }
  $sql[] = '';
}
$sql[] = 'SET FOREIGN_KEY_CHECKS = 1;';

file_put_contents($out, implode("\n", $sql)."\n");
echo "Export terminé : $out\n";
foreach ($counts as $t => $n) echo "  - $t : $n ligne(s)\n";
if (!isset($opts['no-admins'])) echo "Attention : le fichier contient les comptes admin (mots de passe hachés). Ne le publiez pas.\n";
