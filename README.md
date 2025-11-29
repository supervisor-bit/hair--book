# HairBook 💇‍♀️

Komplexní desktop aplikace pro správu kadeřnického salonu s offline-first přístupem.

## 🚀 Hlavní funkce

### Správa klientů
- Evidence klientů s kontaktními údaji
- Historie všech návštěv
- Poznámky a fotogalerie (před/po)
- Pokročilé vyhledávání a filtrace

### Návštěvy
- Vytváření a uzavírání návštěv
- Přidávání služeb s materiály
- Přidávání produktů
- Automatické výpočty cen a DPH
- **🔄 Kopírování návštěv** - zkopírujte celou návštěvu do nové
- **📋 Šablony návštěv** - ukládejte často používané kombinace služeb

### Služby a materiály
- Katalog služeb s cenami
- Správa materiálů použitých při službách
- Drag & drop přidávání
- Kalkulace spotřeby

### Produkty a sklad
- Evidence produktů s DPH
- Sledování skladových zásob
- Nákupy a výdeje
- Automatická aktualizace stavu

## 📦 Technologie

- **Frontend**: Vanilla JavaScript (10,500+ řádků)
- **Backend**: PHP 8.2
- **Databáze**: SQLite 3
- **Server**: MAMP/Apache nebo vestavěný PHP server

## 🛠️ Instalace

### Požadavky
- PHP 8.2+
- MAMP nebo jiný PHP server (development)
- SQLite nebo MySQL/MariaDB (lze přepínat)

### Development (bez Electronu)

```bash
# Spuštění lokálního PHP serveru (např. port 8888)
php -S localhost:8888 server-router.php
```

### První spuštění

1. Otevři `http://localhost:8888/api/setup.html` (setup wizard)
2. Vyber DB (SQLite/MySQL), otestuj připojení a ulož `.env`
3. Klikni „Vytvořit tabulky“ (init-db)
4. Volitelně vlož JSON z localStorage a spusť migraci
5. Hotovo – otevři aplikaci na `http://localhost:8888/`

> Bezpečnost: pokud chceš chránit setup/reset endpointy, nastav v `.env` proměnnou `WIZARD_TOKEN` (lze zadat ve wizardu). Volání pak vyžaduje header `X-Setup-Token`.

## 🗄️ Databáze (SQLite / MySQL)

### Přepínání typu DB
Backend čte typ DB z proměnné `DB_TYPE` (`sqlite` nebo `mysql`). Pokud není nastavena, používá se SQLite (soubor `api/hairbook.db`).

Další proměnné pro MySQL/MariaDB:
```
DB_TYPE=mysql
DB_HOST=localhost
DB_NAME=hairbook
DB_USER=root
DB_PASS=heslo
DB_CHARSET=utf8mb4
```

### MySQL na MAMPu
1) Vytvoř DB (např. v phpMyAdmin nebo CLI):
```
CREATE DATABASE hairbook CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
2) Naimportuj dump (viz níže) nebo spusť `api/init-db.php` s nastavenými proměnnými `DB_TYPE=mysql` atd.
3) Přidej env proměnné do startu (např. `.env` nebo export v shellu), aby PHP používalo MySQL (lze nastavit i přes `api/setup.html`).

### MySQL dump
Vytvořil jsem SQL dump schématu pro MySQL v `/tmp/hairbook_mysql_dump.sql` (InnoDB, utf8mb4). Import:
```
mysql -u USER -p hairbook < /tmp/hairbook_mysql_dump.sql
```
Pokud dump nepoužiješ, `api/init-db.php` tabulky vytvoří také (přes PDO).

### Poznámky
- SQLite používá `api/hairbook.db` (přenosné, offline). MySQL zvol pro sdílené prostředí/hosting.
- Tabulky pro výdejky (`stock_issues`, `stock_issue_items`) a další entity se vytvoří automaticky v `init-db.php` nebo při volání příslušných endpointů (např. `api/issues.php`).

## 📁 Struktura projektu

```
HairBook/
├── api/                    # PHP backend
│   ├── config.php         # Databázová konfigurace
│   ├── init-db.php        # DB schéma
│   ├── clients.php        # API: Klienti
│   ├── visits.php         # API: Návštěvy
│   ├── services.php       # API: Služby
│   ├── products.php       # API: Produkty
│   ├── templates.php      # API: Šablony návštěv
│   ├── purchases.php      # API: Nákupy
│   ├── categories.php     # API: Kategorie
│   └── hairbook.db        # SQLite databáze
├── js/
│   └── app.js             # Hlavní aplikační logika
├── css/
│   └── styles.css         # Styly
├── index.html             # Hlavní HTML
├── modals.html            # Modální okna
├── server-router.php      # Router pro vestavěný PHP server
└── package.json           # NPM konfigurace
```

## 🗄️ Databázové schéma

### Hlavní tabulky

- **clients** - Klienti (name, phone, email, notes)
- **visits** - Návštěvy (client_id, services, products, total_price, closed)
- **services** - Služby (name, price, category_id)
- **products** - Produkty (name, price, vat_rate, stock_quantity)
- **visit_templates** - Šablony návštěv (name, services_data, products_data)
- **purchases** - Nákupy (product_id, quantity, purchase_price)
- **categories** - Kategorie (name, type)
- **client_notes** - Poznámky ke klientům
- **client_photos** - Fotografie klientů

## 🔧 API Endpointy

Všechny endpointy podporují REST operace (GET, POST, PUT, DELETE):

```javascript
// Příklad použití
fetch('http://localhost:8765/api/clients.php')
  .then(res => res.json())
  .then(data => console.log(data));
```

## ⚙️ Klíčové funkce

### Kopírování návštěv
```javascript
copyVisitToNew(clientId, visitId)
```
Zkopíruje služby, materiály a produkty z předchozí návštěvy.

### Šablony návštěv
```javascript
saveTemplateForm()       // Uložit šablonu
loadTemplate(templateId) // Načíst šablonu
deleteTemplate(id)       // Smazat šablonu
```

### Drag & Drop
- Materiály → Služby
- Produkty → Návštěva
- Řádkový režim pro touch zařízení

## 📊 Aktuální verze

**v1.0.4** (28. listopadu 2025)

### Changelog
- ✅ Šablony návštěv s SQLite úložištěm
- ✅ Kopírování návštěv
- ✅ Automatická migrace z localStorage
- ✅ Drag & drop řádkový view
- ✅ Opravy DPH zobrazení

## 🔐 Bezpečnost

- Prepared statements pro SQL
- Input sanitizace
- Lokální databáze (offline)
- CORS omezení

## 👨‍💻 Autor

Martin Vítek  
GitHub: [@supervisor-bit](https://github.com/supervisor-bit)

## 📝 Licence

Proprietární software

## Licence

© 2025 HairBook. Všechna práva vyhrazena.
