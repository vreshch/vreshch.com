import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const OUT = 'docs/screenshots';
const BASE = 'http://localhost:3000';

const shots = [
  { url: '/blog', file: 'blog-list-light.png', theme: 'light' },
  { url: '/blog', file: 'blog-list-dark.png', theme: 'dark' },
  { url: '/blog/hello-world', file: 'blog-post-light.png', theme: 'light' },
  { url: '/blog/hello-world', file: 'blog-post-dark.png', theme: 'dark' },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
for (const { url, file, theme } of shots) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  await ctx.addInitScript((t) => {
    localStorage.setItem('theme', t);
  }, theme);
  const page = await ctx.newPage();
  await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/${file}`, fullPage: true });
  console.log(`✓ ${OUT}/${file}`);
  await ctx.close();
}
await browser.close();
