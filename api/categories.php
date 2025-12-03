<?php
require_once 'config.php';
session_start();
if (empty($_SESSION['hairbook_logged_in'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

switch ($method) {
    case 'GET':
        $stmt = $db->query("SELECT * FROM product_categories ORDER BY name");
        $categories = $stmt->fetchAll();
        sendJson(['success' => true, 'categories' => $categories]);
        break;
        
    case 'POST':
        $data = getJsonInput();
        $stmt = $db->prepare("INSERT INTO product_categories (name, icon, color) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $data['icon'], $data['color']]);
        sendJson(['id' => $db->lastInsertId()], 201);
        break;
        
    case 'PUT':
        $data = getJsonInput();
        // Upsert: pokud kategorie neexistuje, vlož ji
        $stmt = $db->prepare("SELECT COUNT(*) FROM product_categories WHERE id = ?");
        $stmt->execute([$data['id']]);
        $exists = $stmt->fetchColumn() > 0;

        if ($exists) {
            $stmt = $db->prepare("UPDATE product_categories SET name = ?, icon = ?, color = ? WHERE id = ?");
            $stmt->execute([$data['name'], $data['icon'], $data['color'], $data['id']]);
        } else {
            $stmt = $db->prepare("INSERT INTO product_categories (id, name, icon, color) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data['id'], $data['name'], $data['icon'], $data['color']]);
        }
        sendJson(['success' => true]);
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        
        $stmt = $db->prepare("DELETE FROM product_categories WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(['success' => true]);
        break;
}
?>
