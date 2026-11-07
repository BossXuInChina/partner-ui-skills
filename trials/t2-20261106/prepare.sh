#!/bin/sh
set -eu
cd "$(dirname "$0")"
python3 - <<'PY'
from pathlib import Path
import hashlib, json, shutil
pins=json.loads(Path('source-pins.json').read_text())
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
source=Path('../../dist/partner-ui-vue3'); source_pages=Path('../../dist/partner-ui-pages/assets')
if sha(source/'source.lock.json') != pins['skillSourceLockSha256']: raise SystemExit('SOURCE_LOCK_MISMATCH: dist Skill does not match delivery pins')
work=Path('.work');work.mkdir(exist_ok=True); skill=work/'skill'
if skill.exists() and sha(skill/'source.lock.json') != pins['skillSourceLockSha256']: raise SystemExit('SOURCE_LOCK_MISMATCH: cached Skill does not match delivery pins')
for name,digest in pins['prototypeAssets'].items():
 if sha(source_pages/name) != digest: raise SystemExit('PROTOTYPE_SOURCE_MISMATCH: '+name)
if not skill.exists():shutil.copytree(source,skill,ignore=shutil.ignore_patterns("node_modules",".artifacts","dist","test-results","playwright-report"))
# Refresh only documentation; source and vendor remain the pinned Skill copy.
for name in ['SKILL.md','references/testing.md','references/conversion.md']:
 shutil.copy2(source/name,skill/name)
h=skill/'assets/harness'
for name in ['list','workspace']:
 shutil.copytree(Path('features')/name,h/'src/features'/name,dirs_exist_ok=True)
for src,dest in [('harness-overlay/src/template-routes.ts',h/'src/template-routes.ts'),('harness-overlay/vite.config.ts',h/'vite.config.ts')]:shutil.copy2(src,dest)
orig=work/'originals';orig.mkdir(exist_ok=True)
for name,digest in pins['prototypeAssets'].items():
 target=orig/(Path(name).name if name.startswith('templates/') else name)
 if target.exists():
  if sha(target) != digest: raise SystemExit('PROTOTYPE_CACHE_MISMATCH: '+name)
 else:
  target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source_pages/name,target)
PY
(cd .work/skill/assets/harness && pnpm install --frozen-lockfile)
