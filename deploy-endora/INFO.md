# 📦 Obsah balíčku hairbook-app.zip

Tento ZIP obsahuje všechny potřebné soubory pro běh aplikace HairBook.

## 📁 Struktura souborů:

```
hairbook/
├── index.html              # Hlavní stránka aplikace
├── app.js                  # Hlavní JavaScript logika
├── styles.css              # Styly aplikace
├── .env                    # ⚠️ VYTVOŘ RUČNĚ! (viz .env.example)
├── .htaccess               # ⚠️ VYTVOŘ RUČNĚ! (viz .htaccess.example)
│
└── api/                    # Backend PHP API
    ├── config.php          # Konfigurace DB a inicializace
    ├── init-db.php         # Vytvoření databázového schématu
    ├── setup.html          # Setup wizard
    ├── setup-test.php      # Test DB připojení
    ├── backup.php          # Záloha/obnova dat
    ├── migrate.php         # Import dat
    ├── reset-db.php        # Reset databáze
    ├── test-data.php       # Testovací data
    │
    ├── auth.php            # Autentizace
    ├── clients.php         # API pro klienty
    ├── categories.php      # API pro kategorie
    ├── products.php        # API pro produkty
    ├── services.php        # API pro služby
    ├── visits.php          # API pro návštěvy
    ├── purchases.php       # API pro nákupy
    ├── calendar.php        # API pro kalendář
    ├── stock.php           # API pro sklad
    ├── receipts.php        # API pro příjemky
    ├── orders.php          # API pro objednávky
    ├── issues.php          # API pro výdejky
    ├── stats.php           # API pro statistiky
    └── templates.php       # API pro šablony návštěv
```

## ⚠️ Co NENÍ v ZIPu (musíš vytvořit ručně):

### 1. `.env` soubor
Použij `.env.example` jako šablonu a doplň své údaje z Endory.

### 2. `.htaccess` soubor (volitelné)
Použij `.htaccess.example` pro zabezpečení.

---

## 🚀 Po rozbalení:

1. Nahraj všechny soubory do `www/` nebo `public_html/`
2. Vytvoř `.env` podle `.env.example`
3. Vytvoř `.htaccess` podle `.htaccess.example` (volitelné)
4. Spusť setup wizard: `https://tvoje-domena.endora.site/api/setup.html`

---

**Podrobný návod najdeš v POSTUP.md**
