<?php
require_once 'config.php';
session_start();
if (empty($_SESSION['hairbook_logged_in'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Připojení k databázi
try {
    $db = new PDO('sqlite:hairbook.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// GET - Načíst všechny rezervace
if ($method === 'GET') {
    try {
        $stmt = $db->query('SELECT * FROM appointments ORDER BY date, time');
        $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Převést snake_case na camelCase
        $appointments = array_map(function($apt) {
            return [
                'id' => (int)$apt['id'],
                'clientId' => (int)$apt['client_id'],
                'serviceId' => (int)$apt['service_id'],
                'date' => $apt['date'],
                'time' => $apt['time'],
                'duration' => (int)$apt['duration'],
                'note' => $apt['note'],
                'createdAt' => $apt['created_at']
            ];
        }, $appointments);
        
        echo json_encode($appointments);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch appointments']);
    }
}

// POST - Vytvořit novou rezervaci
elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validace
    if (!isset($data['clientId']) || !isset($data['serviceId']) || !isset($data['date']) || !isset($data['time'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit();
    }
    
    try {
        // Kontrola konfliktů (překrývající se rezervace)
        $duration = $data['duration'] ?? 60;
        $startTime = $data['time'];
        
        // Vypočítat koncový čas
        $endTime = date('H:i:s', strtotime($startTime) + ($duration * 60));
        
        // Najít všechny překrývající se rezervace
        $stmt = $db->prepare('
            SELECT id, duration FROM appointments 
            WHERE date = :date 
            AND (
                (time < :end_time AND time >= :start_time)
                OR (time <= :start_time AND DATETIME(date || " " || time, "+" || duration || " minutes") > :start_datetime)
            )
        ');
        
        $stmt->execute([
            ':date' => $data['date'],
            ':start_time' => $startTime,
            ':end_time' => $endTime,
            ':start_datetime' => $data['date'] . ' ' . $startTime
        ]);
        
        $conflicts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Povolit vložení krátké služby (max 30 min) mezi JAKOUKOLIV existující rezervaci
        $allowShortServiceInsertion = false;
        if ($duration <= 30 && count($conflicts) === 1) {
            // Krátká služba může být vložena do jakékoliv rezervace
            $allowShortServiceInsertion = true;
        }
        
        if (count($conflicts) > 0 && !$allowShortServiceInsertion) {
            http_response_code(409);
            echo json_encode([
                'error' => 'Time slot already booked',
                'debug' => [
                    'duration' => $duration,
                    'conflicts_count' => count($conflicts),
                    'allow_insertion' => $allowShortServiceInsertion
                ]
            ]);
            exit();
        }
        
        // Vložit rezervaci
        $stmt = $db->prepare('
            INSERT INTO appointments (client_id, service_id, date, time, duration, note, created_at) 
            VALUES (:client_id, :service_id, :date, :time, :duration, :note, :created_at)
        ');
        
        $stmt->execute([
            ':client_id' => $data['clientId'],
            ':service_id' => $data['serviceId'],
            ':date' => $data['date'],
            ':time' => $data['time'],
            ':duration' => $duration,
            ':note' => $data['note'] ?? '',
            ':created_at' => date('Y-m-d H:i:s')
        ]);
        
        echo json_encode([
            'id' => $db->lastInsertId(),
            'message' => 'Appointment created successfully'
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create appointment', 'details' => $e->getMessage()]);
    }
}

// PUT - Upravit rezervaci
elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing appointment ID']);
        exit();
    }
    
    try {
        // Kontrola konfliktů (kromě aktuální rezervace)
        $duration = $data['duration'] ?? 60;
        $startTime = $data['time'];
        $endTime = date('H:i:s', strtotime($startTime) + ($duration * 60));
        
        // Najít všechny překrývající se rezervace (kromě aktuální)
        $stmt = $db->prepare('
            SELECT id, duration FROM appointments 
            WHERE date = :date 
            AND id != :id
            AND (
                (time < :end_time AND time >= :start_time)
                OR (time <= :start_time AND DATETIME(date || " " || time, "+" || duration || " minutes") > :start_datetime)
            )
        ');
        
        $stmt->execute([
            ':id' => $data['id'],
            ':date' => $data['date'],
            ':start_time' => $startTime,
            ':end_time' => $endTime,
            ':start_datetime' => $data['date'] . ' ' . $startTime
        ]);
        
        $conflicts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Povolit vložení krátké služby (max 30 min) mezi JAKOUKOLIV existující rezervaci
        $allowShortServiceInsertion = false;
        if ($duration <= 30 && count($conflicts) === 1) {
            // Krátká služba může být vložena do jakékoliv rezervace
            $allowShortServiceInsertion = true;
        }
        
        if (count($conflicts) > 0 && !$allowShortServiceInsertion) {
            http_response_code(409);
            echo json_encode(['error' => 'Time slot already booked']);
            exit();
        }
        
        $stmt = $db->prepare('
            UPDATE appointments 
            SET client_id = :client_id, service_id = :service_id, date = :date, 
                time = :time, duration = :duration, note = :note
            WHERE id = :id
        ');
        
        $stmt->execute([
            ':id' => $data['id'],
            ':client_id' => $data['clientId'],
            ':service_id' => $data['serviceId'],
            ':date' => $data['date'],
            ':time' => $data['time'],
            ':duration' => $duration,
            ':note' => $data['note'] ?? ''
        ]);
        
        echo json_encode(['message' => 'Appointment updated successfully']);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update appointment', 'details' => $e->getMessage()]);
    }
}

// DELETE - Smazat rezervaci
elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing appointment ID']);
        exit();
    }
    
    try {
        $stmt = $db->prepare('DELETE FROM appointments WHERE id = :id');
        $stmt->execute([':id' => $data['id']]);
        
        echo json_encode(['message' => 'Appointment deleted successfully']);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete appointment']);
    }
}

else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
