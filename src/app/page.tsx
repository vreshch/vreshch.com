import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/card';

export const metadata: Metadata = {
  title: 'Volodymyr Vreshch - Home',
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="pb-8 pt-10 md:pb-12 md:pt-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
            <div className="flex-1">
              <h1 className="mb-6 text-3xl font-medium leading-snug text-heading dark:text-dark-text md:text-5xl md:leading-tight">
                Building quality software that matters — for millions.
              </h1>
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted dark:text-dark-text-secondary md:text-xl">
                Senior Software Engineer at Microsoft with 10+ years of experience. Passionate about
                empowering teams, optimizing development flows, and shipping impactful software.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/interests"
                  className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover dark:bg-dark-accent dark:text-dark-bg dark:hover:bg-dark-accent-hover"
                >
                  Learn more about me
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

      {/* About */}
      <section className="py-4 md:py-6">
        <div className="mx-auto max-w-5xl px-6">
          <Card className="md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="mb-4 text-2xl font-medium text-heading dark:text-dark-text md:text-3xl">
                  Career Path
                </h2>
              </div>
              <div className="space-y-6 text-sm leading-relaxed text-muted dark:text-dark-text-secondary md:text-base">
                <div>
                  <p className="font-medium text-heading dark:text-dark-text">
                    Senior Software Engineer, Microsoft
                  </p>
                  <p>2021 — Present. Frontend Developer.</p>
                </div>
                <div>
                  <p className="font-medium text-heading dark:text-dark-text">
                    Lead Software Engineer, EPAM Systems
                  </p>
                  <p>2016 — 2021. TypeScript, React, Angular 2+, NodeJS, Cloud.</p>
                </div>
                <div>
                  <p className="font-medium text-heading dark:text-dark-text">
                    Software Engineer, GlobalLogic
                  </p>
                  <p>2015 — 2016. JavaScript, Backbone, LESS, HTML, NodeJS.</p>
                </div>
                <div>
                  <p className="font-medium text-heading dark:text-dark-text">
                    Academic Research
                  </p>
                  <p>
                    2008 — 2012. Post-Doc in USA &amp; France. Ph.D. in Inorganic Chemistry, Kyiv,
                    Ukraine.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-4 pt-8 md:pb-6 md:pt-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="text-2xl font-medium text-heading dark:text-dark-text md:text-3xl">
              Projects
            </h2>
            <Link
              href="/projects"
              className="flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
            >
              See all projects
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <a href="https://github.com/agentage/desktop" target="_blank" rel="noreferrer">
              <Card hover="lift" padding="none" className="overflow-hidden">
                <Image
                  src="/images/agentage.jpg"
                  width={397}
                  height={284}
                  className="h-auto w-full"
                  alt="Agentage Desktop"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">
                    Agentage Desktop
                  </h3>
                  <p className="text-sm text-muted dark:text-dark-text-secondary">
                    AI agent orchestration platform — manage, execute, and distribute agents
                  </p>
                </div>
              </Card>
            </a>
            <a href="https://mcpxhub.io" target="_blank" rel="noreferrer">
              <Card hover="lift" padding="none" className="overflow-hidden">
                <div className="bg-gradient-to-b from-[#1e2e47] to-[#0c0f16] p-4">
                  <Image
                    src="/mockups/mcpxhub-io.png"
                    width={1400}
                    height={1007}
                    className="h-auto w-full"
                    alt="mcpxhub.io"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">
                    mcpxhub.io
                  </h3>
                  <p className="text-sm text-muted dark:text-dark-text-secondary">
                    MCP Catalog Platform — discover and manage Model Context Protocol servers
                  </p>
                </div>
              </Card>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
