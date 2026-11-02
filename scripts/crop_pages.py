#!/usr/bin/env python3
"""Cut each page's crop rectangle out of its original source image into crops/<pageId>.<ext>
and record page.image. Requires Pillow (pip install pillow). Never upscales or edits pixels."""
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
    sources = {s['id']: s for s in data['sources']}
    (base / 'crops').mkdir(exist_ok=True)
    done = []
    opened = {}
    for page in data['pages']:
        if args.only and page['id'] not in args.only:
            continue
        crop = page['crop']
        src = sources[crop['sourceId']]
        file = Path(src['path']) if Path(src['path']).is_absolute() else base / src['path']
        if file not in opened:
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
    main()
