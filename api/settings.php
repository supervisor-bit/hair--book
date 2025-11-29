<?php

require_once 'config.php';
session_start();

$db = getDB();

// Načíst aktuální nastavení pro potřeby kontroly hesla
$currentSettings = $db->query("SELECT * FROM salon_settings WHERE id = 1")->fetch();
$currentPassword = $currentSettings['password'] ?? null;
$hasPassword = !empty($currentPassword);
// Automatická migrace starého plaintext hesla na hash
if ($hasPassword && !(strlen($currentPassword) === 60 && preg_match('/^\$2y\$/', $currentPassword))) {
    try {
        $newHash = password_hash($currentPassword, PASSWORD_BCRYPT);
        $stmt = $db->prepare("UPDATE salon_settings SET password = ? WHERE id = 1");
        $stmt->execute([$newHash]);
        $currentPassword = $newHash;
    } catch (Exception $e) {
        // Pokud migrace selže, ponechat starou hodnotu; login fallback ji ještě zvládne
    }
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

switch ($method) {
    case 'GET':
        $settings = $currentSettings;
        if (!$settings) {
            sendJson([
                'name' => 'HairBook',
                'address' => '',
                'web' => 'www.hairbook.cz',
                'receiptFooter' => 'Děkujeme za Vaši návštěvu!',
                'hasPassword' => false,
                'authenticated' => !empty($_SESSION['hairbook_logged_in'])
            ]);
        }
        // Konvertovat snake_case na camelCase
        $public = [
            'name' => $settings['name'],
            'address' => $settings['address'],
            'web' => $settings['web'],
            'receiptFooter' => $settings['receipt_footer'],
            'hasPassword' => $hasPassword,
            'authenticated' => !empty($_SESSION['hairbook_logged_in'])
        ];
        if (!empty($_SESSION['hairbook_logged_in'])) {
            // Přihlášený uživatel dostane kompletní nastavení
            $settings['receiptFooter'] = $settings['receipt_footer'];
            unset($settings['receipt_footer']);
            unset($settings['password']);
            $settings['authenticated'] = true;
            sendJson($settings);
        } else {
            // Nepřihlášený uživatel dostane jen veřejné info
            sendJson($public);
        }
        break;
    case 'POST':
    case 'PUT':
        // Povolit nastavení hesla, pokud ještě žádné není
        if ($hasPassword && empty($_SESSION['hairbook_logged_in'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit;
        }
        $data = getJsonInput();
        
        // Pokud se má měnit heslo a existuje staré, ověř currentPassword
        if ($hasPassword && !empty($data['password'])) {
            $currentInput = $data['currentPassword'] ?? '';
            if (!password_verify($currentInput, $currentPassword)) {
                sendJson(['error' => 'Invalid current password'], 401);
            }
        }
        // Zkontrolovat zda existuje záznam
        $stmt = $db->query("SELECT id FROM salon_settings WHERE id = 1");
        $exists = $stmt->fetch();
        if ($exists) {
            $stmt = $db->prepare("UPDATE salon_settings SET name = ?, address = ?, phone = ?, email = ?, web = ?, ico = ?, dic = ?, receipt_footer = ?, password = ? WHERE id = 1");
        } else {
            $stmt = $db->prepare("INSERT INTO salon_settings (id, name, address, phone, email, web, ico, dic, receipt_footer, password) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        }

        $passwordToStore = $currentPassword;
        if (isset($data['password']) && $data['password'] !== '') {
            $passwordToStore = password_hash($data['password'], PASSWORD_BCRYPT);
        } elseif (!$hasPassword) {
            $passwordToStore = null;
        }
        
        $stmt->execute([
            $data['name'],
            $data['address'] ?? '',
            $data['phone'],
            $data['email'] ?? '',
            $data['web'] ?? '',
            $data['ico'] ?? '',
            $data['dic'] ?? '',
            $data['receiptFooter'] ?? '',
            $passwordToStore
        ]);
        // Po prvním nastavení hesla rovnou přihlásit
        if (!$hasPassword && isset($data['password']) && $data['password'] !== '') {
            $_SESSION['hairbook_logged_in'] = true;
        }
        sendJson(['success' => true]);
        break;
}
