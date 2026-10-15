#!/bin/bash
# rebuild-chords ["what changed"] [same]
# Checks the code, bumps the version (shown at the bottom of Settings), commits everything, does a plain
# push to GitHub (no Actions workflow of ours; GitHub Pages publishes on its own), then waits until the
# live site has the new version.
set -e
cd "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")/.." || exit 1

URL="https://stobitejunior-create.github.io/stobite-chords"
msg=""; bump=1
for a in "$@"; do
  case "$a" in same) bump=0 ;; *) msg="$a" ;; esac
done

echo "▸ Checking the code"
for f in app.js sw.js config.js songs.js; do
  node --check "$f" || { echo "✗ $f has an error. Nothing was committed or published."; exit 1; }
done

cur=$(grep -o 'APP_VERSION = [0-9]*' app.js | grep -o '[0-9]*$')
[ -n "$cur" ] || { echo "✗ Couldn't find APP_VERSION in app.js"; exit 1; }
ver=$cur
if [ "$bump" = 1 ]; then
  ver=$((cur + 1))
  sed -i '' "s/APP_VERSION = $cur;/APP_VERSION = $ver;/" app.js
fi
sed -i '' "s/stobite-chords-v[0-9]*/stobite-chords-v$ver/" sw.js   # new cache name so phones pick up the change

echo "▸ Committing version $ver"
git add -A
if git diff --cached --quiet; then
  echo "  (nothing new to commit)"
else
  git commit -q -m "${msg:-Stobite Chords version $ver}" -m "Version $ver"
fi

echo "▸ Pushing to GitHub"
git push -q 2>&1 || { echo "✗ Couldn't push to GitHub. Your changes are committed here."; exit 1; }

echo "▸ Waiting for the live site (usually about a minute)"
for i in $(seq 1 30); do
  if curl -fs "$URL/app.js?x=$(date +%s)" | grep -q "APP_VERSION = $ver;"; then
    echo
    echo "✓ Live: Stobite Chords version $ver"
    echo "   $URL/"
    echo "   On a phone or iPad: close the app and open it again. Settings shows version $ver at the bottom."
    exit 0
  fi
  sleep 10
done
echo
echo "… Pushed, but the live site doesn't show version $ver yet. GitHub can take a few minutes; check again shortly."
