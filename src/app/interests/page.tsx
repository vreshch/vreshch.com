import type { Metadata } from 'next';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { ExternalLink } from '@/components/interests/external-link';
import { NowThreadCard } from '@/components/interests/now-thread-card';
import { TimelineRow } from '@/components/interests/timeline-row';
import { NOW_THREADS, TIMELINE, HOBBIES, PROFILE_LINKS } from '@/lib/interests-data';

export const metadata: Metadata = {
  title: 'Interests',
  description:
    'Volodymyr Vreshch: inorganic-chemistry PhD turned platform engineer. Currently exploring AI agents, MCP, and how AI should remember. Track record, open-source work, and links.',
  alternates: { canonical: '/interests' },
  openGraph: {
    title: 'Interests',
    description:
      'Inorganic-chemistry PhD turned platform engineer. Exploring AI agents, MCP, and how AI should remember.',
    url: '/interests',
    siteName: 'Volodymyr Vreshch',
  },
};

export default function InterestsPage() {
  return (
    <div>
      <PageHeader title="About" description="A little more about me, my work, and what I explore." />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        <section className="mb-16 max-w-3xl">
          <p className="text-base leading-relaxed text-muted dark:text-dark-text-secondary md:text-lg">
            I&apos;m an inorganic-chemistry PhD turned platform engineer, now a Senior Software
            Engineer at Microsoft. Lately I&apos;ve been exploring AI agents, the Model Context
            Protocol, and how AI should remember. Based in Prague.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">Now</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {NOW_THREADS.map((thread) => (
              <NowThreadCard key={thread.title} thread={thread} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Track record
          </h2>
          <Card className="md:p-10">
            <div className="space-y-8">
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
