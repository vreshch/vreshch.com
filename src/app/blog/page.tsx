import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/card';
import { getAllPosts, formatPostDate, type BlogPostMeta } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Mostly on agents, MCP, and the craft of shipping — with detours into family and hobby.',
};

function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Card hover="lift" padding="none" className="overflow-hidden">
        <div className="grid items-center md:grid-cols-2">
          <div className="p-4 md:p-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-border/60 bg-surface-alt dark:border-dark-border dark:bg-dark-surface-alt">
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

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

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
          <ul className="flex flex-col gap-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
