<?php
/**
 * Migrace šablon návštěv z localStorage do SQLite
 * Tento skript přijme JSON data šablon a uloží je do databáze
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

try {
    $db = getDB();
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['templates']) || !is_array($data['templates'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data format']);
        exit;
    }
    
    $migratedCount = 0;
    $errors = [];
    
    foreach ($data['templates'] as $template) {
        try {
            $stmt = $db->prepare("INSERT INTO visit_templates (name, description, services_data, products_data, created_at) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $template['name'],
                $template['description'] ?? '',
                json_encode($template['services']),
                json_encode($template['products'] ?? []),
                $template['createdAt'] ?? date('Y-m-d H:i:s')
            ]);
            $migratedCount++;
        } catch (PDOException $e) {
            $errors[] = "Template '{$template['name']}': " . $e->getMessage();
        }
    }
    
    echo json_encode([
        'success' => true,
        'migrated' => $migratedCount,
        'total' => count($data['templates']),
        'errors' => $errors
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
