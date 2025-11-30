<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$db = getDB();
$dbType = getenv('DB_TYPE') ?: 'sqlite';

// Kontrola tokenu, pokud je nastaven WIZARD_TOKEN
$payload = ($method === 'POST') ? getJsonInput() : null;
requireSetupToken($payload);

$tableOrder = [
    'salon_settings',
    'product_categories',
    'products',
    'product_movements',
    'clients',
    'client_notes',
    'calendar_events',   // kalendář (nové)
    'appointments',      // kalendář (starší API, pokud existuje)
    'services',
    'visits',
    'visit_services',
    'visit_materials',
    'visit_products',
    'purchases',
    'purchase_items',
    'stock_receipts',
    'stock_receipt_items',
    'stock_orders',
    'stock_order_items',
    'stock_issues',
    'stock_issue_items',
    'visit_templates',
    'period_snapshots'
];

function tableExists($db, $table, $dbType) {
    if ($dbType === 'mysql') {
        $stmt = $db->prepare("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?");
        $stmt->execute([$table]);
        return (bool)$stmt->fetchColumn();
    }
    $stmt = $db->prepare("SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name=?");
    $stmt->execute([$table]);
    return (bool)$stmt->fetchColumn();
}

function fetchTable($db, $table) {
    $stmt = $db->query("SELECT * FROM {$table}");
    return $stmt->fetchAll();
}

function insertTableData($db, $table, $rows) {
    if (empty($rows)) return;
    foreach ($rows as $row) {
        if (!is_array($row)) continue;
        $columns = array_keys($row);
        $placeholders = implode(',', array_fill(0, count($columns), '?'));
        $colList = implode(',', $columns);
        $stmt = $db->prepare("INSERT INTO {$table} ({$colList}) VALUES ({$placeholders})");
        try {
            $stmt->execute(array_values($row));
        } catch (Exception $e) {
            throw new Exception("Tabulka {$table}: " . $e->getMessage());
        }
    }
}

if ($method === 'GET') {
    $data = [];
    foreach ($tableOrder as $table) {
        if (!tableExists($db, $table, $dbType)) {
            continue;
        }
        $data[$table] = fetchTable($db, $table);
    }
    sendJson([
        'success' => true,
        'meta' => [
            'generatedAt' => date('c'),
            'dbType' => $dbType
        ],
        'data' => $data
    ]);
}

if ($method === 'POST') {
    if (!$payload || !isset($payload['data']) || !is_array($payload['data'])) {
        sendJson(['error' => 'Chybí data pro import (data: {...})'], 400);
    }

    $importData = $payload['data'];
    $counts = [];

    try {
        if ($dbType === 'mysql') {
            $db->exec('SET FOREIGN_KEY_CHECKS = 0');
        } else {
            // Pro SQLite vypnout FK ještě před transakcí
            $db->exec('PRAGMA foreign_keys = OFF');
            $db->exec('PRAGMA defer_foreign_keys = ON');
        }
        $db->beginTransaction();

        foreach ($tableOrder as $table) {
            $rows = $importData[$table] ?? [];
            if (!tableExists($db, $table, $dbType)) {
                continue;
            }
            $db->exec("DELETE FROM {$table}");
            insertTableData($db, $table, $rows);
            $counts[$table] = is_array($rows) ? count($rows) : 0;
        }

        $db->commit();

        if ($dbType === 'mysql') {
            $db->exec('SET FOREIGN_KEY_CHECKS = 1');
        } else {
            $db->exec('PRAGMA foreign_keys = ON');
            try { $db->exec('VACUUM'); } catch (Exception $e) {}
        }

        sendJson(['success' => true, 'counts' => $counts]);
    } catch (Exception $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        sendJson(['error' => $e->getMessage()], 500);
    }
}

sendJson(['error' => 'Method not allowed'], 405);
