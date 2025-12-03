# 🍓 HairBook - Instalace na Raspberry Pi

## 📦 Co budeš potřebovat

### Hardware
- **Raspberry Pi 4** (4GB RAM) - ~2000 Kč
- **MicroSD karta** 32GB+ (SanDisk High Endurance) - ~300 Kč
- **Napájecí adaptér** USB-C 5V/3A - ~250 Kč
- **Pouzdro** s chlazením - ~200 Kč
- **Ethernet kabel** (volitelné, ale doporučené) - ~50 Kč

**Celkem: ~2800 Kč** (jednorázově)

---

## 🚀 Krok 1: Příprava Raspberry Pi

### 1.1 Nainstaluj Raspberry Pi OS

1. Stáhni **Raspberry Pi Imager**: https://www.raspberrypi.com/software/
2. Vlož microSD kartu do počítače
3. Otevři Imager a vyber:
   - **OS**: Raspberry Pi OS Lite (64-bit) - bez desktopu, šetří výkon
   - **Storage**: Tvoje microSD karta
4. Klikni na ⚙️ (nastavení) a nastav:
   - ✅ Hostname: `hairbook.local`
   - ✅ Enable SSH (Use password authentication)
   - ✅ Username: `hairbook`
   - ✅ Password: `tvoje-silne-heslo`
   - ✅ WiFi SSID a heslo (pokud nepoužíváš kabel)
   - ✅ Locale: Europe/Prague, cs_CZ
5. Klikni **WRITE** a počkej (~5 minut)
6. Vyjmi kartu a vlož ji do Raspberry Pi
7. Připoj napájení a ethernet kabel

### 1.2 První připojení

Počkej 2 minuty, než RPi nabootuje, pak:

```bash
# Z tvého Macu se připoj přes SSH
ssh hairbook@hairbook.local

# Pokud to nefunguje, najdi IP adresu v routeru a použij:
ssh hairbook@192.168.1.XXX
```

---

## 🔧 Krok 2: Instalace potřebného software

### 2.1 Update systému

```bash
# Aktualizuj systém
sudo apt update && sudo apt upgrade -y

# Nainstaluj základní nástroje
sudo apt install -y git curl vim
```

### 2.2 Instalace webserveru a PHP

```bash
# Nainstaluj Apache, PHP 8+ a SQLite
sudo apt install -y apache2 php php-sqlite3 php-mbstring php-xml php-curl php-zip sqlite3

# Povol Apache při startu
sudo systemctl enable apache2
sudo systemctl start apache2

# Ověř instalaci
php -v
# Mělo by vypsat PHP 8.x
```

### 2.3 Konfigurace Apache

```bash
# Povolit mod_rewrite
sudo a2enmod rewrite

# Upravit konfiguraci
sudo nano /etc/apache2/sites-available/000-default.conf
```

Uprav řádek `DocumentRoot` na:
```apache
DocumentRoot /var/www/hairbook
```

A přidej před `</VirtualHost>`:
```apache
<Directory /var/www/hairbook>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

Ulož (Ctrl+O, Enter, Ctrl+X) a restart Apache:
```bash
sudo systemctl restart apache2
```

---

## 📁 Krok 3: Nahrání aplikace

### 3.1 Vytvoř složku pro aplikaci

```bash
# Vytvoř složku
sudo mkdir -p /var/www/hairbook

# Nastav oprávnění
sudo chown -R hairbook:www-data /var/www/hairbook
sudo chmod -R 775 /var/www/hairbook
```

### 3.2 Nahraj soubory

**Varianta A: Z tvého Macu přes SCP**

```bash
# Na tvém Macu (v terminalu, ve složce projektu)
cd /Applications/MAMP/htdocs/HairBook

# Zkopíruj všechny soubory na RPi
scp -r * hairbook@hairbook.local:/var/www/hairbook/
```

**Varianta B: Přes Git** (pokud máš projekt na GitHubu)

```bash
# Na RPi
cd /var/www/hairbook
git clone https://github.com/supervisor-bit/hair--book.git .
```

### 3.3 Nastav oprávnění pro databázi

```bash
# Vytvoř složku pro databázi
sudo mkdir -p /var/www/hairbook/data
sudo chown -R www-data:www-data /var/www/hairbook/data
sudo chmod -R 775 /var/www/hairbook/data

# Nastav oprávnění pro API složku
sudo chown -R www-data:www-data /var/www/hairbook/api
sudo chmod -R 775 /var/www/hairbook/api
```

---

## 🔐 Krok 4: Konfigurace databáze

### 4.1 Inicializuj databázi

```bash
# Přejdi do složky
cd /var/www/hairbook

# Spusť inicializační skript
php api/init-db.php
```

Mělo by vypsat: `✅ Databáze úspěšně inicializována`

### 4.2 Vytvoř prvního uživatele

Otevři v prohlížeči: `http://hairbook.local/api/setup.html`

Vytvoř administrátorský účet:
- Username: `admin`
- Password: `tvoje-bezpecne-heslo`

---

## 🌐 Krok 5: Nastavení statické IP

### 5.1 Zjisti aktuální IP

```bash
ip addr show
# Hledej řádek s "inet 192.168.1.XXX"
```

### 5.2 Nastav statickou IP

```bash
sudo nano /etc/dhcpcd.conf
```

