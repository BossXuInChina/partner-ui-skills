#!/usr/bin/env python3
"""Build one offline, single-file canvas HTML from a scenario manifest and its crop images.

The scenario directory is the editable source (manifest.json + crops/); the HTML is the delivery.
Refuses to build when structural or canvas-contract checks fail. Does not judge content quality.
"""
import argparse
import base64
import html as html_lib
import json
import mimetypes
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ASSETS = HERE.parent / 'assets'
sys.path.insert(0, str(HERE))
from validate_canvas_contract import validate  # noqa: E402

CSP = "default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; script-src 'unsafe-inline'"


def data_uri(path):
    mime = mimetypes.guess_type(path.name)[0]
    if mime not in ('image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'):
        raise ValueError(f'unsupported image type: {path}')
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode('ascii')


def safe_json(value):
    return json.dumps(value, ensure_ascii=False).replace('</', '<\\/').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')


def build(manifest_path, output, allow_missing_images=False):
    manifest_path = manifest_path.resolve()
    data = json.loads(manifest_path.read_text(encoding='utf-8'))
    result = validate(data)
    if not result['ok']:
        raise SystemExit(json.dumps({'ok': False, 'stage': 'validate_canvas_contract', 'errors': result['errors']}, ensure_ascii=False, indent=2))
    base = manifest_path.parent
    images, missing = {}, []
    for page in data['pages']:
        rel = page.get('image')
        path = (base / rel).resolve() if isinstance(rel, str) and rel else None
        if path is None or not path.is_file():
            missing.append(page['id'])
            continue
        images[page['id']] = data_uri(path)
    if missing and not allow_missing_images:
        raise SystemExit(f'pages without a readable crop image (page.image, relative to manifest): {", ".join(missing)}')
    css = '\n'.join((ASSETS / f).read_text(encoding='utf-8') for f in ('inspector.css', 'canvas-host.css'))
    js = '\n'.join((ASSETS / f).read_text(encoding='utf-8') for f in ('page-review.js', 'inspector.js', 'canvas-host.js'))
    title = (data.get('canvas') or {}).get('title') or manifest_path.parent.name
    html = (
        '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        f'<meta http-equiv="Content-Security-Policy" content="{CSP}">'
        f'<title>{html_lib.escape(title)}</title><style>html,body{{margin:0;background:#f4f6fa}}\n{css}</style></head>'
        '<body><div id="canvas"></div>'
        f'<script>{js}</script>'
        f'<script>window.__CANVAS__=DesignCanvasHost.mount({{root:document.getElementById("canvas"),manifest:{safe_json(data)},images:{safe_json(images)}}});</script>'
        '</body></html>'
    )
    output = output.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html, encoding='utf-8')
    return {'ok': True, 'output': str(output), 'bytes': output.stat().st_size, 'pages': len(data['pages']),
            'imagesEmbedded': len(images), 'missingImages': missing, 'warnings': result['warnings']}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest', type=Path)
    parser.add_argument('--out', type=Path, help='output HTML (default: <scenario>/dist/<scenario>-画布.html)')
    parser.add_argument('--allow-missing-images', action='store_true', help='draft builds only; never for delivery')
    args = parser.parse_args()
    out = args.out or args.manifest.resolve().parent / 'dist' / (args.manifest.resolve().parent.name + '-画布.html')
    print(json.dumps(build(args.manifest, out, args.allow_missing_images), ensure_ascii=False, indent=2))


if __name__ == '__main__':
    from cli_encoding import configure_cli_encoding
    configure_cli_encoding()
    main()
