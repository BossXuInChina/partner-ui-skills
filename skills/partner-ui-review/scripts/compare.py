#!/usr/bin/env python3
"""Reference left, rendered page right. Never stretch a narrow viewport to desktop."""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageDraw

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('crop')
parser.add_argument('shot')
parser.add_argument('out')
parser.add_argument('y0', type=int, nargs='?', default=0)
parser.add_argument('y1', type=int, nargs='?')
parser.add_argument('--design-width', type=int, default=1920, help='Explicit logical width of the design reference; screenshot pixels remain unchanged')
args = parser.parse_args()
if args.design_width <= 0 or args.y0 < 0 or (args.y1 is not None and args.y1 <= args.y0):
    parser.error('invalid width or band')
with Image.open(args.crop) as src:
    original = src.size
    design = src.convert('RGB').resize((args.design_width, round(src.height * args.design_width / src.width)), Image.Resampling.LANCZOS)
with Image.open(args.shot) as src:
    shot = src.convert('RGB')
shot_size = shot.size
def band(im):
    bottom = min(im.height, args.y1 or im.height)
    if args.y0 >= bottom:
        raise ValueError('Requested band is outside one of the images')
    return im.crop((0, args.y0, im.width, bottom))
design, shot = band(design), band(shot)
out = Image.new('RGB', (design.width + shot.width + 16, max(design.height, shot.height) + 32), '#eeeeee')
draw = ImageDraw.Draw(out)
draw.text((8, 8), f'DESIGN: {args.design_width}px logical width', fill='#111111')
draw.text((design.width + 24, 8), f'RENDER: {shot_size[0]}px screenshot pixels', fill='#111111')
out.paste(design, (0, 32))
out.paste(shot, (design.width + 16, 32))
target = Path(args.out)
target.parent.mkdir(parents=True, exist_ok=True)
out.save(target)
target.with_suffix('.json').write_text(json.dumps({'design': str(Path(args.crop).resolve()), 'shot': str(Path(args.shot).resolve()), 'originalDesignPixels': original, 'designLogicalWidth': args.design_width, 'shotPixels': shot_size, 'band': [args.y0, args.y1], 'sameLogicalWidth': args.design_width == shot_size[0], 'note': 'Side-by-side evidence only; no automatic visual acceptance or pixel-diff verdict.'}, indent=2) + '\n')