Na konec souboru přidej:
```bash
interface eth0
static ip_address=192.168.1.50/24
static routers=192.168.1.1
static domain_name_servers=192.168.1.1 8.8.8.8
```

Ulož a restartuj:
```bash
sudo reboot
```

---

## 📱 Krok 6: Připojení iPadu a počítačů

### 6.1 Na iPadu

1. Otevři Safari
2. Zadej: `http://192.168.1.50/mobile.html`
3. Klikni na **⎙ Sdílet** → **Přidat na plochu**
4. Zadej název: "HairBook POS"
5. Teď máš ikonu na ploše jako nativní aplikace!

### 6.2 Na počítači (hlavní aplikace)

1. Otevři Chrome/Safari
2. Zadej: `http://192.168.1.50/`
3. Přihlas se
4. Přidej záložku pro rychlý přístup

---

## 🔒 Krok 7: Zabezpečení (volitelné, ale doporučené)

### 7.1 Firewall

```bash
# Nainstaluj UFW
sudo apt install -y ufw

# Povol SSH a HTTP
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Aktivuj firewall
sudo ufw enable
```

### 7.2 HTTPS certifikát (pro bezpečné spojení)

```bash
# Nainstaluj Certbot
sudo apt install -y certbot python3-certbot-apache

# Získej certifikát (vyžaduje doménu)
sudo certbot --apache -d tvoje-domena.cz
```

---

## 💾 Krok 8: Automatické zálohování

### 8.1 Vytvoř backup skript

```bash
sudo nano /usr/local/bin/hairbook-backup.sh
```

Vlož:
```bash
#!/bin/bash
BACKUP_DIR="/var/www/hairbook/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_FILE="/var/www/hairbook/data/hairbook.db"

# Vytvoř složku pro backupy
mkdir -p $BACKUP_DIR

# Zkopíruj databázi
cp $DB_FILE $BACKUP_DIR/hairbook_$DATE.db

# Smaž backupy starší než 30 dní
find $BACKUP_DIR -name "hairbook_*.db" -mtime +30 -delete

echo "✅ Backup vytvořen: hairbook_$DATE.db"
```

Nastav oprávnění:
```bash
sudo chmod +x /usr/local/bin/hairbook-backup.sh
```

### 8.2 Naplánuj denní backup

```bash
sudo crontab -e
```

Přidej řádek (backup každý den v 2:00):
```
0 2 * * * /usr/local/bin/hairbook-backup.sh
```

---

## 🔄 Krok 9: Aktualizace aplikace

Když budeš chtít aktualizovat na novou verzi:

**Varianta A: Z tvého Macu**

```bash
# Na Macu
cd /Applications/MAMP/htdocs/HairBook
scp -r * hairbook@192.168.1.50:/var/www/hairbook/
```

**Varianta B: Přes Git**

```bash
# Na RPi
cd /var/www/hairbook
git pull origin main
```

Pak restartuj Apache:
```bash
sudo systemctl restart apache2
```

---

## 🆘 Řešení problémů

### Aplikace nefunguje

```bash
# Zkontroluj logy Apache
sudo tail -f /var/log/apache2/error.log

# Zkontroluj oprávnění
ls -la /var/www/hairbook/data/

# Restartuj Apache
sudo systemctl restart apache2
```

### iPad se nemůže připojit

1. Zkontroluj, že iPad je ve stejné WiFi síti
2. Zkontroluj IP adresu RPi: `ip addr show`
3. Ping z iPadu: `http://192.168.1.50`
4. Zkontroluj firewall: `sudo ufw status`

### Databáze je poškozená

```bash
# Obnov z backupu
cp /var/www/hairbook/backups/hairbook_YYYYMMDD_HHMMSS.db /var/www/hairbook/data/hairbook.db

# Nastav oprávnění
sudo chown www-data:www-data /var/www/hairbook/data/hairbook.db
```

---

## 📊 Monitoring a údržba

### Kontrola systému

```bash
# Využití disku
df -h

# Využití paměti
free -h

# Běžící procesy
htop

# Status Apache
sudo systemctl status apache2
```

### Pravidelná údržba

```bash
# Každý měsíc aktualizuj systém
sudo apt update && sudo apt upgrade -y

# Vyčisti staré logy
sudo journalctl --vacuum-time=30d

# Zkontroluj velikost databáze
ls -lh /var/www/hairbook/data/hairbook.db
```

---

## ✅ Hotovo!

Aplikace běží na: `http://192.168.1.50/`
- 💻 **Hlavní aplikace**: `http://192.168.1.50/`
- 📱 **iPad POS**: `http://192.168.1.50/mobile.html`

### Výhody tohoto setupu:
- ✅ Vše běží lokálně v salonu
- ✅ Rychlý přístup bez latence
- ✅ Žádné měsíční poplatky
- ✅ Automatické zálohy
- ✅ Bezpečné (data zůstávají v salonu)
- ✅ Funguje i bez internetu

---

## 📞 Podpora

Pokud narazíš na problém:
1. Zkontroluj logy: `sudo tail -f /var/log/apache2/error.log`
2. Restartuj služby: `sudo systemctl restart apache2`
3. Ověř oprávnění: `ls -la /var/www/hairbook/data/`

**Užívej si HairBook! 💇‍♀️✨**
