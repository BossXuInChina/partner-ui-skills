# Usage: python3 compare.py <crop.jpg> <shot.png> <out.png> [y0 y1]  -> design (left) vs demo (right), same width, optional vertical band in px of 1920-wide space
import sys
from PIL import Image
crop, shot, out = sys.argv[1:4]
y0, y1 = (int(sys.argv[4]), int(sys.argv[5])) if len(sys.argv) > 5 else (0, None)
a, b = Image.open(crop).convert('RGB'), Image.open(shot).convert('RGB')
def norm(im):
    im = im.resize((1920, int(im.height * 1920 / im.width)))
    return im.crop((0, y0, 1920, min(im.height, y1 or im.height)))
a, b = norm(a), norm(b)
W = 900; a = a.resize((W, int(a.height * W / 1920))); b = b.resize((W, int(b.height * W / 1920)))
s = Image.new('RGB', (W * 2 + 12, max(a.height, b.height)), (255, 0, 0)); s.paste(a, (0, 0)); s.paste(b, (W + 12, 0)); s.save(out)
