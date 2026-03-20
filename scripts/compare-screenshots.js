#!/usr/bin/env node

/**
 * compare-screenshots.js
 *
 * Smart visual diff: compares base vs current screenshots, generates
 * highlighted overlays with region detection.
 *
 * Usage:
 *   node scripts/compare-screenshots.js <base-dir> <current-dir> \
 *     [--output report.json] [--diff-dir dir] [--highlight-dir dir]
 *
 * Output JSON:
 *   {
 *     "images": [
 *       { "name": "home-desktop.png", "status": "changed",
 *         "totalPixels": 1024000, "changedPixels": 120, "changedPercent": 0.01,
 *         "diffPath": "...", "highlightPath": "..." },
 *       { "name": "new-page.png", "status": "added" },
 *       { "name": "old-page.png", "status": "removed" }
 *     ],
 *     "summary": { "total": 12, "changed": 2, "added": 0, "removed": 0, "unchanged": 10 }
 *   }
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

function listPngs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.png'))
    .sort();
}

function readPng(filepath) {
  return PNG.sync.read(readFileSync(filepath));
}

function compareImages(basePath, currentPath, diffPath) {
  const baseImg = readPng(basePath);
  const currImg = readPng(currentPath);

  if (baseImg.width !== currImg.width || baseImg.height !== currImg.height) {
    return {
      totalPixels: currImg.width * currImg.height,
      changedPixels: currImg.width * currImg.height,
      changedPercent: 100,
      resized: true,
      diffImg: null,
    };
  }

  const { width, height } = baseImg;
  const diff = new PNG({ width, height });

  const changedPixels = pixelmatch(baseImg.data, currImg.data, diff.data, width, height, {
    threshold: 0.1,
    diffMask: true,
  });

  if (diffPath && changedPixels > 0) {
    const dir = join(diffPath, '..');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(diffPath, PNG.sync.write(diff));
  }

  const totalPixels = width * height;
  return {
    totalPixels,
    changedPixels,
    changedPercent: Number(((changedPixels / totalPixels) * 100).toFixed(3)),
    resized: false,
    diffImg: diff,
  };
}

// --- Region detection via connected-component analysis ---

function setPixel(img, width, height, x, y, r, g, b, a) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const idx = (y * width + x) * 4;
  img.data[idx] = r;
  img.data[idx + 1] = g;
  img.data[idx + 2] = b;
  img.data[idx + 3] = a;
}

function drawRect(img, width, height, x1, y1, x2, y2, thickness, color) {
  const [r, g, b, a] = color;
  for (let t = 0; t < thickness; t++) {
    for (let x = x1 - t; x <= x2 + t; x++) {
      setPixel(img, width, height, x, y1 - t, r, g, b, a);
      setPixel(img, width, height, x, y2 + t, r, g, b, a);
    }
    for (let y = y1 - t; y <= y2 + t; y++) {
      setPixel(img, width, height, x1 - t, y, r, g, b, a);
      setPixel(img, width, height, x2 + t, y, r, g, b, a);
    }
  }
}

function findChangedRegions(diffImg, width, height) {
  const CELL = 8;
  const cols = Math.ceil(width / CELL);
  const rows = Math.ceil(height / CELL);
  const cellGrid = new Uint8Array(rows * cols);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (diffImg.data[(y * width + x) * 4 + 3] > 0) {
        cellGrid[Math.floor(y / CELL) * cols + Math.floor(x / CELL)] = 1;
      }
    }
  }

  // Dilate by 2 cells to merge nearby regions
  const DILATE = 2;
  const dilated = new Uint8Array(rows * cols);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!cellGrid[r * cols + c]) continue;
      for (let dr = -DILATE; dr <= DILATE; dr++) {
        for (let dc = -DILATE; dc <= DILATE; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            dilated[nr * cols + nc] = 1;
          }
        }
      }
    }
  }

  // Flood-fill connected components
  const labels = new Int32Array(rows * cols);
  let nextLabel = 1;
  const regions = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!dilated[r * cols + c] || labels[r * cols + c]) continue;
      const label = nextLabel++;
      const queue = [[r, c]];
      labels[r * cols + c] = label;
      let minR = r,
        maxR = r,
        minC = c,
        maxC = c;

      while (queue.length > 0) {
        const [cr, cc] = queue.shift();
        for (const [dr, dc] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            dilated[nr * cols + nc] &&
            !labels[nr * cols + nc]
          ) {
            labels[nr * cols + nc] = label;
            queue.push([nr, nc]);
            minR = Math.min(minR, nr);
            maxR = Math.max(maxR, nr);
            minC = Math.min(minC, nc);
            maxC = Math.max(maxC, nc);
          }
        }
      }
      regions.push({ minR, maxR, minC, maxC });
    }
  }

  const PAD = 6;
  return regions.map(({ minR, maxR, minC, maxC }) => ({
    x1: Math.max(0, minC * CELL - PAD),
    y1: Math.max(0, minR * CELL - PAD),
    x2: Math.min(width - 1, (maxC + 1) * CELL + PAD),
    y2: Math.min(height - 1, (maxR + 1) * CELL + PAD),
  }));
}

// --- Highlight generation: overlay on current image ---

function generateHighlight(currentPath, diffImg, highlightPath) {
  const currImg = readPng(currentPath);
  const { width, height } = currImg;
  const highlight = new PNG({ width, height });
  currImg.data.copy(highlight.data);

  const boxes = findChangedRegions(diffImg, width, height);

  // 1. Semi-transparent magenta fill inside each bounding box
  const fillAlpha = 0.08;
  for (const { x1, y1, x2, y2 } of boxes) {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        const idx = (y * width + x) * 4;
        highlight.data[idx] = Math.round(255 * fillAlpha + highlight.data[idx] * (1 - fillAlpha));
        highlight.data[idx + 1] = Math.round(
          0 * fillAlpha + highlight.data[idx + 1] * (1 - fillAlpha)
        );
        highlight.data[idx + 2] = Math.round(
          255 * fillAlpha + highlight.data[idx + 2] * (1 - fillAlpha)
        );
      }
    }
  }

  // 2. Stronger tint on individual changed pixels
  const pixelAlpha = 0.35;
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    if (diffImg.data[idx + 3] > 0) {
      highlight.data[idx] = Math.round(255 * pixelAlpha + currImg.data[idx] * (1 - pixelAlpha));
      highlight.data[idx + 1] = Math.round(
        0 * pixelAlpha + currImg.data[idx + 1] * (1 - pixelAlpha)
      );
      highlight.data[idx + 2] = Math.round(
        255 * pixelAlpha + currImg.data[idx + 2] * (1 - pixelAlpha)
      );
      highlight.data[idx + 3] = 255;
    }
  }

  // 3. Solid border rectangle around each region
  const BORDER = 2;
  const borderColor = [255, 0, 170, 255];
  for (const box of boxes) {
    drawRect(highlight, width, height, box.x1, box.y1, box.x2, box.y2, BORDER, borderColor);
  }

  // 4. Gutter bar on the right edge showing Y-range of changes
  const GUTTER_W = 4;
  const gutterX = width - GUTTER_W - 1;
  for (const { y1, y2 } of boxes) {
    for (let y = y1; y <= y2; y++) {
      for (let dx = 0; dx < GUTTER_W; dx++) {
        setPixel(highlight, width, height, gutterX + dx, y, 255, 0, 170, 255);
      }
    }
  }

  const dir = join(highlightPath, '..');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(highlightPath, PNG.sync.write(highlight));
}

// --- Main ---

function main() {
  const args = process.argv.slice(2);
  const baseDir = args[0];
  const currentDir = args[1];
  const outputIdx = args.indexOf('--output');
  const outputPath = outputIdx !== -1 ? args[outputIdx + 1] : null;
  const diffDir = args.includes('--diff-dir')
    ? args[args.indexOf('--diff-dir') + 1]
    : join(currentDir, '..', 'screenshot-diffs');
  const highlightDir = args.includes('--highlight-dir')
    ? args[args.indexOf('--highlight-dir') + 1]
    : join(currentDir, '..', 'screenshot-highlights');

  if (!baseDir || !currentDir) {
    console.error(
      'Usage: node compare-screenshots.js <base-dir> <current-dir> [--output file.json] [--diff-dir dir] [--highlight-dir dir]'
    );
    process.exit(1);
  }

  const basePngs = new Set(listPngs(baseDir));
  const currentPngs = new Set(listPngs(currentDir));
  const allNames = [...new Set([...basePngs, ...currentPngs])].sort();

  const images = [];
  let changed = 0,
    added = 0,
    removed = 0,
    unchanged = 0;

  for (const name of allNames) {
    const inBase = basePngs.has(name);
    const inCurrent = currentPngs.has(name);

    if (inBase && inCurrent) {
      const diffPath = join(diffDir, `diff-${name}`);
      const result = compareImages(join(baseDir, name), join(currentDir, name), diffPath);

      if (result.changedPixels === 0) {
        unchanged++;
        images.push({ name, status: 'unchanged' });
      } else {
        const entry = {
          name,
          status: 'changed',
          totalPixels: result.totalPixels,
          changedPixels: result.changedPixels,
          changedPercent: result.changedPercent,
          resized: result.resized,
          diffPath,
        };

        if (!result.resized && result.diffImg) {
          const highlightPath = join(highlightDir, `highlight-${name}`);
          generateHighlight(join(currentDir, name), result.diffImg, highlightPath);
          entry.highlightPath = highlightPath;
        }

        changed++;
        images.push(entry);
      }
    } else if (inCurrent && !inBase) {
      added++;
      images.push({ name, status: 'added' });
    } else {
      removed++;
      images.push({ name, status: 'removed' });
    }
  }

  const report = {
    images,
    summary: { total: allNames.length, changed, added, removed, unchanged },
  };

  const json = JSON.stringify(report, null, 2);
  if (outputPath) {
    writeFileSync(outputPath, json, 'utf-8');
    console.error(`Report written to ${outputPath}`);
  }
  console.log(json);
}

main();
