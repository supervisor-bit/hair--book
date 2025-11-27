<?php
// Vytvoření tabulky appointments
$db = new PDO('sqlite:../db/hairbook.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    // Kontrola, zda tabulka existuje
    $result = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='appointments'");
    if ($result->fetch()) {
        echo '✓ Tabulka appointments již existuje' . PHP_EOL;
        exit(0);
    }

    // Vytvoření tabulky
    $db->exec('
        CREATE TABLE appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER NOT NULL,
            service_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            duration INTEGER DEFAULT 60,
            note TEXT,
            created_at TEXT NOT NULL,
            FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
            FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
        )
    ');

    $db->exec('CREATE INDEX idx_appointments_date ON appointments(date)');
    $db->exec('CREATE INDEX idx_appointments_client ON appointments(client_id)');
    $db->exec('CREATE INDEX idx_appointments_service ON appointments(service_id)');

    echo '✅ Tabulka appointments úspěšně vytvořena s indexy' . PHP_EOL;
    
} catch (PDOException $e) {
    echo '❌ Chyba: ' . $e->getMessage() . PHP_EOL;
    exit(1);
}
?>
