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
        $stmt = $db->query("SELECT * FROM services ORDER BY name");
        sendJson($stmt->fetchAll());
        break;
        
    case 'POST':
        $data = getJsonInput();
        $stmt = $db->prepare("INSERT INTO services (name, description, duration) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $data['description'] ?? '', $data['duration']]);
        sendJson(['id' => $db->lastInsertId()], 201);
        break;
        
    case 'PUT':
        $data = getJsonInput();
        $stmt = $db->prepare("UPDATE services SET name = ?, description = ?, duration = ? WHERE id = ?");
        $stmt->execute([$data['name'], $data['description'] ?? '', $data['duration'], $data['id']]);
        sendJson(['success' => true]);
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        
        $stmt = $db->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(['success' => true]);
        break;
}
?>
