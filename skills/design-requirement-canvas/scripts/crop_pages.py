#!/usr/bin/env python3
"""Cut each page's crop rectangle out of its original source image into crops/<pageId>.<ext>
and record page.image. Requires Pillow (pip install pillow). Never upscales or edits pixels:
a rectangle that is malformed or leaves the source image is rejected, not padded."""
import argparse
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest', type=Path)
    parser.add_argument('--format', choices=('jpg', 'png'), default='jpg')
    parser.add_argument('--only', action='append', help='page id to (re)crop; repeatable')
    args = parser.parse_args()
    try:
        from PIL import Image
    except ImportError:
        raise SystemExit('Pillow is required for cropping: pip install pillow (or crop manually and set page.image)')
    path = args.manifest.resolve()
    base = path.parent
    data = json.loads(path.read_text(encoding='utf-8'))
    sources = {s.get('id'): s for s in data.get('sources', []) if isinstance(s, dict)}
    pages = [p for p in data.get('pages', []) if isinstance(p, dict)]
    # Check every requested page before writing anything, so one bad rectangle cannot leave a
    # half-updated manifest or a silently padded image.
    problems = []
    known = {p.get('id') for p in pages}
    for wanted in args.only or []:
        if wanted not in known:
            problems.append(f'--only {wanted}: no such page id')
    for index, page in enumerate(pages):
        pid = page.get('id')
        where = f'pages[{index}]' + (f' ({pid})' if isinstance(pid, str) else '')
        if not isinstance(pid, str) or not pid:
            problems.append(where + ': page needs a fixed string id')
            continue
        if args.only and pid not in args.only:
            continue
        crop = page.get('crop')
        if not isinstance(crop, dict):
            problems.append(where + '.crop: expected {sourceId, x, y, width, height} in original-image pixels')
            continue
        src = sources.get(crop.get('sourceId'))
        if src is None:
            problems.append(f'{where}.crop.sourceId: {crop.get("sourceId")!r} is not a sources[].id (known: {", ".join(sorted(map(str, sources))) or "none"})')
            continue
        values = [crop.get(key) for key in ('x', 'y', 'width', 'height')]
        if any(isinstance(v, bool) or not isinstance(v, (int, float)) or v != v for v in values):
            problems.append(where + '.crop: x, y, width, height must be numbers in original-image pixels')
            continue
        x, y, width, height = values
        if x < 0 or y < 0 or width <= 0 or height <= 0 or x + width > src.get('width', 0) or y + height > src.get('height', 0):
            problems.append(f'{where}.crop: rectangle {x},{y} {width}x{height} leaves source {src.get("id")} ({src.get("width")}x{src.get("height")})')
    if problems:
        raise SystemExit(json.dumps({'ok': False, 'stage': 'crop_pages', 'errors': problems}, ensure_ascii=False, indent=2))
    (base / 'crops').mkdir(exist_ok=True)
    done = []
    opened = {}
    for page in pages:
        if args.only and page['id'] not in args.only:
            continue
        crop = page['crop']
        src = sources[crop['sourceId']]
        file = Path(src['path']) if Path(src['path']).is_absolute() else base / src['path']
        if file not in opened:
            if not file.is_file():
                raise SystemExit(f'{src["id"]}: source image not found at {file}')
            opened[file] = Image.open(file)
            if opened[file].size != (src['width'], src['height']):
                raise SystemExit(f'{src["id"]}: recorded size {src["width"]}x{src["height"]} differs from file {opened[file].size}')
        box = (crop['x'], crop['y'], crop['x'] + crop['width'], crop['y'] + crop['height'])
        out = base / 'crops' / f'{page["id"]}.{args.format}'
        image = opened[file].crop(box)
        if args.format == 'jpg':
            image.convert('RGB').save(out, quality=90)
        else:
            image.save(out)
        page['image'] = 'crops/' + out.name
        done.append(page['id'])
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'ok': True, 'cropped': done}, ensure_ascii=False))


if __name__ == '__main__':
    from cli_encoding import configure_cli_encoding
    configure_cli_encoding()
    main()
