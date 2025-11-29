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
