# Distribuce HairBook jako Desktop aplikace

## Pro koncové uživatele

### Windows
1. Stáhni `HairBook-Windows.zip`
2. Rozbal ZIP do složky (např. `C:\HairBook\`)
3. **Důležité**: Nainstaluj PHP (pokud nemáš)
   - Stáhni z https://windows.php.net/download/
   - Rozbal do `C:\php\`
   - Přidej `C:\php\` do PATH
4. Spusť `HairBook.exe`

### macOS
1. Stáhni `HairBook-macOS.dmg`
2. Otevři DMG a přesuň HairBook do Applications
3. Spusť HairBook z Applications
4. PHP je již součástí macOS

### Linux
1. Stáhni `HairBook-Linux.AppImage`
2. Nastav jako spustitelný: `chmod +x HairBook-Linux.AppImage`
3. Nainstaluj PHP: `sudo apt install php-cli php-sqlite3`
4. Spusť `./HairBook-Linux.AppImage`

## Pro vývojáře - Buildování

### Příprava prostředí
```bash
npm install
```

### Windows Build (POUZE na Windows PC)
**Pozor**: Build pro Windows MUSÍ běžet na Windows!

1. Nainstaluj PHP: https://windows.php.net/download/
2. Přidej PHP do PATH
3. Spusť:
```bash
npm run build:win
```

Vytvoří se: `dist/HairBook 1.0.0.exe` (portable verze)

### macOS Build (POUZE na macOS)
```bash
npm run build:mac
```

Vytvoří se:
- `dist/HairBook-1.0.0.dmg`
- `dist/HairBook-1.0.0-mac.zip`

### Linux Build
```bash
npm run build:linux
```

Vytvoří se:
- `dist/HairBook-1.0.0.AppImage`
- `dist/hairbook_1.0.0_amd64.deb`

## Distribuční strategie

### 1. GitHub Releases (Doporučeno)
- Nahraj buildy jako release assets
- Uživatelé stahují přímo z GitHubu
- Zdarma, spolehlivé

### 2. Vlastní web
- Hosting buildů na vlastním webu
- Platební brána pro prodej licencí

### 3. Microsoft Store / Mac App Store
- Oficiální distribuce
- Vyžaduje registraci vývojáře ($99/rok Mac, $19/rok Microsoft)

## PHP Requirements

**DŮLEŽITÉ**: Aplikace vyžaduje PHP nainstalované v systému!

### Windows
- Stáhni PHP z https://windows.php.net/download/
- Nebo použij XAMPP/WAMP (obsahují PHP)

### macOS
- PHP je již nainstalované

### Linux
```bash
sudo apt install php-cli php-sqlite3  # Debian/Ubuntu
sudo yum install php-cli php-pdo      # CentOS/RHEL
```

## Velikost souborů

- Windows portable: ~150 MB
- macOS DMG: ~200 MB
- Linux AppImage: ~150 MB

## Poznámky

- Databáze se vytvoří automaticky při prvním spuštění
- Data jsou uložena lokálně v uživatelské složce
- Žádné připojení k internetu není potřeba
