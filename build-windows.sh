#!/bin/bash

echo "🐳 Spouštím Docker build pro Windows..."
echo ""

# Přidat Docker do PATH pro tento script
export PATH="/usr/local/bin:/Applications/Docker.app/Contents/Resources/bin:$PATH"

# Zkontrolovat, že Docker běží
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker není spuštěný. Spouštím Docker..."
    open -a Docker
    echo "⏳ Čekám na spuštění Dockeru (30s)..."
    sleep 30
fi

echo "✅ Docker je připravený"
echo ""
echo "💡 Poznámka: Musíš povolit Docker File Sharing pro /Applications"
echo "   Docker Desktop → Settings → Resources → File Sharing → Add /Applications"
echo ""
echo "📦 Stahuji Docker image s Wine..."

# Získat absolutní cestu k projektu  
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "📁 Projekt: $PROJECT_DIR"
echo ""

# Spustit build ve Wine kontejneru
docker run --rm \
  --platform linux/amd64 \
  -w /project \
  -v "$PROJECT_DIR":/project \
  electronuserland/builder:wine \
  bash -c "npm install && npm run build:win"

echo ""
echo "✅ Build dokončen! Výsledky jsou ve složce dist/"
ls -lh dist/*.exe 2>/dev/null || echo "⚠️ Žádný .exe soubor nenalezen"
