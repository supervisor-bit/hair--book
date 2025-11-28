#!/bin/bash

echo "🐳 Windows build přes Docker (jednodušší varianta)..."
echo ""

# Přidat Docker do PATH
export PATH="/usr/local/bin:/Applications/Docker.app/Contents/Resources/bin:$PATH"

# Zkontrolovat Docker
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker není spuštěný. Spouštím..."
    open -a Docker
    sleep 30
fi

# Zkopírovat projekt do /tmp (Docker má k tomuto přístup)
TEMP_DIR="/tmp/hairbook-build-$(date +%s)"
echo "📁 Kopíruji projekt do $TEMP_DIR..."
cp -r "$(pwd)" "$TEMP_DIR"
cd "$TEMP_DIR"

echo "🏗️  Spouštím build..."
docker run --rm \
  --platform linux/amd64 \
  -v "$TEMP_DIR":/project \
  -w /project \
  electronuserland/builder:wine \
  bash -c "npm install && npm run build:win"

# Zkopírovat výsledek zpět
if [ -d "$TEMP_DIR/dist" ]; then
    echo "✅ Kopíruji výsledek zpět..."
    cp -r "$TEMP_DIR/dist/"*.exe "$(dirname "$0")/dist/" 2>/dev/null || true
    rm -rf "$TEMP_DIR"
    echo "✅ Hotovo! Soubory:"
    ls -lh "$(dirname "$0")/dist/"*.exe 2>/dev/null || echo "⚠️ Žádný .exe"
else
    echo "❌ Build selhal"
    rm -rf "$TEMP_DIR"
    exit 1
fi
