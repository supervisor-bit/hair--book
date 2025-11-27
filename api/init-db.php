<?php
// Inicializace SQLite databáze pro HairBook

$dbFile = __DIR__ . '/hairbook.db';

try {
    $db = new PDO('sqlite:' . $dbFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Tabulka pro nastavení salonu
    $db->exec("CREATE TABLE IF NOT EXISTS salon_settings (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT,
        phone TEXT,
        email TEXT,
        web TEXT,
        ico TEXT,
        dic TEXT,
        receipt_footer TEXT
    )");
    
    // Tabulka pro klienty
    $db->exec("CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        avatar TEXT,
        group_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Tabulka pro poznámky klientů
    $db->exec("CREATE TABLE IF NOT EXISTS client_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
    )");
    
    // Tabulka pro kategorie produktů
    $db->exec("CREATE TABLE IF NOT EXISTS product_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL
    )");
    
    // Tabulka pro produkty
    $db->exec("CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        barcode TEXT,
        description TEXT,
        category_id INTEGER,
        stock REAL DEFAULT 0,
        unit TEXT NOT NULL,
        package_size REAL NOT NULL,
        minimal_stock REAL DEFAULT 0,
        purchase_price REAL DEFAULT 0,
        sale_price REAL DEFAULT 0,
        vat_rate REAL DEFAULT 21,
        for_sale BOOLEAN DEFAULT 0,
        for_work BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES product_categories(id)
    )");
    
    // Tabulka pro pohyby skladu
    $db->exec("CREATE TABLE IF NOT EXISTS product_movements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        date DATE NOT NULL,
        type TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit_price REAL,
        note TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )");
    
    // Tabulka pro služby
    $db->exec("CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        duration INTEGER NOT NULL
    )");
    
    // Tabulka pro návštěvy
    $db->exec("CREATE TABLE IF NOT EXISTS visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        date DATE NOT NULL,
        closed BOOLEAN DEFAULT 0,
        price REAL DEFAULT 0,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
    )");
    
    // Tabulka pro služby v návštěvě
    $db->exec("CREATE TABLE IF NOT EXISTS visit_services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visit_id INTEGER NOT NULL,
        service_name TEXT NOT NULL,
        FOREIGN KEY (visit_id) REFERENCES visits(id) ON DELETE CASCADE
    )");
    
    // Tabulka pro materiály použité při službě
    $db->exec("CREATE TABLE IF NOT EXISTS visit_materials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visit_service_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        base_unit TEXT NOT NULL,
        FOREIGN KEY (visit_service_id) REFERENCES visit_services(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )");
    
    // Tabulka pro prodané produkty v návštěvě
    $db->exec("CREATE TABLE IF NOT EXISTS visit_products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visit_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (visit_id) REFERENCES visits(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )");
    
    // Tabulka pro nákupy (prodej produktů bez návštěvy)
    $db->exec("CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        date DATE NOT NULL,
        customer_name TEXT NOT NULL,
        total REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
    )");
    
    // Tabulka pro položky nákupu
    $db->exec("CREATE TABLE IF NOT EXISTS purchase_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        purchase_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        quantity REAL NOT NULL,
        price REAL NOT NULL,
        purpose TEXT DEFAULT 'sale',
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )");
    
    // Tabulka pro příjemky (příjem zboží)
    $db->exec("CREATE TABLE IF NOT EXISTS stock_receipts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Tabulka pro položky příjemky
    $db->exec("CREATE TABLE IF NOT EXISTS stock_receipt_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        receipt_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        note TEXT,
        FOREIGN KEY (receipt_id) REFERENCES stock_receipts(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )");
    
    // Tabulka pro objednávky zboží
    $db->exec("CREATE TABLE IF NOT EXISTS stock_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL,
        status TEXT DEFAULT 'pending',
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Tabulka pro položky objednávky
    $db->exec("CREATE TABLE IF NOT EXISTS stock_order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES stock_orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )");
    
    // Indexy pro rychlejší vyhledávání
    $db->exec("CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_visits_client ON visits(client_id)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(date)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_purchases_date ON purchases(date)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_receipts_date ON stock_receipts(date)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_orders_date ON stock_orders(date)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_orders_status ON stock_orders(status)");
    
    echo "✅ Databáze úspěšně vytvořena: " . $dbFile . "\n";
    echo "✅ Všechny tabulky vytvořeny\n";
    
} catch (PDOException $e) {
    die("❌ Chyba při vytváření databáze: " . $e->getMessage() . "\n");
}
?>
