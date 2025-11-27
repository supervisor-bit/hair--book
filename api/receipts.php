<?php
require_once 'config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

switch ($method) {
    case 'GET':
        // Načíst všechny příjemky s položkami
        $stmt = $db->query("SELECT * FROM stock_receipts ORDER BY date DESC, created_at DESC");
        $receipts = $stmt->fetchAll();
        
        foreach ($receipts as &$receipt) {
            // Načíst položky příjemky
            $stmt = $db->prepare("SELECT * FROM stock_receipt_items WHERE receipt_id = ?");
            $stmt->execute([$receipt['id']]);
            $receipt['items'] = $stmt->fetchAll();
            
            // Převést snake_case na camelCase
            $receipt['createdAt'] = $receipt['created_at'];
            unset($receipt['created_at']);
            
            foreach ($receipt['items'] as &$item) {
                $item['receiptId'] = $item['receipt_id'];
                $item['productId'] = $item['product_id'];
                $item['productName'] = $item['product_name'];
                unset($item['receipt_id'], $item['product_id'], $item['product_name']);
            }
        }
        
        sendJson($receipts);
        break;
        
    case 'POST':
        // Vytvořit novou příjemku
        $data = getJsonInput();
        
        $db->beginTransaction();
        try {
            // Vytvořit příjemku
            $stmt = $db->prepare("INSERT INTO stock_receipts (date, note) VALUES (?, ?)");
            $stmt->execute([
                $data['date'] ?? date('Y-m-d'),
                $data['note'] ?? ''
            ]);
            $receiptId = $db->lastInsertId();
            
            // Přidat položky a aktualizovat stav skladu
            if (isset($data['items'])) {
                foreach ($data['items'] as $item) {
                    // Uložit položku příjemky
                    $stmt = $db->prepare("INSERT INTO stock_receipt_items (receipt_id, product_id, product_name, quantity, unit, note) VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->execute([
                        $receiptId,
                        $item['productId'],
                        $item['productName'],
                        $item['quantity'],
                        $item['unit'],
                        $item['note'] ?? ''
                    ]);
                    
                    // Aktualizovat stav produktu
                    $stmt = $db->prepare("SELECT stock, unit, package_size FROM products WHERE id = ?");
                    $stmt->execute([$item['productId']]);
                    $product = $stmt->fetch();
                    
                    if ($product) {
                        // Převést na základní jednotku pokud je potřeba
                        $quantityInBaseUnit = $item['quantity'];
                        
                        // Přidat do skladu
                        $stmt = $db->prepare("UPDATE products SET stock = stock + ? WHERE id = ?");
                        $stmt->execute([$quantityInBaseUnit, $item['productId']]);
                        
                        // Přidat pohyb skladu
                        $stmt = $db->prepare("INSERT INTO product_movements (product_id, date, type, quantity, note) VALUES (?, ?, 'purchase', ?, ?)");
                        $stmt->execute([
                            $item['productId'],
                            $data['date'] ?? date('Y-m-d'),
                            $quantityInBaseUnit,
                            $item['note'] ?? 'Příjem zboží'
                        ]);
                    }
                }
            }
            
            $db->commit();
            sendJson(['id' => $receiptId], 201);
        } catch (Exception $e) {
            $db->rollBack();
            sendJson(['error' => $e->getMessage()], 500);
        }
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        
        $stmt = $db->prepare("DELETE FROM stock_receipts WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(['success' => true]);
        break;
}
?>
