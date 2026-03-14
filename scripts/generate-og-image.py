#!/usr/bin/env python3
"""Generate OG image (1200x630) for social sharing previews.

Requires: pip install Pillow
Usage: python scripts/generate-og-image.py
"""

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PROJECT_DIR = Path(__file__).resolve().parent.parent
OUTPUT = PROJECT_DIR / "public" / "og-image.png"
PROFILE = PROJECT_DIR / "public" / "images" / "profile.jpeg"

WIDTH, HEIGHT = 1200, 630
BG_COLOR = "#1f2028"
SEED = 42


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    name = "DejaVuSans-Bold" if bold else "DejaVuSans"
    for path in [f"/usr/share/fonts/truetype/dejavu/{name}.ttf", f"/usr/share/fonts/TTF/{name}.ttf"]:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def make_circle_mask(size: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    return mask


def main() -> None:
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Voronoi network (seed=42, 80 points, max_dist=120)
    rng = random.Random(SEED)
    points = [(rng.randint(0, WIDTH), rng.randint(0, HEIGHT)) for _ in range(80)]

    for i, (x1, y1) in enumerate(points):
        for x2, y2 in points[i + 1 :]:
            if math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) < 120:
                draw.line([(x1, y1), (x2, y2)], fill="#2a2e38", width=1)

    # White dots
    dot_overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    dot_draw = ImageDraw.Draw(dot_overlay)
    for x, y in points:
        dot_draw.ellipse((x - 2, y - 2, x + 2, y + 2), fill=(255, 255, 255, 60))
    img = Image.alpha_composite(img.convert("RGBA"), dot_overlay).convert("RGB")

    # Navy glow behind photo
    glow_overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_overlay)
    bg_rgb = hex_to_rgb(BG_COLOR)
    glow_rgb = hex_to_rgb("#304870")
    for r in range(450, 0, -2):
        t = (r / 450) ** 1.5
        alpha = int(60 * (1 - t))
        color = tuple(int(glow_rgb[i] * (1 - t) + bg_rgb[i] * t) for i in range(3))
        glow_draw.ellipse((250 - r, 315 - r, 250 + r, 315 + r), fill=(*color, alpha))
    img = Image.alpha_composite(img.convert("RGBA"), glow_overlay).convert("RGB")

    # Profile photo
    if PROFILE.exists():
        photo = Image.open(PROFILE).resize((160, 160), Image.LANCZOS)
        img.paste(photo, (100, 235), make_circle_mask(160))

    # Text
    draw = ImageDraw.Draw(img)
    ty = 245
    draw.text((320, ty), "Volodymyr Vreshch", fill="#ffffff", font=load_font(38, bold=True))
    draw.text((320, ty + 55), "Software Engineer at Microsoft", fill="#a9adc1", font=load_font(20))
    draw.text((320, ty + 95), "Building quality software that matters \u2014 for millions.", fill="#f59e0b", font=load_font(18))
    draw.text((320, ty + 130), "https://vreshch.com", fill="#f59e0b", font=load_font(15))

    img.save(OUTPUT, "PNG", optimize=True)
    print(f"Saved to {OUTPUT} ({OUTPUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
