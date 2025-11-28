<?php
require_once 'config.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

switch ($method) {
    case 'GET':
        // Načíst všechny snapshoty
        $stmt = $db->query("SELECT * FROM period_snapshots ORDER BY created_at DESC");
        $snapshots = $stmt->fetchAll();
        
        // Převést JSON data zpět na objekty
        foreach ($snapshots as &$snapshot) {
            $snapshot['data'] = json_decode($snapshot['snapshot_data'], true);
            unset($snapshot['snapshot_data']);
            
            // Převést snake_case na camelCase
            $snapshot['periodStart'] = $snapshot['period_start'];
            $snapshot['periodEnd'] = $snapshot['period_end'];
            $snapshot['createdAt'] = $snapshot['created_at'];
            unset($snapshot['period_start'], $snapshot['period_end'], $snapshot['created_at']);
        }
        
        sendJson($snapshots);
        break;
        
    case 'POST':
        // Vytvořit nový snapshot
        $data = getJsonInput();
        
        $stmt = $db->prepare("INSERT INTO period_snapshots (period, period_start, period_end, snapshot_data, note) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['period'],
            $data['periodStart'],
            $data['periodEnd'],
            json_encode($data['data']),
            $data['note'] ?? ''
        ]);
        
        sendJson(['id' => $db->lastInsertId()], 201);
        break;
        
    case 'DELETE':
        // Smazat snapshot
        $id = $_GET['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        
        $stmt = $db->prepare("DELETE FROM period_snapshots WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(['success' => true]);
        break;
}
?>
