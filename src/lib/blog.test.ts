import { describe, it, expect } from 'vitest';
import { getAllPosts, getAllPostSlugs, getPost, formatPostDate } from './blog';

describe('lib/blog', () => {
  describe('getAllPostSlugs', () => {
    it('returns at least the placeholder post', async () => {
      const slugs = await getAllPostSlugs();
      expect(slugs).toContain('hello-world');
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
  });

  describe('getPost', () => {
    it('returns the placeholder post by slug', async () => {
      const post = await getPost('hello-world');
      expect(post).not.toBeNull();
      expect(post?.title).toBe('Hello, blog');
      expect(post?.content).toContain('placeholder post');
    });

    it('returns null for unknown slug', async () => {
      const post = await getPost('does-not-exist');
      expect(post).toBeNull();
    });
  });

  describe('formatPostDate', () => {
    it('formats ISO date as long-month US date', () => {
      expect(formatPostDate('2026-05-10')).toBe('May 10, 2026');
    });
  });
});
