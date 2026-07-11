import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { PostCard } from '@/components/post-card';
import { getAllTags, getPostsByTag } from '@/lib/blog';

type Params = { tag: string };

export async function generateStaticParams(): Promise<Params[]> {
  const tags = await getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag } = await params;
  const title = `Posts tagged ${tag}`;
  return {
    title,
    description: `Blog posts tagged ${tag}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
    openGraph: {
      title,
      description: `Blog posts tagged ${tag}.`,
      url: `/blog/tag/${tag}`,
      siteName: 'Volodymyr Vreshch',
    },
  };
}

export default async function BlogTagPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div>
      <PageHeader
        title={`Posts tagged “${tag}”`}
        description={`${posts.length} post${posts.length === 1 ? '' : 's'}.`}
      />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-heading dark:text-dark-text-secondary dark:hover:text-dark-text"
        >
          ← All posts
        </Link>
        <ul className="flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
