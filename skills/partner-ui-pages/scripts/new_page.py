#!/usr/bin/env python3
"""Create a ready-to-open page folder from a template (Python 3 standard library only).

    python3 scripts/new_page.py --template workbench-list --out ./my-page --title "协议管理"
    python3 scripts/new_page.py --list

Result:
    my-page/index.html     the page (open it directly in a browser)
    my-page/runtime/       partner-ui-runtime.js / .css (Vue + all pack components)
    my-page/fonts/         HarmonyOS Sans + license (omit with --no-fonts)
"""
import argparse
import re
import shutil
import sys
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent
TEMPLATES = SKILL / 'assets' / 'templates'


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--template', default='blank', help='template name (see --list)')
    ap.add_argument('--out', help='output folder')
    ap.add_argument('--title', help='page title (replaces the template title everywhere)')
    ap.add_argument('--no-fonts', action='store_true', help='do not copy HarmonyOS Sans (pages fall back to system fonts)')
    ap.add_argument('--force', action='store_true', help='overwrite an existing index.html')
    ap.add_argument('--list', action='store_true', help='list templates')
    a = ap.parse_args()

    names = sorted(p.stem for p in TEMPLATES.glob('*.html'))
    if a.list:
        print('\n'.join(names))
        return 0
    if not a.out:
        ap.error('--out is required')
    if a.template not in names:
        ap.error(f'unknown template {a.template!r}; choose from: {", ".join(names)}')

    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    page = out / 'index.html'
    if page.exists() and not a.force:
        print(f'{page} already exists (use --force to overwrite)', file=sys.stderr)
        return 1

    html = (TEMPLATES / f'{a.template}.html').read_text(encoding='utf-8')
    if a.title:
        m = re.search(r'<title>(.*?)</title>', html)
        if m and m.group(1):
            html = html.replace(m.group(1), a.title)
    if a.no_fonts:
        html = re.sub(r'\s*<link rel="stylesheet" href="fonts/partner-ui-fonts.css">', '', html)
    page.write_text(html, encoding='utf-8')

    shutil.copytree(SKILL / 'assets' / 'runtime', out / 'runtime', dirs_exist_ok=True)
    if not a.no_fonts:
        shutil.copytree(SKILL / 'assets' / 'fonts', out / 'fonts', dirs_exist_ok=True)

    print(f'created {page}')
    print('open it directly in a browser; keep runtime/' + ('' if a.no_fonts else ' and fonts/') + ' next to index.html')
    return 0


if __name__ == '__main__':
    sys.exit(main())
