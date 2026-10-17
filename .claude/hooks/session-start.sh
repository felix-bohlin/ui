#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

pnpm install

for wrapper in "${PNPM_HOME:-$HOME/.local/share/pnpm}"/.tools/pnpm/*/node_modules/pnpm; do
  if [ -f "$wrapper/install.js" ] && ! head -c 4 "$wrapper/pnpm" | grep -q ELF; then
    (cd "$wrapper" && node install.js) || true
  fi
done

if [ -x /opt/pw-browsers/chromium ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export PLAYWRIGHT_CHROMIUM_EXECUTABLE=/opt/pw-browsers/chromium' >> "$CLAUDE_ENV_FILE"
fi
