<?php
// Inicializace databáze (SQLite nebo MySQL) pro HairBook

$dbType = getenv('DB_TYPE') ?: 'sqlite';
$dbName = getenv('DB_NAME') ?: 'hairbook';
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') ?: '';
$dbCharset = getenv('DB_CHARSET') ?: 'utf8mb4';
$dbFile = __DIR__ . '/hairbook.db';

try {
    if ($dbType === 'mysql') {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $dbHost, $dbName, $dbCharset);
        $db = new PDO($dsn, $dbUser, $dbPass);
    } else {
        $db = new PDO('sqlite:' . $dbFile);
        $db->exec('PRAGMA foreign_keys = ON');
    }
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $pkAuto = $dbType === 'mysql' ? 'INT AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    $engine = $dbType === 'mysql' ? ' ENGINE=InnoDB DEFAULT CHARSET=' . $dbCharset : '';
    $fkCascade = 'ON DELETE CASCADE';
    $fkSetNull = 'ON DELETE SET NULL';

    // Tabulka pro nastavení salonu
    $db->exec("CREATE TABLE IF NOT EXISTS salon_settings (
        id INT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT,
        phone TEXT,
        email TEXT,
        web TEXT,
        ico TEXT,
        dic TEXT,
        receipt_footer TEXT,
        password TEXT
    ){$engine}");

    // Klienti
    $db->exec("CREATE TABLE IF NOT EXISTS clients (
        id {$pkAuto},
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        avatar TEXT,
        group_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ){$engine}");

    // Poznámky klientů
    $db->exec("CREATE TABLE IF NOT EXISTS client_notes (
        id {$pkAuto},
        client_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (client_id) REFERENCES clients(id) {$fkCascade}
    ){$engine}");

    // Kategorie produktů
    $db->exec("CREATE TABLE IF NOT EXISTS product_categories (
        id {$pkAuto},
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL
    ){$engine}");

    // Produkty
    $db->exec("CREATE TABLE IF NOT EXISTS products (
        id {$pkAuto},
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
    ){$engine}");

    // Pohyby skladu
    $db->exec("CREATE TABLE IF NOT EXISTS product_movements (
        id {$pkAuto},
        product_id INTEGER NOT NULL,
        date DATE NOT NULL,
        type TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        note TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id) {$fkCascade}
    ){$engine}");

    // Služby
    $db->exec("CREATE TABLE IF NOT EXISTS services (
        id {$pkAuto},
        name TEXT NOT NULL,
        description TEXT,
        duration INTEGER NOT NULL
    ){$engine}");

    // Návštěvy
    $db->exec("CREATE TABLE IF NOT EXISTS visits (
        id {$pkAuto},
        client_id INTEGER NOT NULL,
        date DATE NOT NULL,
        closed BOOLEAN DEFAULT 0,
        price REAL DEFAULT 0,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id) {$fkCascade}
    ){$engine}");

    // Kalendář (rezervace)
    $db->exec("CREATE TABLE IF NOT EXISTS calendar_events (
        id {$pkAuto},
        client_id INTEGER,
        date DATE NOT NULL,
        time TEXT NOT NULL,
        duration_minutes INTEGER DEFAULT 30,
        client_name TEXT NOT NULL,
        client_phone TEXT,
        service TEXT,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ){$engine}");

    // Služby v návštěvě
    $db->exec("CREATE TABLE IF NOT EXISTS visit_services (
        id {$pkAuto},
        visit_id INTEGER NOT NULL,
        service_name TEXT NOT NULL,
        FOREIGN KEY (visit_id) REFERENCES visits(id) {$fkCascade}
    ){$engine}");

    // Materiály použité při službě
    $db->exec("CREATE TABLE IF NOT EXISTS visit_materials (
        id {$pkAuto},
        visit_service_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        base_unit TEXT NOT NULL,
        FOREIGN KEY (visit_service_id) REFERENCES visit_services(id) {$fkCascade},
        FOREIGN KEY (product_id) REFERENCES products(id)
    ){$engine}");

    // Produkty prodané v návštěvě
    $db->exec("CREATE TABLE IF NOT EXISTS visit_products (
        id {$pkAuto},
        visit_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        price REAL NOT NULL,
        unit TEXT,
        package_size REAL,
        FOREIGN KEY (visit_id) REFERENCES visits(id) {$fkCascade},
        FOREIGN KEY (product_id) REFERENCES products(id)
    ){$engine}");

    // Prodeje (bez návštěvy)
    $db->exec("CREATE TABLE IF NOT EXISTS purchases (
        id {$pkAuto},
        client_id INTEGER,
        date DATE NOT NULL,
        customer_name TEXT NOT NULL,
        total REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients(id) {$fkSetNull}
    ){$engine}");

    // Položky prodeje
    $db->exec("CREATE TABLE IF NOT EXISTS purchase_items (
        id {$pkAuto},
        purchase_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        quantity REAL NOT NULL,
        price REAL NOT NULL,
        purpose TEXT DEFAULT 'sale',
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) {$fkCascade},
        FOREIGN KEY (product_id) REFERENCES products(id)
    ){$engine}");

    // Příjemky
    $db->exec("CREATE TABLE IF NOT EXISTS stock_receipts (
        id {$pkAuto},
        date DATE NOT NULL,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ){$engine}");

    // Položky příjemek
    $db->exec("CREATE TABLE IF NOT EXISTS stock_receipt_items (
        id {$pkAuto},
        receipt_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        note TEXT,
        FOREIGN KEY (receipt_id) REFERENCES stock_receipts(id) {$fkCascade},
        FOREIGN KEY (product_id) REFERENCES products(id)
    ){$engine}");

    // Objednávky
    $db->exec("CREATE TABLE IF NOT EXISTS stock_orders (
        id {$pkAuto},
        date DATE NOT NULL,
        status TEXT DEFAULT 'pending',
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ){$engine}");

    // Položky objednávek
    $db->exec("CREATE TABLE IF NOT EXISTS stock_order_items (
        id {$pkAuto},
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        received INTEGER DEFAULT 0,
        FOREIGN KEY (order_id) REFERENCES stock_orders(id) {$fkCascade},
        FOREIGN KEY (product_id) REFERENCES products(id)
    ){$engine}");

    // Šablony návštěv
    $db->exec("CREATE TABLE IF NOT EXISTS visit_templates (
        id {$pkAuto},
        name TEXT NOT NULL,
        description TEXT,
        services_data TEXT NOT NULL,
        products_data TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ){$engine}");

    // Snapshoty období
    $db->exec("CREATE TABLE IF NOT EXISTS period_snapshots (
        id {$pkAuto},
        period TEXT NOT NULL,
        period_start DATE NOT NULL,
        period_end DATE NOT NULL,
        snapshot_data TEXT NOT NULL,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ){$engine}");

    // Výdejky
    $db->exec("CREATE TABLE IF NOT EXISTS stock_issues (
        id {$pkAuto},
        date DATE NOT NULL,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ){$engine}");

    // Položky výdejek
    $db->exec("CREATE TABLE IF NOT EXISTS stock_issue_items (
        id {$pkAuto},
        issue_id INTEGER NOT NULL,
        product_id INTEGER,
        product_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        FOREIGN KEY (issue_id) REFERENCES stock_issues(id) {$fkCascade},
        FOREIGN KEY (product_id) REFERENCES products(id)
    ){$engine}");

    // Indexy
    $db->exec("CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_visits_client ON visits(client_id)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(date)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_purchases_date ON purchases(date)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_receipts_date ON stock_receipts(date)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_orders_date ON stock_orders(date)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_orders_status ON stock_orders(status)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_templates_name ON visit_templates(name)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_snapshots_period ON period_snapshots(period)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_snapshots_date ON period_snapshots(created_at)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_issues_date ON stock_issues(date)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_calendar_date_time ON calendar_events(date, time)");

    echo "✅ Databáze úspěšně připravena\n";
} catch (PDOException $e) {
    die("❌ Chyba při vytváření databáze: " . $e->getMessage() . "\n");
}
