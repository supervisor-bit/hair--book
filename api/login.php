<?php
require_once 'config.php';
session_start();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'POST';

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$password = $data['password'] ?? '';

$stmt = $db->query("SELECT password FROM salon_settings WHERE id = 1");
$row = $stmt->fetch();

if (!$row || !$row['password']) {
    http_response_code(401);
    echo json_encode(['error' => 'No password set']);
    exit;
}

// Použij password_verify na hash
$storedPassword = $row['password'];
$valid = false;
if (strlen($storedPassword) === 60 && preg_match('/^\$2y\$/', $storedPassword)) {
    $valid = password_verify($password, $storedPassword);
} else {
    // Fallback pro starý plaintext – ověřit a hned převést na hash
    if ($password === $storedPassword) {
        $valid = true;
        try {
            $newHash = password_hash($storedPassword, PASSWORD_BCRYPT);
            $update = $db->prepare("UPDATE salon_settings SET password = ? WHERE id = 1");
            $update->execute([$newHash]);
        } catch (Exception $e) {
            // Pokud migrace hashe selže, necháme valid=true a pokračujeme
        }
    }
}

if ($valid) {
    $_SESSION['hairbook_logged_in'] = true;
    echo json_encode(['success' => true]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid password']);
}
?>
