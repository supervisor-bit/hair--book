<?php
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
                'phone' => '+420 123 456 789',
                'email' => '',
                'web' => 'www.hairbook.cz',
                'ico' => '',
                'dic' => '',
                'receiptFooter' => 'Děkujeme za Vaši návštěvu!',
                'password' => null
            ]);
        }
        
        // Konvertovat snake_case na camelCase
        $settings['receiptFooter'] = $settings['receipt_footer'];
        unset($settings['receipt_footer']);
        sendJson($settings);
        break;
        
    case 'POST':
    case 'PUT':
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
?>
