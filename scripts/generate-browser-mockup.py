#!/usr/bin/env python3
"""Generate browser mockups with pixel-perfect Chrome frame.

Uses a real Chrome screenshot as template (reference-modified.png), resizes it
with 9-slice, takes website screenshots with Playwright, and composites them
with favicon, title, and URL overlaid on the frame.

Reads site list from scripts/browser-mockups.json.

Requires: pip install Pillow playwright && playwright install chromium
Usage:
  python scripts/generate-browser-mockup.py              # all sites from JSON
  python scripts/generate-browser-mockup.py vreshch-com   # only matching output name
"""

import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright

PROJECT_DIR = Path(__file__).resolve().parent.parent
TEMPLATE_PATH = Path(__file__).resolve().parent / "chrome-template.png"
OUTPUT_DIR = PROJECT_DIR / "public" / "mockups"
CONFIG_PATH = Path(__file__).resolve().parent / "browser-mockups.json"

# ─── Template measurements (853x646 reference-modified.png) ───

CHROME_H = 87       # chrome frame height (tab strip + nav bar + border)
TAB_STRIP_H = 40    # y=0→39

# Tab strip horizontal slices
TAB_LEFT = 270       # left fixed (chevron + tab + close X)
TAB_PLUS_START = 287
TAB_PLUS_END = 300
TAB_RIGHT_START = 761  # window controls

# Nav bar horizontal slices
NAV_LEFT = 156       # left fixed (back, forward, refresh, tune)
NAV_RIGHT_START = 746  # right fixed (magnifier, star, dots, scrollbar)

# Scrollbar
SCROLLBAR_W = 15

# Text overlay positions (in template 853px coords)
FAVICON_X = 50       # favicon left edge
FAVICON_Y = 13       # favicon top edge
FAVICON_SIZE = 14    # favicon width/height
TAB_TITLE_X = 72     # title text start x
TAB_TITLE_CY = 20    # title text center y
TAB_TITLE_MAX_W = 170  # max title width before close X
URL_X = 158          # url text start x
URL_CY = 62          # url text center y

# Colors
C_TAB_STRIP = (31, 32, 32)
C_TAB_ACTIVE = (60, 60, 60)
C_CONTENT = (255, 255, 255)
C_SCROLLBAR = (44, 44, 44)
C_SCROLLBAR_ARROW = (159, 159, 159)
C_TEXT = (227, 227, 227)
C_URL = (138, 174, 216)

# Shadow & rounded corners for final output (Linux windows have subtle rounding)
CORNER_RADIUS = 8
SHADOW_SIZE = 30
PADDING = 40


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for path in [
        "/usr/share/fonts/truetype/ubuntu/Ubuntu[wdth,wght].ttf",
        "/usr/share/fonts/truetype/roboto/Roboto-Regular.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/TTF/DejaVuSans.ttf",
    ]:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def truncate_text(text: str, font: ImageFont.FreeTypeFont, max_width: int) -> str:
    if font.getlength(text) <= max_width:
        return text
    for i in range(len(text), 0, -1):
        candidate = text[:i] + "..."
        if font.getlength(candidate) <= max_width:
            return candidate
    return "..."


# ─── Frame resize (9-slice from real Chrome screenshot) ───


def resize_chrome_frame(target_w: int, target_h: int) -> Image.Image:
    """Resize Chrome frame template to target dimensions using 9-slice."""
    tpl = Image.open(TEMPLATE_PATH)
    tpl_w = tpl.width

    content_h = max(target_h - CHROME_H, 10)

    # ── Tab strip row (y=0→39) ──
    tab_left = tpl.crop((0, 0, TAB_LEFT, TAB_STRIP_H))
    tab_plus = tpl.crop((TAB_PLUS_START, 0, TAB_PLUS_END, TAB_STRIP_H))
    tab_right = tpl.crop((TAB_RIGHT_START, 0, tpl_w, TAB_STRIP_H))
    right_w = tpl_w - TAB_RIGHT_START

    gap_w = TAB_PLUS_START - TAB_LEFT

    tab_row = Image.new("RGBA", (target_w, TAB_STRIP_H), (*C_TAB_STRIP, 255))
    tab_row.paste(tab_left, (0, 0))
    tab_row.paste(tab_plus, (TAB_LEFT + gap_w, 0))
    tab_row.paste(tab_right, (target_w - right_w, 0))

    # ── Nav bar row (y=40→86) ──
    nav_h = CHROME_H - TAB_STRIP_H

    nav_left = tpl.crop((0, TAB_STRIP_H, NAV_LEFT, CHROME_H))
    nav_right = tpl.crop((NAV_RIGHT_START, TAB_STRIP_H, tpl_w, CHROME_H))
    nav_right_w = tpl_w - NAV_RIGHT_START

    omnibox_slice = tpl.crop((300, TAB_STRIP_H, 301, CHROME_H))

    nav_row = Image.new("RGBA", (target_w, nav_h), (*C_TAB_ACTIVE, 255))
    nav_row.paste(nav_left, (0, 0))

    omnibox_w = target_w - NAV_LEFT - nav_right_w
    for ox in range(omnibox_w):
        nav_row.paste(omnibox_slice, (NAV_LEFT + ox, 0))

    nav_row.paste(nav_right, (target_w - nav_right_w, 0))

    # ── Assemble ──
    result = Image.new("RGBA", (target_w, target_h), (*C_CONTENT, 255))
    result.paste(tab_row, (0, 0))
    result.paste(nav_row, (0, TAB_STRIP_H))

    # Scrollbar track
    sb_x = target_w - SCROLLBAR_W
    draw = ImageDraw.Draw(result)
    draw.rectangle((sb_x, CHROME_H, target_w, target_h), fill=(*C_SCROLLBAR, 255))

    # Scrollbar arrows
    sb_cx = sb_x + SCROLLBAR_W // 2
    for i in range(5):
        y = CHROME_H + 6 + i
        draw.line([(sb_cx - i, y), (sb_cx + i, y)], fill=(*C_SCROLLBAR_ARROW, 255))
    for i in range(5):
        y = target_h - 7 - i
        draw.line([(sb_cx - i, y), (sb_cx + i, y)], fill=(*C_SCROLLBAR_ARROW, 255))

    return result


