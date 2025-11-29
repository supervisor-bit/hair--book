<?php
require_once 'config.php';
session_start();
if (empty($_SESSION['hairbook_logged_in'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$db = getDB();
$dbFile = __DIR__ . '/hairbook.db';

try {
    // Seznam tabulek kromě interních
    $tablesStmt = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);
    
    $stats = [];
    foreach ($tables as $table) {
        $countStmt = $db->query("SELECT COUNT(*) AS cnt FROM {$table}");
        $count = (int)$countStmt->fetchColumn();
        $stats[] = [
            'name' => $table,
            'rows' => $count
        ];
    }
    
    $dbSize = file_exists($dbFile) ? filesize($dbFile) : 0;
    
    sendJson([
        'dbSizeBytes' => $dbSize,
        'tables' => $stats
    ]);
} catch (Exception $e) {
    sendJson(['error' => $e->getMessage()], 500);
}
