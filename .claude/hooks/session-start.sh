#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

node_version="v$(cat .nvmrc)"
if [ "$(node --version 2>/dev/null)" != "$node_version" ]; then
  case "$(uname -m)" in
    aarch64 | arm64) node_arch=arm64 ;;
    *) node_arch=x64 ;;
  esac
  node_dir="$HOME/.local/node-$node_version"
  if [ ! -x "$node_dir/bin/node" ]; then
    mkdir -p "$node_dir"
    curl -fsSL "https://nodejs.org/dist/$node_version/node-$node_version-linux-$node_arch.tar.xz" |
      tar -xJ --strip-components=1 -C "$node_dir"
  fi
  export PATH="$node_dir/bin:$PATH"
  if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
    echo "export PATH=\"$node_dir/bin:\$PATH\"" >> "$CLAUDE_ENV_FILE"
  fi
fi

pnpm install

for wrapper in "${PNPM_HOME:-$HOME/.local/share/pnpm}"/.tools/pnpm/*/node_modules/pnpm; do
  if [ -f "$wrapper/install.js" ] && ! head -c 4 "$wrapper/pnpm" | grep -q ELF; then
    (cd "$wrapper" && node install.js) || true
  fi
done

if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export GIT_LFS_SKIP_SMUDGE=1' >> "$CLAUDE_ENV_FILE"
fi

if [ -x /opt/pw-browsers/chromium ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export PLAYWRIGHT_CHROMIUM_EXECUTABLE=/opt/pw-browsers/chromium' >> "$CLAUDE_ENV_FILE"
fi
