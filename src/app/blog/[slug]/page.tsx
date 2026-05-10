import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogMdx } from '@/components/blog-mdx';
import { formatPostDate, getAllPostSlugs, getPost } from '@/lib/blog';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `https://vreshch.com/blog/${post.slug}`;
  const ogImage = post.ogImage ? `/blog/${post.slug}/${post.ogImage}` : '/og-image.png';

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
        </div>
        <h1 className="mb-4 text-3xl font-medium leading-tight text-heading dark:text-dark-text md:text-5xl md:leading-tight">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="text-lg text-muted dark:text-dark-text-secondary md:text-xl">
            {post.subtitle}
          </p>
        )}
      </header>
      <div className="prose-blog">
        <BlogMdx source={post.content} />
      </div>
    </article>
  );
}
