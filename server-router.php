<?php
// Jednoduchý router pro vestavěný PHP server.
// Blokuje přístup k citlivým souborům (např. .db) a zároveň obsluhuje statiky.

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = __DIR__;

// Zablokovat přístup k databázím a skrytým souborům
if (preg_match('~\\.db$~i', $uri) || preg_match('~/\\.[^/]+$~', $uri)) {
    http_response_code(404);
    exit;
}

// Pokud soubor existuje, nechat ho obsloužit vestavěným serverem
$filePath = realpath($basePath . $uri);
if ($filePath && is_file($filePath) && str_starts_with($filePath, $basePath)) {
    return false;
}

// API soubory
if (str_starts_with($uri, '/api/')) {
    $apiFile = $basePath . $uri;
    if (is_file($apiFile)) {
        require $apiFile;
        return;
    }
    http_response_code(404);
    echo 'Not Found';
    return;
}

// Výchozí: obsloužit SPA index.html
require $basePath . '/index.html';
