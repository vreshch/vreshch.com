import type { Metadata } from 'next';
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
          <ul className="flex flex-col gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block">
                  <Card hover="lift">
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted dark:text-dark-text-secondary">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="mb-2 text-2xl font-medium leading-snug text-heading dark:text-dark-text">
                      {post.title}
                    </h2>
                    {post.subtitle && (
                      <p className="text-base text-muted dark:text-dark-text-secondary md:text-lg">
                        {post.subtitle}
                      </p>
                    )}
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
