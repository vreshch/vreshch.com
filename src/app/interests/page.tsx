import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { ExternalLink } from '@/components/interests/external-link';
import { FocusSection } from '@/components/interests/focus-section';
import { TimelineRow } from '@/components/interests/timeline-row';
import { TIMELINE, HOBBIES, INTERESTS, PROFILE_LINKS } from '@/lib/interests-data';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Interests',
  description:
    'Volodymyr Vreshch: platform engineer with a PhD, exploring AI agents, the Model Context Protocol, AI memory, and open source. Interests, track record, and links.',
  alternates: { canonical: '/interests' },
  openGraph: {
    title: 'Interests',
    description:
      'Platform engineer exploring AI agents, the Model Context Protocol, AI memory, and open source.',
    url: '/interests',
    siteName: 'Volodymyr Vreshch',
  },
};

export default async function InterestsPage() {
  const posts = await getAllPosts();
  const latest = posts.find((p) => p.thumbnailUrl ?? p.coverUrl);
  const writingCover = latest?.thumbnailUrl ?? latest?.coverUrl;

  return (
    <div>
      <PageHeader title="Interests" description="What I explore, build, and keep coming back to." />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        <section className="mb-10 flex max-w-3xl items-start gap-5">
          <Image
            src="/images/profile.jpeg"
            alt="Volodymyr Vreshch"
            width={72}
            height={72}
            className="hidden h-16 w-16 flex-shrink-0 rounded-full object-cover ring-1 ring-border/70 sm:block dark:ring-dark-border"
          />
          <p className="text-base leading-relaxed text-muted dark:text-dark-text-secondary md:text-lg">
            I&apos;m a platform engineer with a PhD, now a Senior Software Engineer at Microsoft.
            Lately I&apos;ve been exploring AI agents, the Model Context Protocol, and how AI should
            remember. Based in Prague.
          </p>
        </section>

        <section className="mb-16 max-w-3xl">
          <ul className="flex flex-wrap gap-2.5">
            {INTERESTS.map((interest) => (
              <li
                key={interest}
                className="rounded-full border border-border/70 bg-surface-alt px-3.5 py-1.5 text-sm text-muted dark:border-dark-border dark:bg-dark-surface-alt dark:text-dark-text-secondary"
              >
                {interest}
              </li>
            ))}
          </ul>
        </section>

        <FocusSection
          writingCover={
            writingCover
              ? {
                  src: writingCover,
                  alt: latest?.title ?? 'Latest essay',
                  width: 1200,
                  height: 630,
                }
              : undefined
          }
        />

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Track record
          </h2>
          <Card className="md:p-10">
            <div className="space-y-6">
              {TIMELINE.map((entry) => (
                <TimelineRow key={entry.role} entry={entry} />
              ))}
            </div>
          </Card>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Beyond the keyboard
          </h2>
          <ul className="space-y-3 text-sm leading-relaxed text-muted dark:text-dark-text-secondary md:text-base">
            {HOBBIES.map((hobby) => (
              <li key={hobby} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted/50 dark:bg-dark-text-secondary/50" />
                {hobby}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">Find me</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {PROFILE_LINKS.map((link) => (
              <ExternalLink key={link.href} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
