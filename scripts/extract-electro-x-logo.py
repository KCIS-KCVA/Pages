"""Extract official Electro X marks from the supplied one-page brand PDF."""

from pathlib import Path
import sys

import pypdfium2 as pdf
from PIL import Image, ImageOps


source = Path(sys.argv[1])
output = Path(__file__).resolve().parents[1] / "assets/partners"
page = pdf.PdfDocument(str(source))[0]
image = page.render(scale=3).to_pil().convert("RGB")

# Coordinates match the approved wordmarks and auxiliary mark on the PDF page.
boxes = {
    "electro-x-wordmark-en.png": (115, 180, 780, 290),
    "electro-x-wordmark-bilingual.png": (115, 515, 870, 615),
    "electro-x-symbol.png": (115, 1340, 330, 1550),
}

for name, box in boxes.items():
    crop = image.crop(tuple(value * 2 for value in box)).convert("L")
    ink = ImageOps.invert(crop)
    bounds = ink.point(lambda pixel: 255 if pixel > 80 else 0).getbbox()
    if bounds is None:
        raise RuntimeError(f"No artwork found for {name}")
    ink = ink.crop(bounds)
    result = Image.new("RGBA", ink.size, (0, 0, 0, 0))
    result.putalpha(ink)
    result.save(output / name, optimize=True)
    print(name, result.size)
