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
        // Pagination parameters
        $limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 20;
        $offset = isset($_GET['offset']) ? max(0, intval($_GET['offset'])) : 0;
        
        // Získat pouze požadovanou stránku klientů
        $stmt = $db->prepare("SELECT * FROM clients ORDER BY last_name, first_name LIMIT ? OFFSET ?");
        $stmt->execute([$limit, $offset]);
        $clients = $stmt->fetchAll();
        
        // Pro každého klienta načíst pouze základní data (poznámky, návštěvy, nákupy)
        foreach ($clients as &$client) {
            // Poznámky
            $stmt = $db->prepare("SELECT * FROM client_notes WHERE client_id = ? ORDER BY date DESC");
            $stmt->execute([$client['id']]);
            $client['notes'] = $stmt->fetchAll();
            // Návštěvy
            $stmt = $db->prepare("SELECT * FROM visits WHERE client_id = ? ORDER BY date DESC");
            $stmt->execute([$client['id']]);
            $visits = $stmt->fetchAll();
            foreach ($visits as &$visit) {
                // Služby v návštěvě
                $stmt = $db->prepare("SELECT * FROM visit_services WHERE visit_id = ?");
                $stmt->execute([$visit['id']]);
                $services = $stmt->fetchAll();
                foreach ($services as &$service) {
                    // Materiály použité při službě
                    $stmt = $db->prepare("SELECT * FROM visit_materials WHERE visit_service_id = ?");
                    $stmt->execute([$service['id']]);
                    $service['materials'] = $stmt->fetchAll();
                }
                $visit['services'] = $services;
                // Prodané produkty v návštěvě
                $stmt = $db->prepare("SELECT * FROM visit_products WHERE visit_id = ?");
                $stmt->execute([$visit['id']]);
                $visit['products'] = $stmt->fetchAll();
            }
            $client['visits'] = $visits;
            // Nákupy (prodej bez návštěvy)
            $stmt = $db->prepare("SELECT * FROM purchases WHERE client_id = ? ORDER BY date DESC");
            $stmt->execute([$client['id']]);
            $purchases = $stmt->fetchAll();
            foreach ($purchases as &$purchase) {
                $stmt = $db->prepare("SELECT * FROM purchase_items WHERE purchase_id = ?");
                $stmt->execute([$purchase['id']]);
                $purchase['items'] = $stmt->fetchAll();
            }
            $client['purchases'] = $purchases;
        }
        
        // Převést snake_case na camelCase pro JavaScript
        foreach ($clients as &$client) {
            $client['firstName'] = $client['first_name'];
            $client['lastName'] = $client['last_name'];
            $client['groupId'] = $client['group_id'];
            $client['createdAt'] = $client['created_at'];
            unset($client['first_name'], $client['last_name'], $client['group_id'], $client['created_at']);
            
            // Převést notes
            if (isset($client['notes'])) {
                foreach ($client['notes'] as &$note) {
                    $note['clientId'] = $note['client_id'];
                    unset($note['client_id']);
                }
            }
            
            // Převést visits
            if (isset($client['visits'])) {
                foreach ($client['visits'] as &$visit) {
                    $visit['clientId'] = $visit['client_id'];
                    $visit['createdAt'] = $visit['created_at'];
                    $visit['closed'] = (bool)$visit['closed']; // Převést na boolean
                    // price a note už jsou v camelCase
                    unset($visit['client_id'], $visit['created_at']);
                    
                    // Převést services
                    if (isset($visit['services'])) {
                        foreach ($visit['services'] as &$service) {
                            $service['visitId'] = $service['visit_id'];
                            $service['name'] = $service['service_name'];
                            unset($service['visit_id'], $service['service_name']);
                            
                            // Převést materials
                            if (isset($service['materials'])) {
                                foreach ($service['materials'] as &$material) {
                                    $material['visitServiceId'] = $material['visit_service_id'];
                                    $material['productId'] = $material['product_id'];
                                    $material['name'] = $material['product_name'];
                                    $material['baseUnit'] = $material['base_unit'];
                                    unset($material['visit_service_id'], $material['product_id'], $material['product_name'], $material['base_unit']);
                                }
                            }
                        }
                    }
                    
                    // Převést products
                    if (isset($visit['products'])) {
                        foreach ($visit['products'] as &$product) {
                            $product['visitId'] = $product['visit_id'];
                            $product['productId'] = $product['product_id'];
                            $product['name'] = $product['product_name'];
                            unset($product['visit_id'], $product['product_id'], $product['product_name']);
                        }
                    }
                }
            }
            
            // Převést purchases
            if (isset($client['purchases'])) {
                foreach ($client['purchases'] as &$purchase) {
                    $purchase['customerName'] = $purchase['customer_name'];
                    $purchase['createdAt'] = $purchase['created_at'];
                    unset($purchase['customer_name'], $purchase['created_at']);
                    
                    if (isset($purchase['items'])) {
                        foreach ($purchase['items'] as &$item) {
                            $item['purchaseId'] = $item['purchase_id'];
                            $item['productId'] = $item['product_id'];
                            unset($item['purchase_id'], $item['product_id']);
                        }
                    }
                }
            }
        }
        
        sendJson($clients);
        break;
        
    case 'POST':
        // Vytvořit nového klienta
        $data = getJsonInput();
        $stmt = $db->prepare("INSERT INTO clients (first_name, last_name, phone, email, avatar, group_id) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['firstName'],
            $data['lastName'],
            $data['phone'],
            $data['email'] ?? null,
            $data['avatar'] ?? null,
            $data['groupId'] ?? null
        ]);
        sendJson(['id' => $db->lastInsertId()], 201);
        break;
        
    case 'PUT':
        // Aktualizovat klienta
        $data = getJsonInput();
        $stmt = $db->prepare("UPDATE clients SET first_name = ?, last_name = ?, phone = ?, email = ?, avatar = ?, group_id = ? WHERE id = ?");
        $stmt->execute([
            $data['firstName'],
            $data['lastName'],
            $data['phone'],
            $data['email'] ?? null,
            $data['avatar'] ?? null,
            $data['groupId'] ?? null,
            $data['id']
        ]);
        sendJson(['success' => true]);
        break;
        
    case 'DELETE':
        // Smazat klienta
        $id = $_GET['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        
        $stmt = $db->prepare("DELETE FROM clients WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(['success' => true]);
        break;
}
?>
