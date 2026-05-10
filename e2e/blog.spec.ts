import { test, expect } from '@playwright/test';

const FIRST_POST_SLUG = 'vibe-coded-mcp-catalog';
const FIRST_POST_TITLE = /Vibe-Coded an MCP Catalog/;

test.describe('blog', () => {
  test('/blog lists posts as cards with cover images', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Blog/);
    await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();

    const card = page.getByRole('link', { name: FIRST_POST_TITLE });
    await expect(card).toHaveAttribute('href', `/blog/${FIRST_POST_SLUG}`);
    await expect(card.locator('img')).toBeVisible();
  });

  test(`/blog/${FIRST_POST_SLUG} renders the post with hero image`, async ({ page }) => {
    await page.goto(`/blog/${FIRST_POST_SLUG}`, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1, name: FIRST_POST_TITLE })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'The four lessons' })).toBeVisible();
    await expect(page.locator('article img').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to blog/i })).toHaveAttribute(
      'href',
      '/blog'
    );
  });

  test('/blog/does-not-exist returns 404', async ({ page }) => {
    const res = await page.goto('/blog/does-not-exist');
    expect(res?.status()).toBe(404);
  });
});
