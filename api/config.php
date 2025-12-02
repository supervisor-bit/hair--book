<?php
// Načtení .env (pokud existuje)
function loadEnv($path) {
    if (!is_readable($path)) {
        return;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        if (!str_contains($line, '=')) {
            continue;
        }
        [$key, $val] = explode('=', $line, 2);
        $key = trim($key);
        $val = trim($val);
        putenv("$key=$val");
        $_ENV[$key] = $val;
    }
}
loadEnv(dirname(__DIR__) . '/.env');

// Initialize database schema
function initDatabase($db, $dbType, $charset = 'utf8mb4') {
    $pkAuto = $dbType === 'mysql' ? 'INT AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    $engine = $dbType === 'mysql' ? ' ENGINE=InnoDB DEFAULT CHARSET=' . $charset : '';
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
        purpose VARCHAR(50) DEFAULT 'sale',
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
        status VARCHAR(50) DEFAULT 'pending',
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

    // Indexy (MySQL nepodporuje IF NOT EXISTS pro indexy, tak wrap do try-catch)
    $indexes = [
        "CREATE INDEX idx_clients_phone ON clients(phone)",
        "CREATE INDEX idx_products_barcode ON products(barcode)",
        "CREATE INDEX idx_visits_client ON visits(client_id)",
        "CREATE INDEX idx_visits_date ON visits(date)",
        "CREATE INDEX idx_purchases_date ON purchases(date)",
        "CREATE INDEX idx_receipts_date ON stock_receipts(date)",
        "CREATE INDEX idx_orders_date ON stock_orders(date)",
        "CREATE INDEX idx_orders_status ON stock_orders(status)",
        "CREATE INDEX idx_templates_name ON visit_templates(name)",
        "CREATE INDEX idx_snapshots_period ON period_snapshots(period)",
        "CREATE INDEX idx_snapshots_date ON period_snapshots(created_at)",
        "CREATE INDEX idx_issues_date ON stock_issues(date)",
        "CREATE INDEX idx_calendar_date_time ON calendar_events(date, time)"
    ];
    
    foreach ($indexes as $indexSql) {
        try {
            $db->exec($indexSql);
        } catch (PDOException $e) {
            // Index už existuje, ignorujeme
        }
    }
}

// Database connection
function getDB() {
    $config = [
        'type' => getenv('DB_TYPE') ?: 'sqlite',
        'host' => getenv('DB_HOST') ?: 'localhost',
        'name' => getenv('DB_NAME') ?: 'hairbook',
        'user' => getenv('DB_USER') ?: 'root',
        'pass' => getenv('DB_PASS') ?: '',
        'charset' => getenv('DB_CHARSET') ?: 'utf8mb4',
        'file' => __DIR__ . '/hairbook.db'
    ];
    
    try {
        if ($config['type'] === 'mysql') {
            $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $config['host'], $config['name'], $config['charset']);
            $db = new PDO($dsn, $config['user'], $config['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]);
            
            // Auto-init: zkontrolovat jestli existují tabulky, pokud ne vytvořit
            try {
                $db->query("SELECT 1 FROM clients LIMIT 1");
            } catch (PDOException $e) {
                // Tabulky neexistují, vytvořit je
                initDatabase($db, $config['type'], $config['charset']);
            }
        } else {
            // Default: SQLite
            $db = new PDO('sqlite:' . $config['file']);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $db->exec('PRAGMA foreign_keys = ON');
        }
        return $db;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit;
    }
}

// CORS headers
header('Content-Type: application/json; charset=utf-8');
// Povolit pouze localhost (včetně portu) a file:// pro Electron
$allowedOrigins = [
    'http://localhost',
    'http://localhost:8765',
    'http://127.0.0.1',
    'file://'
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: http://localhost'); // fallback
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Chytat varování/notice a poslat JSON místo HTML
ini_set('display_errors', '0');
set_error_handler(function($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});
set_exception_handler(function($e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
});

// Handle preflight
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get JSON input
function getJsonInput() {
    return json_decode(file_get_contents('php://input'), true);
}

// Send JSON response
function sendJson($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// Ověření setup tokenu (pokud je nastaven WIZARD_TOKEN)
function requireSetupToken(array $payload = null) {
    $expected = getenv('WIZARD_TOKEN');
    if (!$expected) {
        return;
    }
    $provided = $_SERVER['HTTP_X_SETUP_TOKEN'] ?? null;
    if (!$provided && $payload !== null && isset($payload['token'])) {
        $provided = $payload['token'];
    }
    if (!$provided && isset($_GET['token'])) {
        $provided = $_GET['token'];
    }
    if ($provided !== $expected) {
        sendJson(['error' => 'Unauthorized'], 401);
    }
}
?>
