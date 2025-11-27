<?php
require_once 'config.php';

// Tento skript přijme JSON data z localStorage a naimportuje je do SQLite

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['error' => 'Only POST method allowed'], 405);
}

$data = getJsonInput();

if (!$data) {
    sendJson(['error' => 'No data provided'], 400);
}

$db = getDB();
$db->beginTransaction();

try {
    $stats = [
        'clients' => 0,
        'products' => 0,
        'categories' => 0,
        'services' => 0,
        'visits' => 0,
        'purchases' => 0,
        'notes' => 0
    ];
    
    // Import nastavení salonu
    if (isset($data['salonSettings'])) {
        $s = $data['salonSettings'];
        $stmt = $db->prepare("INSERT OR REPLACE INTO salon_settings (id, name, address, phone, email, web, ico, dic, receipt_footer) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $s['name'],
            $s['address'] ?? '',
            $s['phone'],
            $s['email'] ?? '',
            $s['web'] ?? '',
            $s['ico'] ?? '',
            $s['dic'] ?? '',
            $s['receiptFooter'] ?? ''
        ]);
    }
    
    // Import kategorií produktů
    if (isset($data['productCategories'])) {
        foreach ($data['productCategories'] as $cat) {
            $stmt = $db->prepare("INSERT INTO product_categories (id, name, icon, color) VALUES (?, ?, ?, ?)");
            $stmt->execute([$cat['id'], $cat['name'], $cat['icon'], $cat['color']]);
            $stats['categories']++;
        }
    }
    
    // Import produktů
    if (isset($data['products'])) {
        foreach ($data['products'] as $product) {
            $stmt = $db->prepare("INSERT INTO products (id, name, barcode, description, category_id, stock, unit, package_size, minimal_stock, purchase_price, sale_price, for_sale, for_work) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $product['id'],
                $product['name'],
                $product['barcode'] ?? null,
                $product['description'] ?? '',
                $product['categoryId'] ?? null,
                $product['stock'] ?? 0,
                $product['unit'],
                $product['packageSize'],
                $product['minimalStock'] ?? 0,
                $product['purchasePrice'] ?? 0,
                $product['salePrice'] ?? 0,
                $product['forSale'] ? 1 : 0,
                $product['forWork'] ? 1 : 0
            ]);
            
            // Import pohybů skladu
            if (isset($product['movements'])) {
                foreach ($product['movements'] as $movement) {
                    $stmt = $db->prepare("INSERT INTO product_movements (product_id, date, type, quantity, unit_price, note) VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->execute([
                        $product['id'],
                        $movement['date'],
                        $movement['type'],
                        $movement['quantity'],
                        $movement['unitPrice'] ?? null,
                        $movement['note'] ?? ''
                    ]);
                }
            }
            
            $stats['products']++;
        }
    }
    
    // Import služeb
    if (isset($data['services'])) {
        foreach ($data['services'] as $service) {
            $stmt = $db->prepare("INSERT INTO services (id, name, description, duration) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $service['id'],
                $service['name'],
                $service['description'] ?? '',
                $service['duration']
            ]);
            $stats['services']++;
        }
    }
    
    // Import klientů
    if (isset($data['clients'])) {
        foreach ($data['clients'] as $client) {
            $stmt = $db->prepare("INSERT INTO clients (id, first_name, last_name, phone, email, avatar, group_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $client['id'],
                $client['firstName'],
                $client['lastName'],
                $client['phone'],
                $client['email'] ?? null,
                $client['avatar'] ?? null,
                $client['groupId'] ?? null
            ]);
            
            // Import poznámek
            if (isset($client['notes'])) {
                foreach ($client['notes'] as $note) {
                    $stmt = $db->prepare("INSERT INTO client_notes (id, client_id, text, date) VALUES (?, ?, ?, ?)");
                    $stmt->execute([
                        $note['id'],
                        $client['id'],
                        $note['text'],
                        $note['date']
                    ]);
                    $stats['notes']++;
                }
            }
            
            // Import návštěv
            if (isset($client['visits'])) {
                foreach ($client['visits'] as $visit) {
                    $stmt = $db->prepare("INSERT INTO visits (id, client_id, date, closed, price, note) VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->execute([
                        $visit['id'],
                        $client['id'],
                        $visit['date'],
                        $visit['closed'] ? 1 : 0,
                        $visit['price'] ?? 0,
                        $visit['note'] ?? ''
                    ]);
                    $visitId = $visit['id'];
                    
                    // Import služeb v návštěvě
                    if (isset($visit['services'])) {
                        foreach ($visit['services'] as $service) {
                            $stmt = $db->prepare("INSERT INTO visit_services (visit_id, service_name) VALUES (?, ?)");
                            $stmt->execute([$visitId, $service['name']]);
                            $serviceId = $db->lastInsertId();
                            
                            // Import materiálů
                            if (isset($service['materials'])) {
                                foreach ($service['materials'] as $material) {
                                    $stmt = $db->prepare("INSERT INTO visit_materials (visit_service_id, product_id, product_name, quantity, unit, base_unit) VALUES (?, ?, ?, ?, ?, ?)");
                                    $stmt->execute([
                                        $serviceId,
                                        $material['productId'],
                                        $material['name'],
                                        $material['quantity'],
                                        $material['unit'],
                                        $material['baseUnit']
                                    ]);
                                }
                            }
                        }
                    }
                    
                    // Import prodaných produktů
                    if (isset($visit['products'])) {
                        foreach ($visit['products'] as $product) {
                            $stmt = $db->prepare("INSERT INTO visit_products (visit_id, product_id, product_name, quantity, price) VALUES (?, ?, ?, ?, ?)");
                            $stmt->execute([
                                $visitId,
                                $product['productId'],
                                $product['name'],
                                $product['quantity'],
                                $product['price']
                            ]);
                        }
                    }
                    
                    $stats['visits']++;
                }
            }
            
            // Import nákupů
            if (isset($client['purchases'])) {
                foreach ($client['purchases'] as $purchase) {
                    $stmt = $db->prepare("INSERT INTO purchases (id, client_id, date, customer_name, total) VALUES (?, ?, ?, ?, ?)");
                    $stmt->execute([
                        $purchase['id'],
                        $client['id'],
                        $purchase['date'],
                        $purchase['customerName'],
                        $purchase['total']
                    ]);
                    $purchaseId = $purchase['id'];
                    
                    // Import položek nákupu
                    if (isset($purchase['items'])) {
                        foreach ($purchase['items'] as $item) {
                            $stmt = $db->prepare("INSERT INTO purchase_items (purchase_id, product_id, name, quantity, price) VALUES (?, ?, ?, ?, ?)");
                            $stmt->execute([
                                $purchaseId,
                                $item['productId'],
                                $item['name'],
                                $item['quantity'],
                                $item['price']
                            ]);
                        }
                    }
                    
                    $stats['purchases']++;
                }
            }
            
            $stats['clients']++;
        }
    }
    
    $db->commit();
    sendJson([
        'success' => true,
        'message' => 'Data successfully migrated',
        'stats' => $stats
    ]);
    
} catch (Exception $e) {
    $db->rollBack();
    sendJson(['error' => $e->getMessage()], 500);
}
?>
