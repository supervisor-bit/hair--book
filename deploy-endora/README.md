# 📦 HairBook - Deployment balíček pro Endora.cz

## 📂 Obsah složky:

### 📄 Dokumentace:
- **POSTUP.md** - Podrobný návod krok za krokem
- **INFO.md** - Informace o struktuře aplikace
- **CHECKLIST.md** - Kontrolní seznam (tento soubor)

### 🗂️ Konfigurační šablony:
- **.env.example** - Šablona pro databázové připojení
- **.htaccess.example** - Šablona pro zabezpečení

### 📦 Aplikace:
- **hairbook-app.zip** - Kompletní aplikace (35 souborů)

---

## ✅ Kontrolní seznam nasazení

### Před nahráním na server:

- [ ] Mám vytvořený účet na Endora.cz
- [ ] Mám vytvořený testovací hosting na `*.endora.site`
- [ ] Mám stažený balíček `hairbook-app.zip`
- [ ] Přečetl jsem si `POSTUP.md`

### Příprava databáze:

- [ ] Vytvořil jsem MySQL databázi v administraci Endory
- [ ] Poznamenal jsem si DB_HOST (obvykle `localhost`)
- [ ] Poznamenal jsem si DB_NAME (např. `u12345_hairbook`)
- [ ] Poznamenal jsem si DB_USER (obvykle stejné jako DB_NAME)
- [ ] Poznamenal jsem si DB_PASS (heslo z Endory)
- [ ] Vymyslel jsem si WIZARD_TOKEN (např. `test123`)

### Nahrání na server:

- [ ] Rozbalil jsem `hairbook-app.zip`
- [ ] Nahrál jsem všechny soubory do `www/` nebo `public_html/`
- [ ] Vytvořil jsem soubor `.env` podle `.env.example`
- [ ] Vyplnil jsem správné údaje do `.env` (DB_HOST, DB_NAME, DB_USER, DB_PASS, WIZARD_TOKEN)
- [ ] (Volitelné) Vytvořil jsem `.htaccess` podle `.htaccess.example`

### Spuštění aplikace:

- [ ] Otevřel jsem `https://moje-domena.endora.site/api/setup.html`
- [ ] Zadal jsem správný WIZARD_TOKEN
- [ ] Klikl jsem na "Vytvořit schéma"
- [ ] V logu se objevilo ✅ "Databázové schéma úspěšně vytvořeno"
- [ ] Otevřel jsem `https://moje-domena.endora.site/`
- [ ] Aplikace se úspěšně načetla

### Po instalaci:

- [ ] Aplikace funguje
- [ ] Mohu přidávat klienty
- [ ] Mohu přidávat produkty
- [ ] (Volitelné) Importoval jsem testovací data
- [ ] (Doporučené) Zabezpečil jsem `setup.html` pomocá `.htaccess`

---

## 🎯 Rychlý start

**Pro zkušené uživatele:**

```bash
# 1. Vytvoř MySQL DB v Endoře
# 2. Nahraj obsah hairbook-app.zip do www/
# 3. Vytvoř .env se správnými údaji
# 4. Otevři /api/setup.html a vytvoř schéma
# 5. Otevři / a používej aplikaci
```

---

## 🆘 Potřebuješ pomoc?

1. Přečti si **POSTUP.md** (podrobný návod)
2. Zkontroluj sekci "Řešení problémů" v POSTUP.md
3. Ověř, že máš správné údaje v `.env`

---

## 📋 Minimální požadavky serveru

- ✅ PHP 7.4 nebo vyšší
- ✅ MySQL 5.7 nebo vyšší (nebo MariaDB)
- ✅ PDO MySQL extension
- ✅ JSON extension
- ✅ mod_rewrite (volitelné, pro .htaccess)

**Endora.cz splňuje všechny tyto požadavky! ✅**

---

**Začni s POSTUP.md → krok za krokem tě to provede celým procesem! 🚀**
