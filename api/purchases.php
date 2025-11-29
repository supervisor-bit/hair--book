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
        // Načíst nákupy klienta nebo všechny
        $clientId = $_GET['clientId'] ?? null;
        
        if ($clientId) {
            $stmt = $db->prepare("SELECT * FROM purchases WHERE client_id = ? ORDER BY date DESC, created_at DESC");
            $stmt->execute([$clientId]);
        } else {
            $stmt = $db->query("SELECT * FROM purchases ORDER BY date DESC, created_at DESC");
        }
        
        $purchases = $stmt->fetchAll();
        
        foreach ($purchases as &$purchase) {
            // Načíst položky nákupu
            $stmt = $db->prepare("SELECT * FROM purchase_items WHERE purchase_id = ?");
            $stmt->execute([$purchase['id']]);
            $purchase['items'] = $stmt->fetchAll();
            
            // Převést snake_case na camelCase
            $purchase['clientId'] = $purchase['client_id'];
            $purchase['customerName'] = $purchase['customer_name'];
            $purchase['createdAt'] = $purchase['created_at'];
            unset($purchase['client_id'], $purchase['customer_name'], $purchase['created_at']);
            
            foreach ($purchase['items'] as &$item) {
                $item['purchaseId'] = $item['purchase_id'];
                $item['productId'] = $item['product_id'];
                unset($item['purchase_id'], $item['product_id']);
            }
        }
        
        sendJson($purchases);
        break;
        
    case 'POST':
        $data = getJsonInput();
        
        $db->beginTransaction();
        try {
            // Vytvořit nákup
            $stmt = $db->prepare("INSERT INTO purchases (client_id, date, customer_name, total) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['clientId'] ?? null,
                $data['date'],
                $data['customerName'],
                $data['total']
            ]);
            $purchaseId = $db->lastInsertId();
            
            // Přidat položky
            if (isset($data['items'])) {
                foreach ($data['items'] as $item) {
                    $stmt = $db->prepare("INSERT INTO purchase_items (purchase_id, product_id, name, quantity, price, purpose) VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->execute([
                        $purchaseId,
                        $item['productId'],
                        $item['name'],
                        $item['quantity'],
                        $item['price'],
                        $item['purpose'] ?? 'sale'
                    ]);
                }
            }
            
            $db->commit();
            sendJson(['id' => $purchaseId], 201);
        } catch (Exception $e) {
            $db->rollBack();
            sendJson(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        
        $stmt = $db->prepare("DELETE FROM purchases WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(['success' => true]);
        break;
}
?>
