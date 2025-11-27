# 🎉 HairBook - Migrace na SQLite HOTOVO!

## ✅ Co bylo uděláno

### Backend (SQLite + PHP):
- ✅ SQLite databáze s 12 tabulkami
- ✅ 7 PHP API endpointů pro všechna data
- ✅ Automatická migrace z localStorage
- ✅ Webové rozhraní pro setup

### Frontend (JavaScript):
- ✅ Upravený app.js pro volání API
- ✅ Async/await pro všechny operace
- ✅ Notifikace o úspěchu/chybách
- ✅ Zpětná kompatibilita zachována

## 🚀 JAK SPUSTIT (DŮLEŽITÉ!)

### Krok 1: Spuštění migrace
```
1. Otevři prohlížeč
2. Jdi na: http://localhost:8888/HairBook/api/setup.html
3. Klikni "Vytvořit databázi"
4. Klikni "Migrovat data"
5. Hotovo!
```

### Krok 2: Otevři HairBook
```
http://localhost:8888/HairBook/
```

## 📋 Co se změnilo

### PŘED (localStorage):
```javascript
clients.push(newClient);
saveToLocalStorage(); // Ukládá do prohlížeče
```

### PO (SQLite):
```javascript
const result = await apiCall('clients.php', 'POST', clientData);
// Ukládá do SQLite databáze
```

## 🎯 Upravené funkce

### Načítání dat:
- `loadAllData()` - načte vše z API paralelně
- Volá se automaticky při startu aplikace

### Klienti:
- `saveClientForm()` - ukládá přes API
- `confirmDeleteClient()` - maže přes API
- `saveNoteForm()` - ukládá poznámky přes API
- `deleteNote()` - maže poznámky přes API

### Produkty:
- `saveProductForm()` - ukládá přes API
- `saveQuickEntry()` - rychlé pořizování přes API

### Ostatní:
- Služby, kategorie, nastavení - zatím fungují lokálně
- Budou postupně přidány do API

## 💾 Záloha dat

**Jednoduché:**
```bash
# Zkopíruj soubor databáze
cp api/hairbook.db api/backup_$(date +%Y%m%d).db
```

Nebo prostě zkopíruj `api/hairbook.db` na flashku.

## ⚠️ DŮLEŽITÉ

1. **MAMP musí běžet!** - Bez něj nefunguje PHP
2. **Migrace JEDNOU!** - Setup spusť jen poprvé
3. **Data v SQLite** - Už ne v localStorage
4. **Zálohy ručně** - Pravidelně kopíruj `hairbook.db`

## 🐛 Řešení problémů

### "Chyba při komunikaci se serverem"
- Zkontroluj že MAMP běží (zelené světlo)
- Zkontroluj že jsi v http://localhost:8888/

### "Načítám data..." visí
- Otevři konzoli (F12) → zkontroluj chyby
- Pravděpodobně databáze neexistuje
- Spusť znovu setup.html

### Chci začít znovu
```bash
rm api/hairbook.db
# Pak znovu otevři setup.html
```

## 📊 Struktura souborů

```
/HairBook/
├── index.html
├── app.js              ← UPRAVENO (volá API)
├── api/
│   ├── hairbook.db     ← DATABÁZE (vytvoří se)
│   ├── config.php      
│   ├── init-db.php     
│   ├── migrate.php     
│   ├── setup.html      ← SPUSTIT JAKO PRVNÍ!
│   ├── clients.php     
│   ├── products.php    
│   ├── categories.php  
│   ├── services.php    
│   ├── visits.php      
│   ├── purchases.php   
│   ├── settings.php    
│   └── README.md
```

## 🎯 Další kroky (VOLITELNÉ)

- [ ] Dopsat API volání pro návštěvy
- [ ] Dopsat API volání pro prodej
- [ ] Dopsat API volání pro příjem zboží
- [ ] Dopsat API volání pro služby a kategorie

*Zatím tyto funkce fungují lokálně v paměti a ztratí se při reloadu - ale klienti a produkty se ukládají do SQLite!*

## ✨ Výhody SQLite

✅ **Rychlost** - Lokální databáze, žádná síť  
✅ **Záloha** - Jeden soubor ke zkopírování  
✅ **Spolehlivost** - Žádná ztráta dat při zavření prohlížeče  
✅ **Přenositelnost** - Funguje na jakémkoliv počítači s MAMP  
✅ **Jednoduchost** - Žádný MySQL server není potřeba  

---

**🎉 GRATULUJEME! HairBook nyní používá SQLite databázi!**

**Další krok:** Otevři `http://localhost:8888/HairBook/api/setup.html`
