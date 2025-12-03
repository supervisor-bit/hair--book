# 🚀 Nasazení HairBook na Endora.cz

## 📋 Příprava

### 1. Registrace na Endora.cz
- Jdi na https://endora.cz
- Vytvoř účet (zdarma)
- Vytvoř testovací hosting na `*.endora.site`

---

## 🗄️ Vytvoření MySQL databáze

### 2. Vytvoř databázi v administraci Endory
1. Přihlas se do administrace Endory
2. **Databáze** → **MySQL databáze**
3. Klikni **Vytvořit novou databázi**
4. Zadej název (např. `hairbook`)
5. Nastav heslo

📝 **Poznamenej si:**
- `DB_HOST`: `localhost` (nebo jak uvádí Endora)
- `DB_NAME`: např. `u12345_hairbook`
- `DB_USER`: např. `u12345_hairbook`
- `DB_PASS`: tvoje heslo

---

## 📤 Nahrání souborů

### 3. Nahraj aplikaci na server

**Možnost A - FTP klient (FileZilla):**
1. Stáhni FileZilla: https://filezilla-project.org
2. Připoj se:
   - Host: `ftp.endora.cz` (nebo jak uvádí Endora)
   - Uživatel: tvůj uživatel z Endory
   - Heslo: tvoje heslo z Endory
3. Rozbal `hairbook-app.zip`
4. Nahraj všechny soubory do složky `www/` nebo `public_html/`

**Možnost B - Web File Manager:**
1. V administraci Endory → **Správce souborů**
2. Nahraj `hairbook-app.zip`
3. Rozbal ho na serveru

---

## ⚙️ Konfigurace databáze

### 4. Vytvoř soubor .env

V kořenové složce (vedle `index.html`) vytvoř soubor `.env`:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_NAME=u12345_hairbook
DB_USER=u12345_hairbook
DB_PASS=tvoje-heslo-z-endory
DB_CHARSET=utf8mb4
WIZARD_TOKEN=tvuj-bezpecny-token-123
```

**⚠️ Důležité:** Změň hodnoty podle údajů z Endory!

---

## 🎯 Spuštění Setup Wizardu

### 5. Vytvoř databázové schéma

1. Otevři v prohlížeči: `https://tvoje-domena.endora.site/api/setup.html`
2. Do pole **Token** zadej: `tvuj-bezpecny-token-123` (stejný jako v .env)
3. Klikni **"Vytvořit schéma"**
4. V logu by se mělo objevit: ✅ **Databázové schéma úspěšně vytvořeno**

---

## 🎉 Spuštění aplikace

### 6. Otevři aplikaci

Jdi na: `https://tvoje-domena.endora.site/`

Měla by se načíst hlavní stránka HairBook! 🎊

---

## 🔒 Zabezpečení (volitelné, ale doporučené)

### 7. Ochrana citlivých souborů

Vytvoř soubor `.htaccess` v kořenové složce (vedle `index.html`):

```apache
# Ochrana .env souboru
<Files ".env">
    Require all denied
</Files>

# Ochrana setup.html (po dokončení setup)
<Files "setup.html">
    Require all denied
</Files>
```

---

## 📊 Testovací data (volitelné)

### 8. Import testovacích dat

Pokud chceš naplnit databázi testovacími daty:

1. Otevři: `https://tvoje-domena.endora.site/api/setup.html`
2. Zadej token
3. V sekci **3) Migrace dat** vlož JSON z lokálního prohlížeče (localStorage export)
4. Klikni **"Importovat"**

---

## 🆘 Řešení problémů

### Chyba: 401 Unauthorized při setup
- Zkontroluj, že máš správný token v `.env` a zadáváš stejný token v setup.html

### Chyba: Connection refused
- Zkontroluj údaje k databázi v `.env`
- Ověř, že databáze existuje v administraci Endory

### Chyba: Text DEFAULT (MySQL syntax)
- Tento problém je už opravený v aktuální verzi
- Pokud se objeví, stáhni nejnovější verzi z GitHub

### Aplikace se nenačte
- Zkontroluj, že jsou všechny soubory nahrány
- Zkontroluj cestu - aplikace musí být v `www/` nebo `public_html/`
- Ověř přístupová práva k souborům

---

## 📝 Checklist

- [ ] Vytvořen účet na Endora.cz
- [ ] Vytvořena MySQL databáze
- [ ] Nahrány soubory z `hairbook-app.zip`
- [ ] Vytvořen soubor `.env` se správnými údaji
- [ ] Spuštěn setup wizard (vytvořeno schéma)
- [ ] Aplikace funguje na `https://tvoje-domena.endora.site/`
- [ ] (Volitelné) Vytvořen `.htaccess` pro zabezpečení
- [ ] (Volitelné) Importována testovací data

---

## 🔗 Užitečné odkazy

- **Endora dokumentace:** https://endora.cz/napoveda
- **GitHub repository:** https://github.com/supervisor-bit/hair--book
- **Podpora:** martin@tvoje-email.cz

---

**Hotovo! 🎉 Aplikace HairBook je nasazená a připravená k použití.**
