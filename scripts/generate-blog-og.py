#!/usr/bin/env python3
"""Generate a distinct OG image (1200x630) per blog post.

Same visual style as scripts/generate-og-image.py (dark bg, amber accent,
network/dot texture, vreshch.com wordmark). Reads each post's frontmatter
(title, date, description) from src/content/blog/<slug>/article.md and writes
public/blog/<slug>/images/og.png.

Requires: pip install Pillow
Usage:
  python scripts/generate-blog-og.py           # all posts
  python scripts/generate-blog-og.py <slug>    # one post
"""

import math
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

PROJECT_DIR = Path(__file__).resolve().parent.parent
CONTENT_DIR = PROJECT_DIR / "src" / "content" / "blog"
PUBLIC_DIR = PROJECT_DIR / "public" / "blog"

WIDTH, HEIGHT = 1200, 630
BG_COLOR = "#1f2028"
AMBER = "#f59e0b"
SEED = 42
PADDING = 72
CONTENT_WIDTH = WIDTH - PADDING * 2

TITLE_SIZE = 62
KICKER_SIZE = 24
URL_SIZE = 26
BYLINE_SIZE = 24


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    name = "DejaVuSans-Bold" if bold else "DejaVuSans"
    for path in [f"/usr/share/fonts/truetype/dejavu/{name}.ttf", f"/usr/share/fonts/TTF/{name}.ttf"]:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def parse_frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    fields: dict[str, str] = {}
    for line in text[3:end].splitlines():
        if ":" not in line or line.startswith(" "):
            continue
        key, _, value = line.partition(":")
        value = value.strip().strip("'\"")
        if value:
            fields[key.strip()] = value.replace("—", "-")
    return fields


def wrap_lines(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if draw.textlength(trial, font=font) <= max_w or not current:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def fit_title(draw: ImageDraw.ImageDraw, title: str) -> tuple[list[str], ImageFont.FreeTypeFont, int]:
    for size in range(TITLE_SIZE, 34, -4):
        font = load_font(size, bold=True)
        lines = wrap_lines(draw, title, font, CONTENT_WIDTH)
        if len(lines) <= 3:
            return lines, font, size
    font = load_font(38, bold=True)
    lines = wrap_lines(draw, title, font, CONTENT_WIDTH)
    if len(lines) > 3:
        lines = lines[:3]
        lines[-1] = lines[-1].rstrip() + "..."
    return lines, font, 38


def render_background(img: Image.Image) -> Image.Image:
    draw = ImageDraw.Draw(img)
    rng = random.Random(SEED)
    points = [(rng.randint(0, WIDTH), rng.randint(0, HEIGHT)) for _ in range(80)]
    for i, (x1, y1) in enumerate(points):
        for x2, y2 in points[i + 1 :]:
            if math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) < 120:
                draw.line([(x1, y1), (x2, y2)], fill="#2a2e38", width=1)

    dots = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    dot_draw = ImageDraw.Draw(dots)
    for x, y in points:
        dot_draw.ellipse((x - 2, y - 2, x + 2, y + 2), fill=(255, 255, 255, 60))
    img = Image.alpha_composite(img.convert("RGBA"), dots).convert("RGB")

    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    bg_rgb = hex_to_rgb(BG_COLOR)
    glow_rgb = hex_to_rgb("#304870")
    for r in range(520, 0, -2):
        t = (r / 520) ** 1.5
        alpha = int(55 * (1 - t))
        color = tuple(int(glow_rgb[i] * (1 - t) + bg_rgb[i] * t) for i in range(3))
        glow_draw.ellipse((980 - r, 120 - r, 980 + r, 120 + r), fill=(*color, alpha))
    return Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")


def render_card(slug: str, fm: dict[str, str], out: Path) -> None:
    title = fm.get("title", slug)
    date = fm.get("date", "")

    img = render_background(Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR))
    draw = ImageDraw.Draw(img)

    kicker_font = load_font(KICKER_SIZE, bold=True)
    kicker = "vreshch.com/blog"
    if date:
        kicker = f"{kicker}  ·  {date}"
    draw.text((PADDING, PADDING), kicker.upper(), fill=AMBER, font=kicker_font)

    accent_y = PADDING + 44
    draw.rectangle((PADDING, accent_y, PADDING + 64, accent_y + 5), fill=AMBER)

    lines, title_font, title_size = fit_title(draw, title)
    line_gap = int(title_size * 0.28)
    line_h = title_font.getbbox("Ag")[3] + line_gap
    block_h = line_h * len(lines)
    ty = (HEIGHT - block_h) // 2 + 20
    for line in lines:
        draw.text((PADDING, ty), line, fill="#ffffff", font=title_font)
        ty += line_h

    url_font = load_font(URL_SIZE, bold=True)
    byline_font = load_font(BYLINE_SIZE)
    base_y = HEIGHT - PADDING - URL_SIZE
    draw.text((PADDING, base_y), "https://vreshch.com", fill=AMBER, font=url_font)
    byline = "Volodymyr Vreshch"
    bw = draw.textlength(byline, font=byline_font)
    draw.text((WIDTH - PADDING - bw, base_y), byline, fill="#a9adc1", font=byline_font)

    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "PNG", optimize=True)
    print(f"{slug}: {out.relative_to(PROJECT_DIR)} ({out.stat().st_size / 1024:.0f} KB)")


def main() -> None:
    slugs = sys.argv[1:] or sorted(d.name for d in CONTENT_DIR.iterdir() if d.is_dir())
    for slug in slugs:
        article = CONTENT_DIR / slug / "article.md"
        if not article.exists():
            print(f"skip {slug}: no article.md", file=sys.stderr)
            continue
        fm = parse_frontmatter(article.read_text(encoding="utf-8"))
        render_card(slug, fm, PUBLIC_DIR / slug / "images" / "og.png")


if __name__ == "__main__":
    main()
