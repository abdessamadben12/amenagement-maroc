<?php
function vite_assets(string $entry) {
    $manifestPath = __DIR__ . '/manifest.json';
     if (!file_exists($manifestPath)) {
        return null;
    }

    $manifest = json_decode(file_get_contents($manifestPath), true);

    if (!isset($manifest[$entry])) {
        return null;
    }

    return '/dist/' . $manifest[$entry]['file'];

}



?>
