# HairBook - SQLite Backend Setup

## 📋 Co bylo vytvořeno

### API Endpoints:
- `api/clients.php` - Správa klientů (GET, POST, PUT, DELETE)
- `api/products.php` - Správa produktů (GET, POST, PUT, DELETE)
- `api/categories.php` - Správa kategorií (GET, POST, PUT, DELETE)
- `api/services.php` - Správa služeb (GET, POST, PUT, DELETE)
- `api/visits.php` - Správa návštěv a poznámek (POST, DELETE)
- `api/purchases.php` - Správa nákupů (POST, DELETE)
- `api/settings.php` - Nastavení salonu (GET, POST)

### Databáze:
- `api/hairbook.db` - SQLite databáze (vytvoří se automaticky)
- 12 tabulek pro všechna data

### Pomocné soubory:
- `api/init-db.php` - Vytvoření databázové struktury
- `api/migrate.php` - Migrace dat z localStorage
- `api/setup.html` - Webové rozhraní pro setup
- `api/config.php` - Sdílená konfigurace

## 🚀 Jak na to

### 1. Spuštění migrace (JEDNOU!)

**Otevři v prohlížeči:**
```
http://localhost:8888/HairBook/api/setup.html
```

**Klikni postupně:**
1. "Vytvořit databázi" - vytvoří `hairbook.db` a tabulky
2. "Migrovat data" - přesune všechna data z localStorage do SQLite

### 2. Co se stane

✅ Vytvoří se `api/hairbook.db` soubor  
✅ Všechna data z localStorage se zkopírují do SQLite  
✅ Ukáže statistiku (kolik klientů, produktů atd.)  

### 3. Záloha

**Záloha = zkopíruj soubor:**
```bash
cp api/hairbook.db api/hairbook_backup_$(date +%Y%m%d).db
```

Nebo prostě zkopíruj `hairbook.db` na flashku/cloud.

## 📊 Databázová struktura

### Hlavní tabulky:
- `clients` - klienti
- `client_notes` - poznámky u klientů
- `products` - produkty
- `product_categories` - kategorie produktů  
- `product_movements` - pohyby skladu
- `services` - služby
- `visits` - návštěvy klientů
- `visit_services` - služby v návštěvě
- `visit_materials` - použité materiály
- `visit_products` - prodané produkty v návštěvě
- `purchases` - samostatné nákupy
- `purchase_items` - položky nákupu
- `salon_settings` - nastavení salonu

## 🔧 Testování API

### Příklad - načtení klientů:
```bash
curl http://localhost:8888/HairBook/api/clients.php
```

### Příklad - přidání produktu:
```bash
curl -X POST http://localhost:8888/HairBook/api/products.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Šampon","unit":"ml","packageSize":100,"forSale":true,"forWork":true}'
```

## ⚠️ Důležité

- **Migrace jen JEDNOU!** - Spustit setup.html jen při prvním nastavení
- **Zálohy dělej ručně** - zkopíruj `hairbook.db` pravidelně
- **Jeden počítač** - SQLite je lokální, ne pro více zařízení současně
- **PHP musí běžet** - MAMP musí být zapnutý

## 🆘 Řešení problémů

**Chyba "Database connection failed"**
- Zkontroluj že MAMP běží
- Zkontroluj že složka `api/` má práva k zápisu

**Migrace selhala**
- Zkontroluj konzoli prohlížeče (F12)
- Zkontroluj že localStorage obsahuje data

**Chci začít znovu**
```bash
rm api/hairbook.db
# Pak znovu otevři setup.html
```

## 📝 Další kroky

Po úspěšné migraci je potřeba upravit `app.js` aby volal API místo localStorage.
To udělám v dalším kroku.
