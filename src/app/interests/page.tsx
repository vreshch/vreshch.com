import type { Metadata } from 'next';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Interests',
};

export default function InterestsPage() {
  return (
    <div>
      <PageHeader
        title="Interests"
        description="What I focus on, what I build, and what drives me."
      />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        {/* Areas of Interest */}
        <section className="mb-16">
          <Card>
            <h2 className="mb-6 text-xl font-medium text-heading dark:text-dark-text">
              Areas of Interest
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-muted dark:text-dark-text-secondary md:text-base">
              {[
                'AI Agents, LLMs, and agent orchestration platforms',
                'Model Context Protocol (MCP) and tool ecosystems for AI',
                'Full-stack web development: React, Next.js, Node.js, TypeScript',
                'Developer experience, engineering productivity, and development flow optimization',
                'Infrastructure as Code, CI/CD pipelines, and cloud architecture',
                'Open-source software and building tools that serve millions',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted/50 dark:bg-dark-text-secondary/50" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Tech Stack
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-muted dark:text-dark-text-secondary md:text-base">
            10+ years building enterprise products with millions of users — from frontend
            interfaces to backend services, infrastructure, and AI-powered tooling.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'AI Agents, MCP, LLM Orchestration',
              'OpenAI, Anthropic, Google AI',
              'TypeScript, C#, Python',
              'React, Next.js, Vite',
              'Node.js, Express, MongoDB',
              'Electron, React Native, Expo',
              'Azure, Google Cloud, AWS',
              'Docker, Terraform, CI/CD',
              'Supabase, CosmosDB, Redis',
              'Tailwind CSS, Radix UI',
              'TDD, Playwright, Jest',
              'Git, GitHub Actions, Traefik',
            ].map((skill) => (
              <Card key={skill} padding="compact">
                <p className="text-sm font-medium text-heading dark:text-dark-text">{skill}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* What I'm Building */}
        <section>
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            What I&apos;m Building
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">
                AI Agent Platform
              </h3>
              <p className="text-sm leading-relaxed text-muted dark:text-dark-text-secondary">
                Building an orchestration platform for AI agents — manage, execute, and distribute
                agents across desktop, web, mobile, and CLI.
              </p>
            </Card>
            <Card>
              <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">
                MCP Catalog
              </h3>
              <p className="text-sm leading-relaxed text-muted dark:text-dark-text-secondary">
                Central hub for discovering and cataloging Model Context Protocol servers — helping
                developers find the right tools for their AI workflows.
              </p>
            </Card>
            <Card>
              <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">
                Enterprise at Microsoft
              </h3>
              <p className="text-sm leading-relaxed text-muted dark:text-dark-text-secondary">
                Leading frontend development on products used by millions. Focused on engineering
                productivity, team enablement, and shipping at scale.
              </p>
            </Card>
            <Card>
              <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">
                Open Source
              </h3>
              <p className="text-sm leading-relaxed text-muted dark:text-dark-text-secondary">
                Maintaining open-source libraries and tools — from crystal structure search
                applications to developer utilities and infrastructure automation.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
