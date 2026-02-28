import { test } from '@playwright/test';

const BASE = 'http://localhost:8080';
const pages = [
    { path: '/', name: 'home' },
    { path: '/cv', name: 'cv' },
    { path: '/interests', name: 'interests' },
    { path: '/projects', name: 'projects' },
    { path: '/chemistry-js', name: 'chemistry-js' },
    { path: '/contacts', name: 'contacts' },
];

for (const page of pages) {
    test(`screenshot desktop - ${page.name}`, async ({ browser }) => {
        const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
        const p = await context.newPage();
        await p.goto(`${BASE}${page.path}`, { waitUntil: 'networkidle' });
        await p.screenshot({ path: `screenshots/${page.name}-desktop.png`, fullPage: true });
        await context.close();
    });

    test(`screenshot mobile - ${page.name}`, async ({ browser }) => {
        const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
        const p = await context.newPage();
        await p.goto(`${BASE}${page.path}`, { waitUntil: 'networkidle' });
        await p.screenshot({ path: `screenshots/${page.name}-mobile.png`, fullPage: true });
        await context.close();
    });
}
