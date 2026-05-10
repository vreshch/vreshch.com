import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/card';
import { getAllPosts, formatPostDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Field reports on agents, MCP, developer tooling, and shipping software.',
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Field reports on agents, MCP, developer tooling, and shipping software."
      />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        {posts.length === 0 ? (
          <p className="text-muted dark:text-dark-text-secondary">No posts yet.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="flex">
                <Link href={`/blog/${post.slug}`} className="flex w-full">
                  <Card hover="lift" padding="none" className="flex w-full flex-col overflow-hidden">
                    {post.coverUrl ? (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-alt dark:bg-dark-surface-alt">
                        <Image
                          src={post.coverUrl}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] w-full bg-gradient-to-br from-surface to-surface-alt dark:from-dark-surface dark:to-dark-surface-alt" />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted dark:text-dark-text-secondary">
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h2 className="mb-2 text-lg font-medium leading-snug text-heading dark:text-dark-text">
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
