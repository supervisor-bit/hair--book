<?php
require_once 'config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

switch ($method) {
    case 'GET':
        // Získat všechny produkty
        $stmt = $db->query("SELECT * FROM products ORDER BY name");
        $products = $stmt->fetchAll();
        
        // Pro každý produkt načíst pohyby skladu
        foreach ($products as &$product) {
            $stmt = $db->prepare("SELECT * FROM product_movements WHERE product_id = ? ORDER BY date DESC");
            $stmt->execute([$product['id']]);
            $product['movements'] = $stmt->fetchAll();
            
            // Převést snake_case na camelCase
            $product['categoryId'] = $product['category_id'];
            $product['packageSize'] = $product['package_size'];
            $product['minStock'] = isset($product['minimal_stock']) ? $product['minimal_stock'] : 0;
            $product['pricePurchase'] = isset($product['purchase_price']) ? $product['purchase_price'] : 0;
            $product['priceRetail'] = isset($product['sale_price']) ? $product['sale_price'] : 0;
            $product['priceWork'] = 0; // Nemáme samostatný sloupec, použijeme 0
            $product['forSale'] = (bool)$product['for_sale'];
            $product['forWork'] = (bool)$product['for_work'];
            $product['createdAt'] = $product['created_at'];
            
            unset($product['category_id'], $product['package_size'], $product['minimal_stock'], 
                  $product['purchase_price'], $product['sale_price'],
                  $product['for_sale'], $product['for_work'], $product['created_at']);
            
            // Převést movements
            if ($product['movements']) {
                foreach ($product['movements'] as &$movement) {
                    $movement['productId'] = $movement['product_id'];
                    unset($movement['product_id']);
                }
            }
        }
        
        sendJson($products);
        break;
        
    case 'POST':
        // Vytvořit nový produkt
        $data = getJsonInput();
        $stmt = $db->prepare("INSERT INTO products (name, barcode, description, category_id, stock, unit, package_size, minimal_stock, purchase_price, sale_price, for_sale, for_work) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['name'],
            $data['barcode'] ?? null,
            $data['description'] ?? '',
            $data['categoryId'] ?? null,
            $data['stock'] ?? 0,
            $data['unit'],
            $data['packageSize'],
            $data['minStock'] ?? 0,
            $data['pricePurchase'] ?? 0,
            $data['priceRetail'] ?? 0,
            $data['forSale'] ? 1 : 0,
            $data['forWork'] ? 1 : 0
        ]);
        sendJson(['id' => $db->lastInsertId()], 201);
        break;
        
    case 'PUT':
        // Aktualizovat produkt
        $data = getJsonInput();
        $stmt = $db->prepare("UPDATE products SET name = ?, barcode = ?, description = ?, category_id = ?, stock = ?, unit = ?, package_size = ?, minimal_stock = ?, purchase_price = ?, sale_price = ?, for_sale = ?, for_work = ? WHERE id = ?");
        $stmt->execute([
            $data['name'],
            $data['barcode'] ?? null,
            $data['description'] ?? '',
            $data['categoryId'] ?? null,
            $data['stock'] ?? 0,
            $data['unit'],
            $data['packageSize'],
            $data['minStock'] ?? 0,
            $data['pricePurchase'] ?? 0,
            $data['priceRetail'] ?? 0,
            $data['forSale'] ? 1 : 0,
            $data['forWork'] ? 1 : 0,
            $data['id']
        ]);
        
        // Uložit movements pokud jsou
        if (isset($data['movements']) && is_array($data['movements'])) {
            // Smazat staré movements produktu
            $stmt = $db->prepare("DELETE FROM product_movements WHERE product_id = ?");
            $stmt->execute([$data['id']]);
            
            // Přidat nové movements
            foreach ($data['movements'] as $movement) {
                $stmt = $db->prepare("INSERT INTO product_movements (product_id, date, type, quantity, unit, note) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([
                    $data['id'],
                    $movement['date'],
                    $movement['type'],
                    $movement['quantity'],
                    $movement['unit'],
                    $movement['note'] ?? ''
                ]);
            }
        }
        
        sendJson(['success' => true]);
        break;
        
    case 'DELETE':
        // Smazat produkt
        $id = $_GET['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        
        $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(['success' => true]);
        break;
}
?>
