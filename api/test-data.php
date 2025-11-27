<?php
require_once 'config.php';

try {
    $db = getDB();
    
    // Vymazat existující data
    $db->exec("DELETE FROM client_notes");
    $db->exec("DELETE FROM clients");
    $db->exec("DELETE FROM product_movements");
    $db->exec("DELETE FROM products");
    $db->exec("DELETE FROM product_categories");
    
    // Reset auto-increment
    $db->exec("DELETE FROM sqlite_sequence WHERE name IN ('clients', 'client_notes', 'products', 'product_categories')");
    
    echo "🗑️  Data vymazána\n\n";
    
    // ===== KATEGORIE L'ORÉAL PROFESSIONNEL =====
    $categories = [
        ['id' => 1, 'name' => 'INOA', 'color' => '#8B4789', 'icon' => '🎨'],
        ['id' => 2, 'name' => 'Dialight', 'color' => '#E91E63', 'icon' => '✨'],
        ['id' => 3, 'name' => 'Série Expert', 'color' => '#2196F3', 'icon' => '💧'],
        ['id' => 4, 'name' => 'Tecni.Art', 'color' => '#FF9800', 'icon' => '💨'],
        ['id' => 5, 'name' => 'Blond Studio', 'color' => '#FFC107', 'icon' => '⚡'],
    ];
    
    $stmt = $db->prepare("INSERT INTO product_categories (id, name, color, icon) VALUES (?, ?, ?, ?)");
    foreach ($categories as $cat) {
        $stmt->execute([$cat['id'], $cat['name'], $cat['color'], $cat['icon']]);
    }
    echo "✅ Vytvořeno " . count($categories) . " kategorií L'Oréal Professionnel\n";
    
    // ===== PRODUKTY L'ORÉAL PROFESSIONNEL =====
    $products = [
        // INOA - barvy
        ['name' => 'INOA 6.0 Tmavá Blond', 'barcode' => '3474636397297', 'category_id' => 1, 'stock' => 500, 'unit' => 'ml', 'package_size' => 60, 'minimal_stock' => 180, 'purchase_price' => 145, 'sale_price' => 290, 'for_sale' => 1, 'for_work' => 1],
        ['name' => 'INOA 7.0 Blond', 'barcode' => '3474636397303', 'category_id' => 1, 'stock' => 450, 'unit' => 'ml', 'package_size' => 60, 'minimal_stock' => 180, 'purchase_price' => 145, 'sale_price' => 290, 'for_sale' => 1, 'for_work' => 1],
        ['name' => 'INOA 8.0 Světlá Blond', 'barcode' => '3474636397310', 'category_id' => 1, 'stock' => 400, 'unit' => 'ml', 'package_size' => 60, 'minimal_stock' => 180, 'purchase_price' => 145, 'sale_price' => 290, 'for_sale' => 1, 'for_work' => 1],
        ['name' => 'INOA Oxidant 6% 20vol', 'barcode' => '3474636976690', 'category_id' => 1, 'stock' => 2000, 'unit' => 'ml', 'package_size' => 1000, 'minimal_stock' => 1000, 'purchase_price' => 180, 'sale_price' => 0, 'for_sale' => 0, 'for_work' => 1],
        
        // Dialight - tónovací barvy
        ['name' => 'Dialight 7.01 Blond Popelavá', 'barcode' => '3474636397426', 'category_id' => 2, 'stock' => 300, 'unit' => 'ml', 'package_size' => 50, 'minimal_stock' => 150, 'purchase_price' => 125, 'sale_price' => 250, 'for_sale' => 1, 'for_work' => 1],
        ['name' => 'Dialight 9.01 Velmi Světlá Blond', 'barcode' => '3474636397440', 'category_id' => 2, 'stock' => 250, 'unit' => 'ml', 'package_size' => 50, 'minimal_stock' => 150, 'purchase_price' => 125, 'sale_price' => 250, 'for_sale' => 1, 'for_work' => 1],
        ['name' => 'Dialight Aktivátor 1,35%', 'barcode' => '3474636976706', 'category_id' => 2, 'stock' => 1500, 'unit' => 'ml', 'package_size' => 1000, 'minimal_stock' => 1000, 'purchase_price' => 160, 'sale_price' => 0, 'for_sale' => 0, 'for_work' => 1],
        
        // Série Expert - péče o vlasy
        ['name' => 'Absolut Repair Shampoo', 'barcode' => '3474636977390', 'category_id' => 3, 'stock' => 5, 'unit' => 'ks', 'package_size' => 1, 'minimal_stock' => 3, 'purchase_price' => 280, 'sale_price' => 560, 'for_sale' => 1, 'for_work' => 1],
        ['name' => 'Absolut Repair Maska', 'barcode' => '3474636977406', 'category_id' => 3, 'stock' => 800, 'unit' => 'ml', 'package_size' => 500, 'minimal_stock' => 500, 'purchase_price' => 620, 'sale_price' => 0, 'for_sale' => 0, 'for_work' => 1],
        ['name' => 'Silver Shampoo', 'barcode' => '3474636977413', 'category_id' => 3, 'stock' => 4, 'unit' => 'ks', 'package_size' => 1, 'minimal_stock' => 3, 'purchase_price' => 290, 'sale_price' => 580, 'for_sale' => 1, 'for_work' => 1],
        
        // Tecni.Art - styling
        ['name' => 'Tecni.Art Fix Design', 'barcode' => '3474636977420', 'category_id' => 4, 'stock' => 8, 'unit' => 'ks', 'package_size' => 1, 'minimal_stock' => 5, 'purchase_price' => 210, 'sale_price' => 420, 'for_sale' => 1, 'for_work' => 1],
        ['name' => 'Tecni.Art Volume Lift', 'barcode' => '3474636977437', 'category_id' => 4, 'stock' => 6, 'unit' => 'ks', 'package_size' => 1, 'minimal_stock' => 5, 'purchase_price' => 210, 'sale_price' => 420, 'for_sale' => 1, 'for_work' => 1],
        
        // Blond Studio - zesvětlování
        ['name' => 'Blond Studio Multi-Techniques Powder', 'barcode' => '3474636977444', 'category_id' => 5, 'stock' => 800, 'unit' => 'g', 'package_size' => 500, 'minimal_stock' => 500, 'purchase_price' => 480, 'sale_price' => 0, 'for_sale' => 0, 'for_work' => 1],
        ['name' => 'Blond Studio Platinium Plus', 'barcode' => '3474636977451', 'category_id' => 5, 'stock' => 600, 'unit' => 'g', 'package_size' => 500, 'minimal_stock' => 500, 'purchase_price' => 520, 'sale_price' => 0, 'for_sale' => 0, 'for_work' => 1],
        ['name' => 'Blond Studio Nutri-Developer 9% 30vol', 'barcode' => '3474636977468', 'category_id' => 5, 'stock' => 1800, 'unit' => 'ml', 'package_size' => 1000, 'minimal_stock' => 1000, 'purchase_price' => 190, 'sale_price' => 0, 'for_sale' => 0, 'for_work' => 1],
    ];
    
    $stmt = $db->prepare("INSERT INTO products (name, barcode, description, category_id, stock, unit, package_size, minimal_stock, purchase_price, sale_price, for_sale, for_work) VALUES (?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    foreach ($products as $product) {
        $stmt->execute([
            $product['name'],
            $product['barcode'],
            $product['category_id'],
            $product['stock'],
            $product['unit'],
            $product['package_size'],
            $product['minimal_stock'],
            $product['purchase_price'],
            $product['sale_price'],
            $product['for_sale'],
            $product['for_work']
        ]);
    }
    echo "✅ Vytvořeno " . count($products) . " produktů L'Oréal Professionnel\n\n";
    
    // ===== KLIENTI =====
    $clients = [
        ['first_name' => 'Jana', 'last_name' => 'Nováková', 'phone' => '+420 777 123 456', 'email' => 'jana.novakova@email.cz', 'avatar' => null],
        ['first_name' => 'Petra', 'last_name' => 'Svobodová', 'phone' => '+420 608 234 567', 'email' => 'petra.svobodova@email.cz', 'avatar' => null],
        ['first_name' => 'Lucie', 'last_name' => 'Dvořáková', 'phone' => '+420 731 345 678', 'email' => 'lucie.dvorakova@email.cz', 'avatar' => null],
    ];
    
    $stmt = $db->prepare("INSERT INTO clients (first_name, last_name, phone, email, avatar) VALUES (?, ?, ?, ?, ?)");
    foreach ($clients as $client) {
        $stmt->execute([
            $client['first_name'],
            $client['last_name'],
            $client['phone'],
            $client['email'],
            $client['avatar']
        ]);
        
        // Přidat testovací poznámku ke každému klientovi
        $clientId = $db->lastInsertId();
        $noteStmt = $db->prepare("INSERT INTO client_notes (client_id, text, date) VALUES (?, ?, date('now'))");
        $noteStmt->execute([
            $clientId,
            "První návštěva - konzultace barvy vlasů. Klientka preferuje přírodní odstíny blond."
        ]);
    }
    echo "✅ Vytvořeno " . count($clients) . " klientů s poznámkami\n\n";
    
    echo "🎉 Testovací data L'Oréal Professionnel úspěšně vytvořena!\n";
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "📊 Souhrn:\n";
    echo "   • " . count($categories) . " kategorií produktů\n";
    echo "   • " . count($products) . " produktů s čárovými kódy\n";
    echo "   • " . count($clients) . " klientů s poznámkami\n";
    
} catch (Exception $e) {
    echo "❌ Chyba: " . $e->getMessage() . "\n";
    exit(1);
}
?>
