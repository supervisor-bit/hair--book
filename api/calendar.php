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

function ensureCalendarTable(PDO $db) {
    $db->exec("CREATE TABLE IF NOT EXISTS calendar_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        date DATE NOT NULL,
        time TEXT NOT NULL,
        end_time TEXT,
        duration_minutes INTEGER DEFAULT 30,
        client_name TEXT NOT NULL,
        client_phone TEXT,
        service TEXT,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    // SQLite/ MySQL index if missing
    try { $db->exec("CREATE INDEX IF NOT EXISTS idx_calendar_date_time ON calendar_events(date, time)"); } catch (Exception $e) {}
    // Dodatečný sloupec client_id pro starší databáze
    try { $db->exec("ALTER TABLE calendar_events ADD COLUMN client_id INTEGER"); } catch (Exception $e) {}
    try { $db->exec("ALTER TABLE calendar_events ADD COLUMN end_time TEXT"); } catch (Exception $e) {}
}

ensureCalendarTable($db);

// Helper: sanitize time to HH:MM
function normalizeTime($time) {
    $parts = explode(':', $time);
    if (count($parts) >= 2) {
        return sprintf('%02d:%02d', intval($parts[0]), intval($parts[1]));
    }
    return '00:00';
}

function timeToMinutesPhp($time) {
    [$h,$m] = array_pad(explode(':', $time), 2, 0);
    return intval($h) * 60 + intval($m);
}

function isOverlapPhp($startA, $endA, $startB, $endB) {
    return $startA < $endB && $startB < $endA;
}

function checkOverlap(PDO $db, $date, $time, $endTime, $duration, $excludeId = null) {
    $stmt = $db->prepare("SELECT * FROM calendar_events WHERE date = ?");
    $stmt->execute([$date]);
    $newStart = timeToMinutesPhp($time);
    $newEnd = $endTime ? timeToMinutesPhp($endTime) : $newStart + ($duration ?: 30);
    while ($row = $stmt->fetch()) {
        if ($excludeId && intval($row['id']) === intval($excludeId)) continue;
        $start = timeToMinutesPhp($row['time']);
        $end = $row['end_time'] ? timeToMinutesPhp($row['end_time']) : $start + (intval($row['duration_minutes']) ?: 30);
        if (isOverlapPhp($newStart, $newEnd, $start, $end)) {
            return $row;
        }
    }
    return null;
}

switch ($method) {
    case 'GET':
        $date = $_GET['date'] ?? null;
        $week = $_GET['week'] ?? null; // format YYYY-Www (ISO)
        if (!$date && !$week) {
            sendJson(['error' => 'Missing date or week'], 400);
        }

        if ($week) {
            try {
                $dt = new DateTime();
                [$year, $weekNum] = explode('-W', $week);
                $dt->setISODate((int)$year, (int)$weekNum);
                $start = $dt->format('Y-m-d');
                $dt->modify('+6 days');
                $end = $dt->format('Y-m-d');
            } catch (Exception $e) {
                sendJson(['error' => 'Invalid week format'], 400);
            }
            $stmt = $db->prepare("SELECT * FROM calendar_events WHERE date BETWEEN ? AND ? ORDER BY date, time");
            $stmt->execute([$start, $end]);
        } else {
            $stmt = $db->prepare("SELECT * FROM calendar_events WHERE date = ? ORDER BY time");
            $stmt->execute([$date]);
        }
        sendJson($stmt->fetchAll());
        break;

    case 'POST':
        $data = getJsonInput();
        if (empty($data['date']) || empty($data['time']) || empty($data['clientName'])) {
            sendJson(['error' => 'Missing fields'], 400);
        }
        // Blokace zpětných rezervací
        $today = (new DateTime('today'))->format('Y-m-d');
        if ($data['date'] < $today) {
            sendJson(['error' => 'Nelze vytvořit rezervaci v minulosti'], 400);
        }
        $overlap = checkOverlap($db, $data['date'], normalizeTime($data['time']), $data['endTime'] ?? null, $data['duration'] ?? 30, null);
        if ($overlap) {
            sendJson(['error' => 'Termín je obsazen', 'conflict' => $overlap], 409);
        }
        $stmt = $db->prepare("INSERT INTO calendar_events (client_id, date, time, end_time, duration_minutes, client_name, client_phone, service, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['clientId'] ?? null,
            $data['date'],
            normalizeTime($data['time']),
            isset($data['endTime']) ? normalizeTime($data['endTime']) : null,
            isset($data['duration']) ? intval($data['duration']) : 30,
            $data['clientName'],
            $data['clientPhone'] ?? null,
            $data['service'] ?? null,
            $data['note'] ?? null
        ]);
        sendJson(['id' => $db->lastInsertId()], 201);
        break;

    case 'PUT':
        $data = getJsonInput();
        $id = $data['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        $today = (new DateTime('today'))->format('Y-m-d');
        if (!empty($data['date']) && $data['date'] < $today) {
            sendJson(['error' => 'Nelze měnit rezervaci v minulosti'], 400);
        }
        $overlap = checkOverlap($db, $data['date'], normalizeTime($data['time']), $data['endTime'] ?? null, $data['duration'] ?? 30, $id);
        if ($overlap) {
            sendJson(['error' => 'Termín je obsazen', 'conflict' => $overlap], 409);
        }
        $stmt = $db->prepare("UPDATE calendar_events SET client_id = ?, date = ?, time = ?, end_time = ?, duration_minutes = ?, client_name = ?, client_phone = ?, service = ?, note = ? WHERE id = ?");
        $stmt->execute([
            $data['clientId'] ?? null,
            $data['date'],
            normalizeTime($data['time']),
            isset($data['endTime']) ? normalizeTime($data['endTime']) : null,
            isset($data['duration']) ? intval($data['duration']) : 30,
            $data['clientName'],
            $data['clientPhone'] ?? null,
            $data['service'] ?? null,
            $data['note'] ?? null,
            $id
        ]);
        sendJson(['success' => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) sendJson(['error' => 'Missing id'], 400);
        $stmt = $db->prepare("DELETE FROM calendar_events WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(['success' => true]);
        break;

    default:
        sendJson(['error' => 'Method not allowed'], 405);
}
