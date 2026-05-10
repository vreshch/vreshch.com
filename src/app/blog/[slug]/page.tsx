import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogMdx } from '@/components/blog-mdx';
import { formatPostDate, getAllPostSlugs, getPost } from '@/lib/blog';

type Params = { slug: string };

const REPO_URL = 'https://github.com/vreshch/vreshch.com';
const REPO_BRANCH = 'master';

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `https://vreshch.com/blog/${post.slug}`;
  const ogImage = post.ogImageUrl ?? '/og-image.png';

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const sourceUrl = `${REPO_URL}/blob/${REPO_BRANCH}/src/content/blog/${post.slug}/article.md`;

  return (
    <article className="mx-auto max-w-3xl px-6 pb-16 pt-12 md:pb-24 md:pt-16">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-heading dark:text-dark-text-secondary dark:hover:text-dark-text"
      >
        ← Back to blog
      </Link>
      <header className="mb-10 border-b border-border/30 pb-8 dark:border-dark-border">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted dark:text-dark-text-secondary">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          {post.updated && post.updated !== post.date && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
              </span>
            </>
          )}
        </div>
        <h1 className="mb-4 text-3xl font-medium leading-tight text-heading dark:text-dark-text md:text-5xl md:leading-tight">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="mb-5 text-lg text-muted dark:text-dark-text-secondary md:text-xl">
            {post.subtitle}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted dark:bg-dark-surface dark:text-dark-text-secondary"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        {post.mediumUrl && (
          <a
            href={post.mediumUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-dark-accent dark:hover:text-dark-accent"
          >
            Originally published on Medium →
          </a>
        )}
      </header>
      {post.coverUrl && (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/40 bg-surface-alt dark:border-dark-border dark:bg-dark-surface-alt">
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="prose-blog">
        <BlogMdx source={post.content} />
      </div>
      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border/30 pt-8 text-sm text-muted dark:border-dark-border dark:text-dark-text-secondary">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 transition-colors hover:text-heading dark:hover:text-dark-text"
        >
          ← All posts
        </Link>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-heading dark:hover:text-dark-text"
        >
          Edit this post on GitHub →
        </a>
      </footer>
    </article>
  );
}
