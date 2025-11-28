#!/bin/bash

echo "🐳 Docker build pro Windows z Dokumentů..."
echo ""

# Přidat Docker do PATH
export PATH="/usr/local/bin:/Applications/Docker.app/Contents/Resources/bin:$PATH"

# Zkontrolovat Docker
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker není spuštěný. Spouštím..."
    open -a Docker
    echo "⏳ Čekám 30s..."
    sleep 30
fi

# Cesty
SOURCE_DIR="/Applications/MAMP/htdocs/HairBook"
BUILD_DIR="$HOME/Documents/HairBook"

echo "📁 Kopíruji projekt do Dokumentů..."
echo "   Z: $SOURCE_DIR"
echo "   Do: $BUILD_DIR"
echo ""

# Vyčistit a vytvořit build složku
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Kopírovat všechny soubory kromě node_modules a dist
rsync -av --exclude 'node_modules' --exclude 'dist' --exclude '.git' --exclude 'api/hairbook.db' "$SOURCE_DIR/" "$BUILD_DIR/"

echo "✅ Projekt zkopírován"
echo ""
echo "🐳 Spouštím Docker build..."

# Build v Dockeru
docker run --rm \
  --platform linux/amd64 \
  -w /project \
  -v "$BUILD_DIR":/project \
  electronuserland/builder:wine \
  bash -c "npm install && npm run build:win"

# Zkontrolovat výsledek
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build dokončen!"
    echo ""
    
    # Kopírovat výsledky zpět
    if [ -d "$BUILD_DIR/dist" ]; then
        echo "📦 Kopíruji výsledky zpět do projektu..."
        cp -r "$BUILD_DIR/dist" "$SOURCE_DIR/"
        echo "✅ Hotovo!"
        echo ""
        ls -lh "$SOURCE_DIR/dist/"*.exe 2>/dev/null || echo "⚠️ Žádný .exe nenalezen"
    else
        echo "⚠️ Složka dist nebyla vytvořena"
    fi
else
    echo "❌ Build selhal"
    exit 1
fi
