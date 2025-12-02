<?php
require_once 'config.php';

// Otestuje připojení k DB a uloží konfiguraci do .env
// POST JSON: { type: "sqlite"|"mysql", host, name, user, pass, charset, wizardToken }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['error' => 'Použij POST'], 405);
}

$data = getJsonInput();

// Token je volitelný - kontrola jen pokud je nastaven v .env
if (getenv('WIZARD_TOKEN')) {
    requireSetupToken($data);
}

$type = $data['type'] ?? 'sqlite';
$host = $data['host'] ?? 'localhost';
$name = $data['name'] ?? 'hairbook';
$user = $data['user'] ?? 'root';
$pass = $data['pass'] ?? '';
$charset = $data['charset'] ?? 'utf8mb4';
$newToken = $data['wizardToken'] ?? null;

try {
    if ($type === 'mysql') {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $host, $name, $charset);
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        $pdo->query('SELECT 1');
    }
} catch (PDOException $e) {
    sendJson(['error' => 'Připojení k DB selhalo: ' . $e->getMessage()], 500);
}

// Uložit .env
$envPath = dirname(__DIR__) . '/.env';
$envVars = [];
if (is_readable($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0 || !str_contains($line, '=')) {
            continue;
        }
        [$k, $v] = explode('=', $line, 2);
        $envVars[trim($k)] = trim($v);
    }
}

$envVars['DB_TYPE'] = $type;
$envVars['DB_HOST'] = $host;
$envVars['DB_NAME'] = $name;
$envVars['DB_USER'] = $user;
$envVars['DB_PASS'] = $pass;
$envVars['DB_CHARSET'] = $charset;
if ($newToken) {
    $envVars['WIZARD_TOKEN'] = $newToken;
}

$lines = [];
foreach ($envVars as $k => $v) {
    $lines[] = $k . '=' . $v;
}
file_put_contents($envPath, implode("\n", $lines) . "\n");

sendJson([
    'success' => true,
    'message' => 'Konfigurace uložena do .env',
    'db' => [
        'type' => $type,
        'host' => $host,
        'name' => $name,
        'user' => $user,
        'charset' => $charset
    ],
    'envPath' => $envPath
]);
