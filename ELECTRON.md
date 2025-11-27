# HairBook - Electron Desktop App

## Spuštění aplikace (vývoj)

```bash
npm start
```

## Build distribučních souborů

### Windows (vyžaduje Windows nebo Wine)
```bash
npm run build:win
```
Vytvoří:
- `dist/HairBook Setup 1.0.0.exe` - instalátor
- `dist/HairBook 1.0.0.exe` - portable verze

### macOS (vyžaduje macOS)
```bash
npm run build:mac
```
Vytvoří:
- `dist/HairBook-1.0.0.dmg` - DMG instalátor
- `dist/HairBook-1.0.0-mac.zip` - ZIP archiv

### Linux
```bash
npm run build:linux
```
Vytvoří:
- `dist/HairBook-1.0.0.AppImage` - AppImage
- `dist/hairbook_1.0.0_amd64.deb` - DEB balíček

### Všechny platformy
```bash
npm run build
```

## Požadavky

- Node.js 18+
- PHP 7.4+ (musí být nainstalované v systému a dostupné v PATH)
- npm

## Jak to funguje

Aplikace používá Electron jako wrapper a spouští vestavěný PHP server na pozadí. Všechna data jsou uložena lokálně v SQLite databázi.

## Distribuce

Po buildu najdeš instalační soubory ve složce `dist/`. Tyto soubory můžeš distribuovat koncovým uživatelům.

### Velikost souborů
- Windows installer: ~150-200 MB
- macOS DMG: ~200-250 MB  
- Linux AppImage: ~150-200 MB

## Poznámky

- Na Windows/Linux je potřeba mít nainstalovaný PHP
- Na macOS je PHP již součástí systému
- Databáze se vytvoří automaticky při prvním spuštění
