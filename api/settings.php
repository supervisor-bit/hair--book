<?php

session_start();
require_once 'config.php';

$db = getDB();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

switch ($method) {
    case 'GET':
        $stmt = $db->query("SELECT * FROM salon_settings WHERE id = 1");
        $settings = $stmt->fetch();
        if (!$settings) {
            sendJson([
                'name' => 'HairBook',
                'address' => '',
                'web' => 'www.hairbook.cz',
                'receiptFooter' => 'Děkujeme za Vaši návštěvu!'
            ]);
        }
        // Konvertovat snake_case na camelCase
        $public = [
            'name' => $settings['name'],
            'address' => $settings['address'],
            'web' => $settings['web'],
            'receiptFooter' => $settings['receipt_footer'],
            'hasPassword' => !empty($settings['password'])
        ];
        if (!empty($_SESSION['hairbook_logged_in'])) {
            // Přihlášený uživatel dostane kompletní nastavení
            $settings['receiptFooter'] = $settings['receipt_footer'];
            unset($settings['receipt_footer']);
            unset($settings['password']);
            sendJson($settings);
        } else {
            // Nepřihlášený uživatel dostane jen veřejné info
            sendJson($public);
        }
        break;
    case 'POST':
    case 'PUT':
        if (empty($_SESSION['hairbook_logged_in'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            exit;
        }
        $data = getJsonInput();
        // Zkontrolovat zda existuje záznam
        $stmt = $db->query("SELECT id FROM salon_settings WHERE id = 1");
        $exists = $stmt->fetch();
        if ($exists) {
            $stmt = $db->prepare("UPDATE salon_settings SET name = ?, address = ?, phone = ?, email = ?, web = ?, ico = ?, dic = ?, receipt_footer = ?, password = ? WHERE id = 1");
        } else {
            $stmt = $db->prepare("INSERT INTO salon_settings (id, name, address, phone, email, web, ico, dic, receipt_footer, password) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
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
            $data['password'] ?? null
        ]);
        sendJson(['success' => true]);
        break;
}