# ─── Text & favicon overlay ───


def overlay_text(frame: Image.Image, title: str, url: str, favicon: Image.Image | None = None) -> Image.Image:
    """Overlay favicon, tab title, and URL text onto the Chrome frame."""
    img = frame.copy()
    d = ImageDraw.Draw(img)

    # Favicon
    if favicon is not None:
        fav = favicon.resize((FAVICON_SIZE, FAVICON_SIZE), Image.LANCZOS).convert("RGBA")
        img.paste(fav, (FAVICON_X, FAVICON_Y), fav)

    # Tab title
    title_font = load_font(13)
    tab_title = truncate_text(title, title_font, TAB_TITLE_MAX_W)
    bbox = title_font.getbbox(tab_title)
    th = bbox[3] - bbox[1]
    d.text((TAB_TITLE_X, TAB_TITLE_CY - th // 2), tab_title, fill=C_TEXT, font=title_font)

    # URL
    url_font = load_font(13)
    url_display = url.replace("https://", "").replace("http://", "")
    url_bbox = url_font.getbbox(url_display)
    url_th = url_bbox[3] - url_bbox[1]
    d.text((URL_X, URL_CY - url_th // 2), url_display, fill=C_URL, font=url_font)

    return img


# ─── Screenshot capture ───


def take_screenshots(sites: list[dict]) -> dict[str, Image.Image]:
    """Capture website screenshots using Playwright."""
    results: dict[str, Image.Image] = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for site in sites:
            url = site["url"]
            width = site.get("width", 1280)
            height = site.get("height", 800)
            zoom = site.get("zoom", 1)
            output_name = site["output"]

            print(f"  Capturing {url} ({width}x{height}, zoom {zoom}) ...")
            page = browser.new_page(
                viewport={"width": width, "height": height},
                device_scale_factor=1,
            )

            if zoom != 1:
                page.evaluate(f"document.body.style.zoom = '{zoom}'")

            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(1500)

            png = page.screenshot(type="png")
            page.close()

            results[output_name] = Image.open(io.BytesIO(png))

        browser.close()

    return results


def fetch_favicons_via_playwright(sites: list[dict]) -> dict[str, Image.Image | None]:
    """Fetch favicons by visiting each page and extracting the icon link."""
    results: dict[str, Image.Image | None] = {}
    import urllib.request

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for site in sites:
            url = site["url"]
            key = site["output"]
            try:
                page = browser.new_page()
                page.goto(url, wait_until="domcontentloaded", timeout=10000)

                # Extract favicon URL from page
                favicon_url = page.evaluate("""() => {
                    const link = document.querySelector('link[rel*="icon"]');
                    if (link) return link.href;
                    return null;
                }""")
                page.close()

                if not favicon_url:
                    # Fallback: try common paths
                    domain = url.replace("https://", "").replace("http://", "").split("/")[0]
                    for path in ["/favicon.ico", "/favicon.png", "/icon.svg", "/icon.png"]:
                        try:
                            test_url = f"https://{domain}{path}"
                            req = urllib.request.Request(test_url, headers={"User-Agent": "Mozilla/5.0"})
                            urllib.request.urlopen(req, timeout=3)
                            favicon_url = test_url
                            break
                        except Exception:
                            continue

                if favicon_url:
                    req = urllib.request.Request(favicon_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req, timeout=5) as resp:
                        data = resp.read()
                        # SVG
                        if favicon_url.endswith(".svg") or b"<svg" in data[:500]:
                            try:
                                import cairosvg
                                png_data = cairosvg.svg2png(bytestring=data, output_width=64, output_height=64)
                                results[key] = Image.open(io.BytesIO(png_data)).convert("RGBA")
                            except (ImportError, Exception):
                                results[key] = None
                        else:
                            # ICO/PNG/other — try opening, ICO may need specific handling
                            try:
                                img = Image.open(io.BytesIO(data))
                                # For ICO with multiple sizes, pick largest
                                if hasattr(img, "n_frames") and img.n_frames > 1:
                                    best = max(range(img.n_frames), key=lambda i: (img.seek(i) or img.size)[0] * img.size[1])
                                    img.seek(best)
                                results[key] = img.convert("RGBA")
                            except Exception:
                                results[key] = None
                    print(f"    {url}: favicon OK ({favicon_url.split('/')[-1]})")
                else:
                    results[key] = None
                    print(f"    {url}: no favicon found")
            except Exception as e:
                results[key] = None
                print(f"    {url}: favicon failed ({e})")

        browser.close()

    return results


# ─── Shadow & rounded corners ───


def round_corners(img: Image.Image, radius: int) -> Image.Image:
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, img.width - 1, img.height - 1), radius=radius, fill=255
    )
    img = img.convert("RGBA")
    img.putalpha(mask)
    return img


def add_shadow(img: Image.Image, shadow_size: int, padding: int) -> Image.Image:
    cw = img.width + padding * 2
    ch = img.height + padding * 2
    canvas = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    for off in range(shadow_size, 0, -2):
        a = int(10 * (1 - off / shadow_size))
        d.rounded_rectangle(
            (padding - off, padding - off + shadow_size // 4,
             padding + img.width + off, padding + img.height + off),
            radius=CORNER_RADIUS + off // 2,
            fill=(0, 0, 0, a),
        )
    canvas.paste(img, (padding, padding), img)
    return canvas


# ─── Compose final mockup ───


def compose_mockup(
    screenshot: Image.Image,
    title: str,
    url: str,
    favicon: Image.Image | None = None,
    frame_width: int | None = None,
    frame_height: int | None = None,
) -> Image.Image:
    """Compose a complete browser mockup: frame + screenshot + text overlay."""
    sw, sh = screenshot.size
    fw = frame_width or sw
    fh = frame_height or (sh + CHROME_H)

    # Resize screenshot to fit content area (below chrome, left of scrollbar)
    content_w = fw - SCROLLBAR_W
    content_h = fh - CHROME_H
    screenshot = screenshot.resize((content_w, content_h), Image.LANCZOS)

    # Build frame
    frame = resize_chrome_frame(fw, fh)

    # Paste screenshot into content area
    frame.paste(screenshot.convert("RGBA"), (0, CHROME_H))

    # Overlay text
    frame = overlay_text(frame, title, url, favicon)

    # Add rounded corners + shadow
    frame = round_corners(frame, CORNER_RADIUS)
    frame = add_shadow(frame, SHADOW_SIZE, PADDING)

    return frame


# ─── Main ───


def main() -> None:
    cli_args = sys.argv[1:]
    filter_name = next((a for a in cli_args if not a.startswith("--")), None)
    no_shadow = "--no-shadow" in cli_args

    with open(CONFIG_PATH) as f:
        sites: list[dict] = json.load(f)

    if filter_name:
        sites = [s for s in sites if filter_name in s["output"]]
        if not sites:
            print(f"No sites matching '{filter_name}' in {CONFIG_PATH.name}")
            sys.exit(1)

    print(f"Generating {len(sites)} mockup(s)...")

    # Take all screenshots
    screenshots = take_screenshots(sites)

    # Fetch favicons
    print("  Fetching favicons...")
    # Check for local favicon paths first
    local_favicons: dict[str, Image.Image | None] = {}
    sites_needing_fetch = []
    for site in sites:
        key = site["output"]
        favicon_path = site.get("favicon")
        if favicon_path:
            p = Path(favicon_path)
            if not p.is_absolute():
                p = PROJECT_DIR / p
            local_favicons[key] = Image.open(p).convert("RGBA") if p.exists() else None
        else:
            sites_needing_fetch.append(site)
            local_favicons[key] = None

    # Fetch missing favicons via Playwright
    if sites_needing_fetch:
        fetched = fetch_favicons_via_playwright(sites_needing_fetch)
        local_favicons.update(fetched)
    favicons = local_favicons

    # Compose mockups
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for site in sites:
        output_name = site["output"]
        title = site.get("title", site["url"])
        url = site["url"]
        width = site.get("width", 1280)
        height = site.get("height", 800)
        favicon = favicons.get(output_name)

        screenshot = screenshots[output_name]

        if no_shadow:
            # Build without shadow/rounded corners
            frame = resize_chrome_frame(width, height + CHROME_H)
            content_w = width - SCROLLBAR_W
            content_h = height
            resized = screenshot.resize((content_w, content_h), Image.LANCZOS)
            frame.paste(resized.convert("RGBA"), (0, CHROME_H))
            mockup = overlay_text(frame, title, url, favicon)
        else:
            mockup = compose_mockup(screenshot, title, url, favicon, width, height + CHROME_H)

        out_path = OUTPUT_DIR / output_name
        mockup.save(str(out_path), "PNG", optimize=True)
        print(f"  {out_path.name} ({out_path.stat().st_size / 1024:.0f} KB, {mockup.width}x{mockup.height})")

    print("Done!")


if __name__ == "__main__":
    main()
