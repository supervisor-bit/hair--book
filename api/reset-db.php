<?php
require_once 'config.php';

// Reset všech tabulek (DROP neprovádí, jen smaže data)
// Volat pouze přes POST s potvrzením {"confirm":"DELETE_ALL"}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['error' => 'Použij POST'], 405);
}

$input = getJsonInput();
requireSetupToken($input);
if (!isset($input['confirm']) || $input['confirm'] !== 'DELETE_ALL') {
    sendJson(['error' => 'Potvrď {"confirm":"DELETE_ALL"}'], 400);
}

$db = getDB();
$dbType = (getenv('DB_TYPE') ?: 'sqlite');

// Seznam tabulek k vyčištění (skutečně existující vyfiltrujeme níže)
$tables = [
    'stock_issue_items',
    'stock_issues',
    'period_snapshots',
    'visit_templates',
    'stock_order_items',
    'stock_orders',
    'stock_receipt_items',
    'stock_receipts',
    'purchase_items',
    'purchases',
    'visit_products',
    'visit_materials',
    'visit_services',
    'visits',
    'services',
    'product_movements',
    'products',
    'product_categories',
    'client_notes',
    'clients',
    'salon_settings'
];

// Zjistit existující tabulky
if ($dbType === 'mysql') {
    $stmt = $db->query("SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE()");
    $existing = $stmt->fetchAll(PDO::FETCH_COLUMN);
} else {
    $stmt = $db->query("SELECT name FROM sqlite_master WHERE type='table'");
    $existing = $stmt->fetchAll(PDO::FETCH_COLUMN);
}
$tables = array_values(array_intersect($tables, $existing));

try {
    $db->beginTransaction();

    if ($dbType === 'mysql') {
        $db->exec('SET FOREIGN_KEY_CHECKS = 0');
    } else {
        $db->exec('PRAGMA foreign_keys = OFF');
    }

    foreach ($tables as $table) {
        $db->exec("DELETE FROM {$table}");
        if ($dbType === 'mysql') {
            $db->exec("ALTER TABLE {$table} AUTO_INCREMENT = 1");
        }
    }

    $db->commit();

    if ($dbType !== 'mysql') {
        // Reset autoincrement v SQLite a zmenšení souboru (VACUUM nelze v transakci)
        if (in_array('sqlite_sequence', $existing, true)) {
            $db->exec('DELETE FROM sqlite_sequence');
        }
        try {
            $db->exec('VACUUM');
        } catch (Exception $e) {
            // Pokud VACUUM selže (busy), aspoň hláška do response
            sendJson(['error' => 'VACUUM selhalo: ' . $e->getMessage()], 500);
        }
    }

    if ($dbType === 'mysql') {
        $db->exec('SET FOREIGN_KEY_CHECKS = 1');
    } else {
        $db->exec('PRAGMA foreign_keys = ON');
    }

    sendJson(['success' => true, 'message' => 'Všechna data byla vymazána.']);
} catch (Exception $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    sendJson(['error' => $e->getMessage()], 500);
}
