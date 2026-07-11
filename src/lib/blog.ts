import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export type BlogCategory = 'coding' | 'family' | 'hobby';

export const BLOG_CATEGORIES: BlogCategory[] = ['coding', 'family', 'hobby'];

export type BlogPostFrontmatter = {
  title: string;
  subtitle?: string;
  description?: string;
  date: string;
  updated?: string;
  category?: BlogCategory;
  cover?: string;
  ogImage?: string;
  thumbnail?: string;
  tags?: string[];
  readingTime?: string;
  mediumUrl?: string;
  coverLink?: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  date: string;
  updated?: string;
  category: BlogCategory;
  tags?: string[];
  readingTime: string;
  coverUrl?: string;
  ogImageUrl?: string;
  thumbnailUrl?: string;
  mediumUrl?: string;
  coverLink?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const WORDS_PER_MINUTE = 220;

// A generated per-post share card (scripts/generate-blog-og.py) is the canonical
// OG image so every post gets a distinct social preview. Order: generated og.png
// if present, else explicit frontmatter ogImage, else the cover, else sitewide.
function resolveOgImageUrl(
  slug: string,
  fm: BlogPostFrontmatter,
  coverUrl?: string
): string | undefined {
  const generated = `/blog/${slug}/images/og.png`;
  if (existsSync(path.join(PUBLIC_DIR, generated))) return generated;
  return resolveAssetUrl(slug, fm.ogImage) ?? coverUrl;
}

function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function resolveAssetUrl(slug: string, asset: string | undefined): string | undefined {
  if (!asset) return undefined;
  if (/^https?:\/\//.test(asset) || asset.startsWith('/')) return asset;
  const cleaned = asset.replace(/^\.?\//, '');
  return `/blog/${slug}/${cleaned}`;
}

async function readPostFile(slug: string): Promise<BlogPost> {
  const filePath = path.join(CONTENT_DIR, slug, 'article.md');
  const raw = await readFile(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const fm = data as BlogPostFrontmatter;
  if (!fm.title || !fm.date) {
    throw new Error(`Post ${slug} is missing required frontmatter: title or date.`);
  }

  const coverUrl = resolveAssetUrl(slug, fm.cover);
  const ogImageUrl = resolveOgImageUrl(slug, fm, coverUrl);
  // Static list/OG image so a post can use an animated cover on its own page
  // while the index card stays static. Falls back to the cover.
  const thumbnailUrl = resolveAssetUrl(slug, fm.thumbnail) ?? coverUrl;

  return {
    slug,
    title: fm.title,
    subtitle: fm.subtitle,
    description: fm.description ?? fm.subtitle,
    date: fm.date,
    updated: fm.updated,
    category: fm.category ?? 'coding',
    tags: fm.tags,
    readingTime: fm.readingTime ?? calculateReadingTime(content),
    coverUrl,
    ogImageUrl,
    thumbnailUrl,
    mediumUrl: fm.mediumUrl,
    coverLink: fm.coverLink,
    content,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(slugs.map(readPostFile));
  const metas: BlogPostMeta[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    description: post.description,
    date: post.date,
    updated: post.updated,
    category: post.category,
    tags: post.tags,
    readingTime: post.readingTime,
    coverUrl: post.coverUrl,
    ogImageUrl: post.ogImageUrl,
    thumbnailUrl: post.thumbnailUrl,
    mediumUrl: post.mediumUrl,
  }));
  return metas.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    return await readPostFile(slug);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}

export type TagCount = { tag: string; count: number };

export async function getAllTags(): Promise<TagCount[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => (post.tags ?? []).includes(tag));
}

// Posts are newest-first; prev = newer post, next = older post.
export async function getAdjacentPosts(
  slug: string
): Promise<{ prev: BlogPostMeta | null; next: BlogPostMeta | null }> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
