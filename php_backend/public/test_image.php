<?php
require __DIR__ . '/../src/Bootstrap.php';
$configuredDist = (string) envv('FRONTEND_DIST', dirname(__DIR__, 2).'/dist');
$distRoot = realpath($configuredDist);
$requestedPath = '/images/bg-black.svg';
$normalizedPath = str_replace('\\', '/', rawurldecode($requestedPath));
$candidate = realpath($distRoot.'/'.ltrim($normalizedPath, '/'));
$publicPrefix = rtrim($distRoot, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;

header('Content-Type: text/plain');
echo "configuredDist: " . $configuredDist . "\n";
echo "distRoot: " . $distRoot . "\n";
echo "candidate: " . $candidate . "\n";
echo "publicPrefix: " . $publicPrefix . "\n";
echo "starts_with: " . (str_starts_with($candidate, $publicPrefix) ? 'true' : 'false') . "\n";
echo "is_file: " . (is_file($candidate) ? 'true' : 'false') . "\n";
