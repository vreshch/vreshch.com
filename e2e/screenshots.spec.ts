import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'home' },
  { path: '/cv', name: 'cv' },
  { path: '/interests', name: 'interests' },
  { path: '/projects', name: 'projects' },
  { path: '/chemistry-js', name: 'chemistry-js' },
  { path: '/contacts', name: 'contacts' },
];

const MOBILE_VIEWPORT = { width: 375, height: 812 };

test.describe('desktop screenshots', () => {
  for (const { path, name } of pages) {
    test(`${name} page renders correctly`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/Volodymyr Vreshch|Curriculum Vitae|@chemistry|Projects/);
      await page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true });
    });
  }
});

test.describe('mobile screenshots', () => {
  test.use({ viewport: MOBILE_VIEWPORT });

  for (const { path, name } of pages) {
    test(`${name} page renders correctly on mobile`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      await expect(page).toHaveTitle(/Volodymyr Vreshch|Curriculum Vitae|@chemistry|Projects/);
      await page.screenshot({ path: `e2e/screenshots/${name}-mobile.png`, fullPage: true });
    });
  }
});

test.describe('redirects', () => {
  const redirects = [
    { from: '/cv.html', to: '/cv' },
    { from: '/interests.html', to: '/interests' },
    { from: '/projects.html', to: '/projects' },
    { from: '/chemistry-js.html', to: '/chemistry-js' },
    { from: '/contacts.html', to: '/contacts' },
    { from: '/support.html', to: '/support' },
  ];

  for (const { from, to } of redirects) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      await page.goto(from);
      await expect(page).toHaveURL(new RegExp(`${to}$`));
    });
  }
});
