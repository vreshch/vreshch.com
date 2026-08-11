import { describe, it, expect } from 'vitest';
import { getAllPosts, getAllPostSlugs, getPost, formatPostDate, isPostVisible } from './blog';

const FIRST_POST_SLUG = 'vibe-coded-mcp-catalog';

describe('lib/blog', () => {
  describe('getAllPostSlugs', () => {
    it('discovers the first post', async () => {
      const slugs = await getAllPostSlugs();
      expect(slugs).toContain(FIRST_POST_SLUG);
    });
  });

  describe('getAllPosts', () => {
    it('returns posts sorted by date descending', async () => {
      const posts = await getAllPosts();
      expect(posts.length).toBeGreaterThan(0);

      for (let i = 1; i < posts.length; i++) {
        expect(posts[i - 1].date >= posts[i].date).toBe(true);
      }
    });

    it('every post has required fields', async () => {
      const posts = await getAllPosts();
      for (const post of posts) {
        expect(post.slug).toBeTruthy();
        expect(post.title).toBeTruthy();
        expect(post.date).toBeTruthy();
        expect(post.readingTime).toBeTruthy();
      }
    });

    it('does not leak full content into the index', async () => {
      const posts = await getAllPosts();
      for (const post of posts) {
        expect(post).not.toHaveProperty('content');
      }
    });

    it('resolves cover URL relative to the post slug', async () => {
      const posts = await getAllPosts();
      const post = posts.find((p) => p.slug === FIRST_POST_SLUG);
      expect(post?.coverUrl).toBe(`/blog/${FIRST_POST_SLUG}/images/cover.png`);
    });

    it('excludes a post scheduled for future publishAt from the listing', async () => {
      const posts = await getAllPosts();
      const post = posts.find((p) => p.slug === 'everything-is-code');
      // Placeholder publishAt; PR body flags it must be set to the real Medium schedule before merge.
      expect(post).toBeUndefined();
    });
  });

  describe('getPost', () => {
    it('returns the first post by slug', async () => {
      const post = await getPost(FIRST_POST_SLUG);
      expect(post).not.toBeNull();
      expect(post?.title).toMatch(/Vibe-Coded an MCP Catalog/);
      expect(post?.coverUrl).toBe(`/blog/${FIRST_POST_SLUG}/images/cover.png`);
      expect(post?.content).toContain('mcpxhub.io');
      expect(post?.category).toBe('coding');
    });

    it('returns null for unknown slug', async () => {
      const post = await getPost('does-not-exist');
      expect(post).toBeNull();
    });

    it('returns a scheduled post directly by slug regardless of publishAt', async () => {
      const post = await getPost('everything-is-code');
      expect(post).not.toBeNull();
      expect(post?.publishAt).toBe('2026-08-10T08:00:00Z');
    });
  });

  describe('formatPostDate', () => {
    it('formats ISO date as long-month US date', () => {
      expect(formatPostDate('2026-05-10')).toBe('May 10, 2026');
    });
  });

  describe('isPostVisible', () => {
    const now = new Date('2026-08-06T00:00:00Z');

    it('hides a post with a future publishAt', () => {
      expect(isPostVisible('2026-08-10T08:00:00Z', now)).toBe(false);
    });

    it('shows a post with a past publishAt', () => {
      expect(isPostVisible('2026-01-01T00:00:00Z', now)).toBe(true);
    });

    it('shows a post with no publishAt', () => {
      expect(isPostVisible(undefined, now)).toBe(true);
    });

    it('shows a post whose publishAt is exactly now', () => {
      expect(isPostVisible(now.toISOString(), now)).toBe(true);
    });
  });
});
