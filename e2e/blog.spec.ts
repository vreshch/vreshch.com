import { test, expect } from '@playwright/test';

test.describe('blog', () => {
  test('/blog lists the placeholder post', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Blog/);
    await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Hello, blog' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Hello, blog/i })).toHaveAttribute(
      'href',
      '/blog/hello-world'
    );
  });

  test('/blog/hello-world renders the post', async ({ page }) => {
    await page.goto('/blog/hello-world', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1, name: 'Hello, blog' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'What this proves' })).toBeVisible();
    await expect(page.locator('article pre code')).toBeVisible();
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
