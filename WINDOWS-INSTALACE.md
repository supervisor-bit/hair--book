# 🪟 HairBook - Instalace na Windows

## ⚡ Rychlá instalace (5 minut)

### 1. Stáhnout a nainstalovat XAMPP
1. Jdi na: https://www.apachefriends.org/download.html
2. Stáhni **XAMPP for Windows** (PHP 8.2 nebo vyšší)
3. Spusť instalátor a nainstaluj (stačí PHP, nepotřebuješ Apache ani MySQL)

### 2. Nainstalovat HairBook
1. Spusť `HairBook Setup.exe`
2. Postupuj podle průvodce instalací
3. Aplikace se nainstaluje do `C:\Program Files\HairBook`

### 3. Spustit aplikaci
1. Spusť HairBook z nabídky Start nebo plochy
2. Aplikace automaticky najde PHP a spustí databázi
3. Pokud PHP není nalezeno, aplikace zobrazí návod

## 🔧 Ruční konfigurace PHP

Pokud XAMPP není nainstalovaný v základní lokaci, přidej PHP do PATH:

1. Otevři **Nastavení** → **Systém** → **Informace o systému**
2. Klikni na **Rozšířená nastavení systému**
3. Klikni na **Proměnné prostředí**
4. V sekci "Systémové proměnné" najdi **Path** a klikni **Upravit**
5. Přidej cestu k PHP, např: `C:\xampp\php`
6. Klikni **OK** a restartuj počítač

## ❓ Řešení problémů

### "PHP server se nepodařilo spustit"
- Nainstaluj XAMPP podle bodu 1
- Ujisti se, že PHP je v PATH
- Restartuj aplikaci

### "Aplikaci nelze spustit"
- Windows Defender může blokovat aplikaci
- Klikni na "Další informace" → "Přesto spustit"
- Aplikace není digitálně podepsaná (plánujeme v budoucnu)

### Databáze se neuloží
- Aplikace používá SQLite databázi v: `%APPDATA%\HairBook\api\hairbook.db`
- Zkontroluj, že máš oprávnění k zápisu

## 📞 Podpora

Máš problémy? Kontaktuj nás:
- GitHub: https://github.com/supervisor-bit/hair--book
- Email: support@hairbook.cz (plánovaný)
