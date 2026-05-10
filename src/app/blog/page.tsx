import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/card';
import { getAllPosts, formatPostDate, type BlogPostMeta } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Mostly on agents, MCP, and the craft of shipping — with detours into family and hobby.',
};

function GridCoverFrame({ url, alt, sizes }: { url?: string; alt: string; sizes: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-alt dark:bg-dark-surface-alt">
      {url ? (
        <Image src={url} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-surface to-surface-alt dark:from-dark-surface dark:to-dark-surface-alt" />
      )}
    </div>
  );
}

function FeaturedCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Card hover="lift" padding="none" className="overflow-hidden">
        <div className="grid items-stretch md:grid-cols-2">
          <div className="p-4 md:p-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border/60 bg-surface-alt dark:border-dark-border dark:bg-dark-surface-alt md:aspect-auto md:h-full md:min-h-[228px]">
              {post.coverUrl ? (
                <Image
                  src={post.coverUrl}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-surface to-surface-alt dark:from-dark-surface dark:to-dark-surface-alt" />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted dark:text-dark-text-secondary">
              <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide text-accent dark:bg-dark-accent/15 dark:text-dark-accent">
                Featured
              </span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mb-2 text-2xl font-medium leading-snug text-heading dark:text-dark-text md:text-3xl">
              {post.title}
            </h2>
            {post.subtitle && (
              <p className="line-clamp-2 text-sm text-muted dark:text-dark-text-secondary md:text-base">
                {post.subtitle}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

function GridCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="flex w-full">
      <Card hover="lift" padding="none" className="flex w-full flex-col overflow-hidden">
        <GridCoverFrame
          url={post.coverUrl}
          alt={post.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted dark:text-dark-text-secondary">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h2 className="mb-2 mt-2 text-lg font-medium leading-snug text-heading dark:text-dark-text">
            {post.title}
          </h2>
          {post.subtitle && (
            <p className="line-clamp-3 text-sm text-muted dark:text-dark-text-secondary">
              {post.subtitle}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Mostly on agents, MCP, and the craft of shipping — with detours into family and hobby."
      />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        {posts.length === 0 ? (
          <p className="text-muted dark:text-dark-text-secondary">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-10">
            {featured && <FeaturedCard post={featured} />}
            {rest.length > 0 && (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={post.slug} className="flex">
                    <GridCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
