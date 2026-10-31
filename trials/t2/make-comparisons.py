#!/usr/bin/env python3
"""Create unmasked 1440px before/after and difference images from evidence captures."""
from pathlib import Path
from PIL import Image, ImageChops

folder = Path(__file__).resolve().parent / 'evidence'
for name in ('workbench-list', 'ai-assistant-workspace'):
    before = Image.open(folder / f'{name}-1440-before.png').convert('RGB')
    after = Image.open(folder / f'{name}-1440-after.png').convert('RGB')
    width, height = before.width, max(before.height, after.height)
    padded = []
    for picture in (before, after):
        canvas = Image.new('RGB', (width, height), 'white')
        canvas.paste(picture)
        padded.append(canvas)
    side = Image.new('RGB', (width * 2, height))
    side.paste(padded[0])
    side.paste(padded[1], (width, 0))
    side.save(folder / f'{name}-1440-side-by-side.png', optimize=True)
    ImageChops.difference(*padded).save(folder / f'{name}-1440-diff.png', optimize=True)
