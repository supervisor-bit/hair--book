<?php
require_once 'config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $_GET['action'] ?? 'visit';

if ($action === 'note') {
    // Operace s poznámkami
    switch ($method) {
        case 'POST':
            $data = getJsonInput();
            $stmt = $db->prepare("INSERT INTO client_notes (client_id, text, date) VALUES (?, ?, ?)");
            $stmt->execute([$data['clientId'], $data['text'], $data['date']]);
            sendJson(['id' => $db->lastInsertId()], 201);
            break;
            
        case 'PUT':
            $data = getJsonInput();
            $stmt = $db->prepare("UPDATE client_notes SET text = ?, date = ? WHERE id = ?");
            $stmt->execute([$data['text'], $data['date'], $data['id']]);
            sendJson(['success' => true]);
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) sendJson(['error' => 'Missing id'], 400);
            
            $stmt = $db->prepare("DELETE FROM client_notes WHERE id = ?");
            $stmt->execute([$id]);
            sendJson(['success' => true]);
            break;
    }
} else {
    // Operace s návštěvami
    switch ($method) {
        case 'POST':
            $data = getJsonInput();
            
            $db->beginTransaction();
            try {
                // Vytvořit návštěvu
                $stmt = $db->prepare("INSERT INTO visits (client_id, date, closed, price, note) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $data['clientId'],
                    $data['date'],
                    $data['closed'] ? 1 : 0,
                    $data['price'] ?? 0,
                    $data['note'] ?? ''
                ]);
                $visitId = $db->lastInsertId();
                
                // Přidat služby
                if (isset($data['services'])) {
                    foreach ($data['services'] as $service) {
                        $stmt = $db->prepare("INSERT INTO visit_services (visit_id, service_name) VALUES (?, ?)");
                        $stmt->execute([$visitId, $service['name']]);
                        $serviceId = $db->lastInsertId();
                        
                        // Přidat materiály k službě
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
                
                // Přidat prodané produkty
                if (isset($data['products'])) {
                    foreach ($data['products'] as $product) {
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
                
                $db->commit();
                sendJson(['id' => $visitId], 201);
            } catch (Exception $e) {
                $db->rollBack();
                sendJson(['error' => $e->getMessage()], 500);
            }
            break;
            
        case 'PUT':
            $data = getJsonInput();
            $visitId = $data['id'] ?? null;
            if (!$visitId) sendJson(['error' => 'Missing visit id'], 400);
            
            $action = $_GET['action'] ?? 'update';
            
            $db->beginTransaction();
            try {
                if ($action === 'close') {
                    // Uzavřít návštěvu
                    $stmt = $db->prepare("UPDATE visits SET closed = 1, price = ?, note = ? WHERE id = ?");
                    $stmt->execute([$data['price'] ?? 0, $data['note'] ?? '', $visitId]);
                } else {
                    // Aktualizovat otevřenou návštěvu
                    $stmt = $db->prepare("UPDATE visits SET note = ? WHERE id = ? AND closed = 0");
                    $stmt->execute([$data['note'] ?? '', $visitId]);
                    
                    if ($stmt->rowCount() === 0) {
                        throw new Exception('Návštěva neexistuje nebo je již uzavřena');
                    }
                }
                
                // Smazat staré služby a materiály
                $stmt = $db->prepare("DELETE FROM visit_materials WHERE visit_service_id IN (SELECT id FROM visit_services WHERE visit_id = ?)");
                $stmt->execute([$visitId]);
                
                $stmt = $db->prepare("DELETE FROM visit_services WHERE visit_id = ?");
                $stmt->execute([$visitId]);
                
                // Smazat staré produkty
                $stmt = $db->prepare("DELETE FROM visit_products WHERE visit_id = ?");
                $stmt->execute([$visitId]);
                
                // Přidat nové služby
                if (isset($data['services'])) {
                    foreach ($data['services'] as $service) {
                        if (!isset($service['name']) || empty($service['name'])) continue;
                        
                        $stmt = $db->prepare("INSERT INTO visit_services (visit_id, service_name) VALUES (?, ?)");
                        $stmt->execute([$visitId, $service['name']]);
                        $serviceId = $db->lastInsertId();
                        
                        // Přidat materiály k službě
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
                
                // Přidat nové produkty
                if (isset($data['products'])) {
                    foreach ($data['products'] as $product) {
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
                
                $db->commit();
                sendJson(['success' => true]);
            } catch (Exception $e) {
                $db->rollBack();
                sendJson(['error' => $e->getMessage()], 500);
            }
            break;
            
        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) sendJson(['error' => 'Missing id'], 400);
            
            $stmt = $db->prepare("DELETE FROM visits WHERE id = ?");
            $stmt->execute([$id]);
            sendJson(['success' => true]);
            break;
    }
}
?>
