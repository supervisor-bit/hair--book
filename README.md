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
- **Desktop**: Electron
- **Server**: MAMP/Apache

## 🛠️ Instalace

### Požadavky
- Node.js 16+
- PHP 8.2+
- MAMP nebo jiný PHP server (development)

### Development

```bash
# Instalace závislostí
npm install

# Spuštění aplikace
npm start

# Build pro Windows
npm run build:win

# Build pro macOS
npm run build:mac
```

### První spuštění

1. Databáze se automaticky vytvoří při prvním spuštění
2. Pokud migrujete z localStorage, migrace proběhne automaticky

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
├── main.js                # Electron main process
├── preload.js             # Electron preload
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
