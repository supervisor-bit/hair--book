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
        // Přidat sloupec received pokud chybí
        try { $db->exec("ALTER TABLE stock_order_items ADD COLUMN received INTEGER DEFAULT 0"); } catch (Exception $e) {}
        // Načíst všechny objednávky s položkami
        $stmt = $db->query("SELECT * FROM stock_orders ORDER BY date DESC, created_at DESC");
        $orders = $stmt->fetchAll();
        
        foreach ($orders as &$order) {
            // Načíst položky objednávky
            $stmt = $db->prepare("SELECT * FROM stock_order_items WHERE order_id = ?");
            $stmt->execute([$order['id']]);
            $order['items'] = $stmt->fetchAll();
            
            // Převést snake_case na camelCase
            $order['createdAt'] = $order['created_at'];
            unset($order['created_at']);
            
            foreach ($order['items'] as &$item) {
                $item['orderId'] = $item['order_id'];
                $item['productId'] = $item['product_id'];
                $item['productName'] = $item['product_name'];
                unset($item['order_id'], $item['product_id'], $item['product_name']);
            }
        }
        
        sendJson($orders);
        break;
        
    case 'POST':
        // Vytvořit novou objednávku
        $data = getJsonInput();
        
        $db->beginTransaction();
        try {
            // Vytvořit objednávku
            $stmt = $db->prepare("INSERT INTO stock_orders (date, status, note) VALUES (?, ?, ?)");
            $stmt->execute([
                $data['date'] ?? date('Y-m-d'),
                $data['status'] ?? 'pending',
                $data['note'] ?? ''
            ]);
            $orderId = $db->lastInsertId();
            
            // Přidat položky
            if (isset($data['items'])) {
                foreach ($data['items'] as $item) {
                    $stmt = $db->prepare("INSERT INTO stock_order_items (order_id, product_id, product_name, quantity, unit) VALUES (?, ?, ?, ?, ?)");
                    $stmt->execute([
                        $orderId,
                        $item['productId'],
                        $item['productName'],
                        $item['quantity'],
                        $item['unit']
                    ]);
                }
            }
            
            $db->commit();
            sendJson(['id' => $orderId], 201);
        } catch (Exception $e) {
            $db->rollBack();
            sendJson(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'PUT':
        $data = getJsonInput();
        // Pokud je požadavek na položku objednávky (odfajfknutí)
        if (!empty($data['itemId'])) {
            $stmt = $db->prepare("UPDATE stock_order_items SET received = ? WHERE id = ?");
            $stmt->execute([!empty($data['received']) ? 1 : 0, $data['itemId']]);
            sendJson(['success' => true]);
        } else {
            // Změnit status objednávky
            $stmt = $db->prepare("UPDATE stock_orders SET status = ?, note = ? WHERE id = ?");
            $stmt->execute([
                $data['status'] ?? 'pending',
                $data['note'] ?? '',
                $data['id']
            ]);
            sendJson(['success' => true]);
        }
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        
        $stmt = $db->prepare("DELETE FROM stock_orders WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(['success' => true]);
        break;
}
?>
