<?php
require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');

function sendJson($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

function getJsonInput() {
    return json_decode(file_get_contents('php://input'), true);
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

try {
    switch ($method) {
        case 'GET':
            if ($id) {
                // Získat pohyby pro konkrétní produkt
                $stmt = $db->prepare("SELECT * FROM product_movements WHERE product_id = ? ORDER BY date DESC");
                $stmt->execute([$id]);
                $movements = $stmt->fetchAll(PDO::FETCH_ASSOC);
                sendJson($movements);
            } else {
                // Získat všechny pohyby
                $stmt = $db->query("SELECT * FROM product_movements ORDER BY date DESC");
                $movements = $stmt->fetchAll(PDO::FETCH_ASSOC);
                sendJson($movements);
            }
            break;

        case 'POST':
            // Vytvořit nový pohyb
            $data = getJsonInput();
            
            $stmt = $db->prepare("INSERT INTO product_movements (product_id, date, type, quantity, unit, note) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['product_id'],
                $data['date'],
                $data['type'],
                $data['quantity'],
                $data['unit'],
                $data['note'] ?? ''
            ]);
            
            sendJson(['id' => $db->lastInsertId()], 201);
            break;

        case 'DELETE':
            if (!$id) {
                sendJson(['error' => 'ID is required'], 400);
            }
            
            $stmt = $db->prepare("DELETE FROM product_movements WHERE id = ?");
            $stmt->execute([$id]);
            sendJson(['success' => true]);
            break;

        default:
            sendJson(['error' => 'Method not allowed'], 405);
    }
} catch (Exception $e) {
    sendJson(['error' => $e->getMessage()], 500);
}
