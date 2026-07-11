#!/usr/bin/env bash
# Playwright's headless Chromium needs ~16 shared libraries that aren't
# installed on this machine, and sudo requires a password. This extracts
# the .deb packages into ~/.local/opt/chromium-libs instead; driver.mjs
# adds that directory to LD_LIBRARY_PATH automatically.
# Idempotent — safe to re-run.
set -euo pipefail

DEST=~/.local/opt/chromium-libs
mkdir -p "$DEST/debs"
cd "$DEST/debs"

PKGS="libnspr4 libatk1.0-0 libatk-bridge2.0-0 libxcomposite1 libxdamage1 \
      libxfixes3 libxrandr2 libxkbcommon0 libasound2 libatspi2.0-0 \
      libxrender1 libwayland-server0 libxcb-randr0 libxi6"

# apt-get download works without root, but 404s when the local apt index
# is stale (apt-get update needs root). Fall back to scraping the pool
# directory for the newest jammy build.
fetch_from_pool() {
  local section=$1 pkg=$2
  local f
  f=$(curl -s "http://archive.ubuntu.com/ubuntu/pool/main/$section/" \
      | grep -oE "${pkg}_[^\"]*_amd64\.deb" | sort -uV | tail -1)
  [ -n "$f" ] && curl -fsSO "http://archive.ubuntu.com/ubuntu/pool/main/$section/$f"
}

for p in $PKGS; do
  ls "${p}_"*.deb >/dev/null 2>&1 && continue
  apt-get download "$p" 2>/dev/null || echo "WARN: apt-get download $p failed; fetch manually from the pool"
done
# These two 404'd from the stale index when this script was written:
ls libnss3_*.deb >/dev/null 2>&1 || fetch_from_pool n/nss libnss3
ls libgbm1_*.deb >/dev/null 2>&1 || fetch_from_pool m/mesa libgbm1

for d in *.deb; do dpkg-deb -x "$d" "$DEST/extracted/"; done

echo "Extracted to $DEST/extracted. Verifying against Playwright chromium:"
SHELL_BIN=$(ls ~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | tail -1)
if [ -n "$SHELL_BIN" ]; then
  export LD_LIBRARY_PATH="$DEST/extracted/usr/lib/x86_64-linux-gnu:$DEST/extracted/usr/lib/x86_64-linux-gnu/nss"
  if ldd "$SHELL_BIN" | grep "not found"; then
    echo "STILL MISSING LIBS — apt-get download the packages providing them into $DEST/debs and re-run"
    exit 1
  fi
  echo "ALL LIBS RESOLVED"
else
  echo "(Playwright chromium not downloaded yet — run 'npx playwright install chromium' first, then re-run to verify)"
fi
