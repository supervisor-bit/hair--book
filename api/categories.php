<?php
session_start();
if (empty($_SESSION['hairbook_logged_in'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}
require_once 'config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

switch ($method) {
    case 'GET':
        $stmt = $db->query("SELECT * FROM product_categories ORDER BY name");
        sendJson($stmt->fetchAll());
        break;
        
    case 'POST':
        $data = getJsonInput();
        $stmt = $db->prepare("INSERT INTO product_categories (name, icon, color) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $data['icon'], $data['color']]);
        sendJson(['id' => $db->lastInsertId()], 201);
        break;
        
    case 'PUT':
        $data = getJsonInput();
        $stmt = $db->prepare("UPDATE product_categories SET name = ?, icon = ?, color = ? WHERE id = ?");
        $stmt->execute([$data['name'], $data['icon'], $data['color'], $data['id']]);
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
