import { describe, it, expect } from 'vitest';
import nextConfig from '../../next.config';

describe('next.config', () => {
  it('has reactStrictMode enabled', () => {
    expect(nextConfig.reactStrictMode).toBe(true);
  });

  it('uses standalone output', () => {
    expect(nextConfig.output).toBe('standalone');
  });

  describe('redirects', () => {
    it('defines redirects function', () => {
      expect(nextConfig.redirects).toBeDefined();
      expect(typeof nextConfig.redirects).toBe('function');
    });

    it('returns all legacy .html redirects', async () => {
      const redirects = await nextConfig.redirects!();

      const expectedRedirects = [
        { source: '/cv.html', destination: '/cv' },
        { source: '/interests.html', destination: '/interests' },
        { source: '/projects.html', destination: '/projects' },
        { source: '/chemistry-js.html', destination: '/chemistry-js' },
        { source: '/contacts.html', destination: '/contacts' },
        { source: '/support.html', destination: '/support' },
      ];

      expect(redirects).toHaveLength(expectedRedirects.length);

      for (const expected of expectedRedirects) {
        const found = redirects.find((r) => r.source === expected.source);
        expect(found).toBeDefined();
        expect(found?.destination).toBe(expected.destination);
        expect(found?.permanent).toBe(true);
      }
    });

    it('all redirects are permanent (301)', async () => {
      const redirects = await nextConfig.redirects!();

      for (const redirect of redirects) {
        expect(redirect.permanent).toBe(true);
      }
    });

    it('all sources end with .html', async () => {
      const redirects = await nextConfig.redirects!();

      for (const redirect of redirects) {
        expect(redirect.source).toMatch(/\.html$/);
      }
    });

    it('no destination ends with .html', async () => {
      const redirects = await nextConfig.redirects!();

      for (const redirect of redirects) {
        expect(redirect.destination).not.toMatch(/\.html$/);
      }
    });
  });
});
