#!/usr/bin/env python3
"""Inline the runtime into one self-contained HTML file for sending (Python 3 standard library only).

    python3 scripts/bundle_single.py my-page/index.html my-page.html

- runtime/partner-ui-runtime.css and .js are embedded (about 8.5 MB).
- Fonts are NOT embedded (the font license does not allow converting them); the single file falls
  back to system fonts. Send the folder instead when HarmonyOS Sans matters.
- Other local <link rel=stylesheet> / <script src> files next to the page are inlined too;
  remote URLs are left as they are.
"""
import re
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    src, dst = Path(sys.argv[1]), Path(sys.argv[2])
    base = src.parent
    html = src.read_text(encoding='utf-8')

    def local(href: str):
        if re.match(r'^(https?:)?//|^data:', href):
            return None
        p = (base / href.split('?')[0]).resolve()
        return p if p.is_file() else None

    def css(m):
        href = m.group(1)
        if 'fonts/partner-ui-fonts.css' in href:
            return '<!-- HarmonyOS Sans not embedded: system fonts are used in the single-file version -->'
        p = local(href)
        if not p:
            return m.group(0)
        text = p.read_text(encoding='utf-8').replace('</style', '<\\/style')
        return f'<style data-pui-runtime data-src="{href}">\n{text}\n</style>'

    def js(m):
        href = m.group(1)
        p = local(href)
        if not p:
            return m.group(0)
        text = p.read_text(encoding='utf-8').replace('</script', '<\\/script')
        return f'<script data-src="{href}">\n{text}\n</script>'

    html = re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*/?>', css, html)
    html = re.sub(r'<script\s+src="([^"]+)"\s*>\s*</script>', js, html)
    dst.write_text(html, encoding='utf-8')
    print(f'wrote {dst} ({dst.stat().st_size / 1048576:.1f} MB)')
    return 0


if __name__ == '__main__':
    sys.exit(main())
