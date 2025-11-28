<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Zpracování OPTIONS požadavku
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

try {
    $db = getDB();
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch ($method) {
        case 'GET':
            // Načíst všechny šablony
            $stmt = $db->query("SELECT * FROM visit_templates ORDER BY created_at DESC");
            $templates = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Dekódovat JSON data
            foreach ($templates as &$template) {
                $template['id'] = (int)$template['id'];
                $template['services'] = json_decode($template['services_data'], true) ?: [];
                $template['products'] = json_decode($template['products_data'], true) ?: [];
                unset($template['services_data']);
                unset($template['products_data']);
            }
            
            echo json_encode($templates);
            break;
            
        case 'POST':
            // Vytvořit novou šablonu
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['name']) || !isset($data['services'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                exit;
            }
            
            $stmt = $db->prepare("INSERT INTO visit_templates (name, description, services_data, products_data) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['name'],
                $data['description'] ?? '',
                json_encode($data['services']),
                json_encode($data['products'] ?? [])
            ]);
            
            $templateId = $db->lastInsertId();
            
            // Načíst vytvořenou šablonu
            $stmt = $db->prepare("SELECT * FROM visit_templates WHERE id = ?");
            $stmt->execute([$templateId]);
            $template = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $template['id'] = (int)$template['id'];
            $template['services'] = json_decode($template['services_data'], true);
            $template['products'] = json_decode($template['products_data'], true);
            unset($template['services_data']);
            unset($template['products_data']);
            
            http_response_code(201);
            echo json_encode($template);
            break;
            
        case 'PUT':
            // Aktualizovat šablonu
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing template ID']);
                exit;
            }
            
            $stmt = $db->prepare("UPDATE visit_templates SET name = ?, description = ?, services_data = ?, products_data = ? WHERE id = ?");
            $stmt->execute([
                $data['name'],
                $data['description'] ?? '',
                json_encode($data['services']),
                json_encode($data['products'] ?? []),
                $data['id']
            ]);
            
            echo json_encode(['success' => true]);
            break;
            
        case 'DELETE':
            // Smazat šablonu
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            
            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing template ID']);
                exit;
            }
            
            $stmt = $db->prepare("DELETE FROM visit_templates WHERE id = ?");
            $stmt->execute([$id]);
            
            echo json_encode(['success' => true]);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
