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
echo "📦 Stahuji Docker image s Wine..."

# Spustit build ve Wine kontejneru
docker run --rm -ti \
  --env ELECTRON_CACHE="/root/.cache/electron" \
  --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
  -v "$(pwd)":/project \
  -v "$(pwd)-node-modules":/project/node_modules \
  -v ~/.cache/electron:/root/.cache/electron \
  -v ~/.cache/electron-builder:/root/.cache/electron-builder \
  electronuserland/builder:wine \
  /bin/bash -c "cd /project && npm install && npm run build:win"

echo ""
echo "✅ Build dokončen! Výsledky jsou ve složce dist/"
ls -lh dist/*.exe 2>/dev/null || echo "⚠️ Žádný .exe soubor nenalezen"
