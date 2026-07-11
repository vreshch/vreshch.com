import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { PostCard } from '@/components/post-card';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on agents, MCP, and the craft of shipping - with an occasional detour.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog',
    description: 'Notes on agents, MCP, and the craft of shipping - with an occasional detour.',
    url: '/blog',
    siteName: 'Volodymyr Vreshch',
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Notes on agents, MCP, and the craft of shipping - with an occasional detour."
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
