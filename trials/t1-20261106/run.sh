#!/bin/sh
set -eu
HERE=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
SKILL=${PARTNER_UI_SKILL:-"$HERE/../../dist/partner-ui-vue3"}
cmp "$HERE/source.lock.json" "$SKILL/source.lock.json"
WORK="$HERE/.work"
mkdir -p "$WORK/skill" "$WORK/app"
rsync -a --delete --exclude node_modules --exclude .artifacts --exclude dist --exclude test-results --exclude playwright-report "$SKILL/" "$WORK/skill/"
rsync -a --delete --exclude node_modules --exclude .artifacts --exclude dist --exclude test-results --exclude playwright-report "$WORK/skill/assets/harness/" "$WORK/app/"
rsync -a "$HERE/overlay/" "$WORK/app/"
cd "$WORK/app"
node "$HERE/verify.mjs"
