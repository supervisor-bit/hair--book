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

// Zajistit, že tabulky pro výdejky existují (pro instalace bez nové migrace)
function ensureIssueTables(PDO $db) {
    $db->exec("CREATE TABLE IF NOT EXISTS stock_issues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    $db->exec("CREATE TABLE IF NOT EXISTS stock_issue_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        issue_id INTEGER NOT NULL,
        product_id INTEGER,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        FOREIGN KEY (issue_id) REFERENCES stock_issues(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )");
    
    $db->exec("CREATE INDEX IF NOT EXISTS idx_issues_date ON stock_issues(date)");
}

ensureIssueTables($db);

switch ($method) {
    case 'GET':
        $stmt = $db->query("SELECT * FROM stock_issues ORDER BY date DESC, created_at DESC");
        $issues = $stmt->fetchAll();
        
        // Načíst položky
        foreach ($issues as &$issue) {
            $itemsStmt = $db->prepare("SELECT * FROM stock_issue_items WHERE issue_id = ? ORDER BY id ASC");
            $itemsStmt->execute([$issue['id']]);
            $items = $itemsStmt->fetchAll();
            // CamelCase + fallbacky
            $issue['items'] = array_map(function($item) {
                return [
                    'id' => $item['id'],
                    'productId' => $item['product_id'],
                    'productName' => $item['product_name'] ?? 'Neznámý produkt',
                    'quantity' => $item['quantity'],
                    'unit' => $item['unit']
                ];
            }, $items);
        }
        sendJson($issues);
        break;
        
    case 'POST':
        $data = getJsonInput();
        if (!isset($data['items']) || !is_array($data['items']) || count($data['items']) === 0) {
            sendJson(['error' => 'Missing items'], 400);
        }
        
        $db->beginTransaction();
        try {
            $stmt = $db->prepare("INSERT INTO stock_issues (date, note) VALUES (?, ?)");
            $stmt->execute([
                $data['date'] ?? date('Y-m-d'),
                $data['note'] ?? ''
            ]);
            $issueId = $db->lastInsertId();
            
            $itemStmt = $db->prepare("INSERT INTO stock_issue_items (issue_id, product_id, product_name, quantity, unit) VALUES (?, ?, ?, ?, ?)");
            foreach ($data['items'] as $item) {
                $itemStmt->execute([
                    $issueId,
                    $item['productId'] ?? null,
                    $item['productName'] ?? '',
                    $item['quantity'] ?? 0,
                    $item['unit'] ?? ''
                ]);
            }
            
            $db->commit();
            sendJson(['id' => $issueId], 201);
        } catch (Exception $e) {
            $db->rollBack();
            sendJson(['error' => $e->getMessage()], 500);
        }
        break;
        
    default:
        sendJson(['error' => 'Method not allowed'], 405);
}
