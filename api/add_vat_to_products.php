<?php
// Migrace: Přidání sloupce DPH do tabulky products

$dbFile = __DIR__ . '/hairbook.db';

try {
    $db = new PDO('sqlite:' . $dbFile);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Zkontrolovat, jestli sloupec už neexistuje
    $columns = $db->query("PRAGMA table_info(products)")->fetchAll(PDO::FETCH_ASSOC);
    $hasVat = false;
    
    foreach ($columns as $col) {
        if ($col['name'] === 'vat_rate') {
            $hasVat = true;
            break;
        }
    }
    
    if (!$hasVat) {
        echo "Přidávám sloupec vat_rate do tabulky products...\n";
        $db->exec("ALTER TABLE products ADD COLUMN vat_rate REAL DEFAULT 21");
        echo "✅ Sloupec vat_rate úspěšně přidán (výchozí hodnota: 21%)\n";
    } else {
        echo "⚠️ Sloupec vat_rate už existuje, přeskakuji\n";
    }
    
    echo "\n✅ Migrace dokončena\n";
    
} catch (PDOException $e) {
    die("❌ Chyba při migraci: " . $e->getMessage() . "\n");
}
?>
