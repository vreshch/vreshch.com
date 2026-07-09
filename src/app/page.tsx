import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/card';
import { FeaturedProjectCard } from '@/components/featured-project-card';
import { FEATURED_PROJECTS } from '@/lib/featured-projects';
import { getAllPosts, formatPostDate, type BlogPostMeta } from '@/lib/blog';

export const metadata: Metadata = {
  title: { absolute: 'Volodymyr Vreshch - Software Engineer' },
  description:
    'Senior Software Engineer at Microsoft with 10+ years of experience. I write about AI agents, MCP, and how AI should remember.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Volodymyr Vreshch - Software Engineer',
    description:
      'Senior Software Engineer at Microsoft with 10+ years of experience. I write about AI agents, MCP, and how AI should remember.',
    url: '/',
    siteName: 'Volodymyr Vreshch',
  },
};

function WritingCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card hover="lift" padding="none" className="flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-alt dark:bg-dark-surface-alt">
          {post.coverUrl ? (
            <Image
              src={post.thumbnailUrl ?? post.coverUrl}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-surface to-surface-alt dark:from-dark-surface dark:to-dark-surface-alt" />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <time
            dateTime={post.date}
            className="mb-2 text-xs text-muted dark:text-dark-text-secondary"
          >
            {formatPostDate(post.date)}
          </time>
          <h3 className="mb-2 text-lg font-medium leading-snug text-heading dark:text-dark-text">
            {post.title}
          </h3>
          {post.description && (
            <p className="line-clamp-3 text-sm text-muted dark:text-dark-text-secondary">
              {post.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}

export default async function HomePage() {
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="pb-8 pt-10 md:pb-12 md:pt-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
            <div className="flex-1">
              <h1 className="mb-6 text-3xl font-medium leading-snug text-heading dark:text-dark-text md:text-5xl md:leading-tight">
                Building quality software that matters - for millions.
              </h1>
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted dark:text-dark-text-secondary md:text-xl">
                Senior Software Engineer at Microsoft with 10+ years of experience. Lately curious
                about AI agents, MCP, and how AI should remember - I write about it here.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover dark:bg-dark-accent dark:text-dark-bg dark:hover:bg-dark-accent-hover"
                >
                  Read my writing
                </Link>
                <Link
                  href="/contacts"
                  className="inline-block rounded-full bg-surface px-8 py-3.5 text-sm font-medium text-heading transition-colors hover:bg-surface-alt dark:bg-dark-surface-alt dark:text-dark-text dark:hover:bg-dark-surface"
                >
                  Get in touch
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/images/profile.jpeg"
                alt="Volodymyr Vreshch"
                width={280}
                height={280}
                className="rounded-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest writing */}
      {latestPosts.length > 0 && (
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-2xl font-medium text-heading dark:text-dark-text md:text-3xl">
                Latest writing
              </h2>
              <Link
                href="/blog"
                className="flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
              >
                All writing
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <WritingCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-2xl font-medium text-heading dark:text-dark-text md:text-3xl">
              Side projects &amp; open source
            </h2>
            <Link
              href="/projects"
              className="flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
            >
              See all projects
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {FEATURED_PROJECTS.map((project) => (
              <FeaturedProjectCard key={project.url} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Career Path */}
      <section className="pb-8 pt-4 md:pb-12 md:pt-6">
        <div className="mx-auto max-w-5xl px-6">
          <Card className="md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="mb-4 text-2xl font-medium text-heading dark:text-dark-text md:text-3xl">
                  Career Path
                </h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-muted dark:text-dark-text-secondary md:text-base">
                <p>
                  <span className="font-medium text-heading dark:text-dark-text">
                    Senior Software Engineer, Microsoft
                  </span>{' '}
                  (2021 - present).
                </p>
                <p>
                  <span className="font-medium text-heading dark:text-dark-text">
                    Lead Software Engineer, EPAM Systems
                  </span>{' '}
                  (2016 - 2021). TypeScript, React, Angular, Node, Cloud.
                </p>
                <p>
                  Earlier: Software Engineer at GlobalLogic, and academic research - Ph.D. in
                  Inorganic Chemistry (Kyiv) with post-docs in the USA and France.
                </p>
                <p>
                  <Link
                    href="/interests"
                    className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
                  >
                    More about me
                    <span aria-hidden>&rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
