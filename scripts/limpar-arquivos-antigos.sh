#!/usr/bin/env bash
set -euo pipefail
if [[ ! -f package.json || ! -f src/App.jsx || ! -f public/favicon.svg ]] || ! grep -q '"name": "portfolio-bruno-minitti"' package.json; then
  echo 'Erro: execute na raiz do projeto do portfólio.' >&2
  exit 1
fi
# Arquivos originais não utilizados; as prévias WEBP substituem as PNG.
rm -f public/projects/forma-preview.png public/projects/brasa-preview.png
rm -f public/icons.svg src/assets/hero.png src/assets/react.svg src/assets/vite.svg
rmdir src/assets 2>/dev/null || true
echo 'Arquivos antigos removidos. Execute npm run lint e npm run build.'
