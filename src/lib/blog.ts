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
  tags?: string[];
  readingTime?: string;
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
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog');
const WORDS_PER_MINUTE = 220;

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
  const ogImageUrl = resolveAssetUrl(slug, fm.ogImage) ?? coverUrl;

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

export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
