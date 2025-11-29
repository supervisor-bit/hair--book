<?php
require_once 'config.php';
session_start();
if (empty($_SESSION['hairbook_logged_in'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;
$limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : null;
$offset = isset($_GET['offset']) ? max(0, intval($_GET['offset'])) : 0;
$type = $_GET['type'] ?? null;
$allowedTypes = ['purchase', 'usage'];
$typeFilter = in_array($type, $allowedTypes, true) ? $type : null;

try {
    switch ($method) {
        case 'GET':
            if ($id) {
                // Získat pohyby pro konkrétní produkt s podporou limit/offset a filtru typu
                $countSql = "SELECT COUNT(*) as cnt FROM product_movements WHERE product_id = ?";
                $countParams = [$id];
                if ($typeFilter) {
                    $countSql .= " AND type = ?";
                    $countParams[] = $typeFilter;
                }
                $countStmt = $db->prepare($countSql);
                $countStmt->execute($countParams);
                $total = (int)$countStmt->fetchColumn();

                if ($limit !== null) {
                    $sql = "SELECT * FROM product_movements WHERE product_id = ?";
                    if ($typeFilter) {
                        $sql .= " AND type = ?";
                    }
                    $sql .= " ORDER BY date DESC LIMIT ? OFFSET ?";
                    $stmt = $db->prepare($sql);
                    $idx = 1;
                    $stmt->bindValue($idx++, $id, PDO::PARAM_INT);
                    if ($typeFilter) {
                        $stmt->bindValue($idx++, $typeFilter, PDO::PARAM_STR);
                    }
                    $stmt->bindValue($idx++, $limit, PDO::PARAM_INT);
                    $stmt->bindValue($idx, $offset, PDO::PARAM_INT);
                    $stmt->execute();
                } else {
                    $sql = "SELECT * FROM product_movements WHERE product_id = ?";
                    $params = [$id];
                    if ($typeFilter) {
                        $sql .= " AND type = ?";
                        $params[] = $typeFilter;
                    }
                    $sql .= " ORDER BY date DESC";
                    $stmt = $db->prepare($sql);
                    $stmt->execute($params);
                }
                $movements = $stmt->fetchAll(PDO::FETCH_ASSOC);
                sendJson(['items' => $movements, 'total' => $total]);
            } else {
                // Získat všechny pohyby (bez produktového filtru)
                $count = $db->query("SELECT COUNT(*) FROM product_movements")->fetchColumn();
                if ($limit !== null) {
                    $stmt = $db->prepare("SELECT * FROM product_movements ORDER BY date DESC LIMIT ? OFFSET ?");
                    $stmt->bindValue(1, $limit, PDO::PARAM_INT);
                    $stmt->bindValue(2, $offset, PDO::PARAM_INT);
                    $stmt->execute();
                } else {
                    $stmt = $db->query("SELECT * FROM product_movements ORDER BY date DESC");
                }
                $movements = $stmt->fetchAll(PDO::FETCH_ASSOC);
                sendJson(['items' => $movements, 'total' => (int)$count]);
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

        default:
            sendJson(['error' => 'Method not allowed'], 405);
    }
} catch (Exception $e) {
    sendJson(['error' => 'Server error: ' . $e->getMessage()], 500);
}
