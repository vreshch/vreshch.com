import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogMdx } from '@/components/blog-mdx';
import { formatPostDate, getAllPostSlugs, getPost } from '@/lib/blog';

type Params = { slug: string };

const SITE = 'https://vreshch.com';
const REPO_URL = 'https://github.com/vreshch/vreshch.com';
const REPO_BRANCH = 'master';

// JSON.stringify does not escape </script> or line/paragraph separators - escape for safe inline embedding.
function serialize(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

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
  const postUrl = `${SITE}/blog/${post.slug}`;

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Person', name: 'Volodymyr Vreshch', url: SITE },
    publisher: { '@type': 'Person', name: 'Volodymyr Vreshch', url: SITE },
    image: `${SITE}${post.ogImageUrl ?? '/og-image.png'}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    url: postUrl,
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 2, name: post.title, item: postUrl },
    ],
  };

  return (
    <article className="mx-auto max-w-5xl px-6 pb-16 pt-12 md:pb-24 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(blogPostingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(breadcrumbLd) }}
      />
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
          <p className="mt-5 text-sm">
            <a
              href={post.mediumUrl}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}
              className="font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
            >
              Full article at Medium →
            </a>
          </p>
        )}
      </header>
      {post.coverUrl &&
        (post.coverLink ? (
          <a
            href={post.coverLink}
            aria-label="Join the waitlist at agentage.io"
            className="group relative mb-10 block aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/40 bg-surface-alt dark:border-dark-border dark:bg-dark-surface-alt"
          >
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              priority
              unoptimized={post.coverUrl.endsWith('.gif')}
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/75 to-transparent p-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Join the waitlist at agentage.io →
            </span>
          </a>
        ) : (
          <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/40 bg-surface-alt dark:border-dark-border dark:bg-dark-surface-alt">
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              priority
              unoptimized={post.coverUrl.endsWith('.gif')}
            />
          </div>
        ))}
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
