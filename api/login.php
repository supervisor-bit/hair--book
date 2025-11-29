<?php
session_start();
require_once 'config.php';

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

// Pokud je heslo hashované, použij password_verify
if (strlen($row['password']) === 60 && preg_match('/^\$2y\$/', $row['password'])) {
    $valid = password_verify($password, $row['password']);
} else {
    // fallback pro staré plaintext heslo
    $valid = ($password === $row['password']);
}

if ($valid) {
    $_SESSION['hairbook_logged_in'] = true;
    echo json_encode(['success' => true]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid password']);
}
?>
