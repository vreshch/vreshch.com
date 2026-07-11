import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { DemoCard } from '@/components/demo-card';
import { MolPadDemo } from '@/components/molpad-demo';
import { CrystalViewDemo } from '@/components/crystalview-demo';
import { FeaturedProjectCard } from '@/components/featured-project-card';
import { FEATURED_PROJECTS } from '@/lib/featured-projects';
import { AI_PROJECTS, CHEMISTRY_LIBRARIES, type ProjectLink } from '@/lib/projects-data';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Open source and side projects by Volodymyr Vreshch: the Agentage Memory ecosystem, the MCP directory, crystallography.io, and chemistry tools with interactive demos.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects',
    description:
      'The Agentage Memory ecosystem, the MCP directory, crystallography.io, and chemistry tools with interactive demos.',
    url: '/projects',
    siteName: 'Volodymyr Vreshch',
  },
};

const linkClass =
  'font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover';

function ProjectRow({ project }: { project: ProjectLink }) {
  return (
    <Card hover="lift" padding="compact">
      <h3 className="mb-1 text-base font-medium text-heading dark:text-dark-text">
        <a href={project.url} target="_blank" rel="noreferrer" className={linkClass}>
          {project.name}
        </a>
      </h3>
      <p className="text-sm text-muted dark:text-dark-text-secondary">{project.description}</p>
    </Card>
  );
}

function SiteCard({
  href,
  image,
  title,
  subtitle,
}: {
  href: string;
  image: string;
  title: string;
  subtitle: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Card hover="lift" padding="none" className="overflow-hidden">
        <div className="bg-gradient-to-b from-[#1e2e47] to-[#0c0f16] p-4">
          <Image
            src={image}
            width={1360}
            height={967}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-auto w-full"
            alt={title}
          />
        </div>
        <div className="p-6">
          <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">{title}</h3>
          <p className="text-sm text-muted dark:text-dark-text-secondary">{subtitle}</p>
        </div>
      </Card>
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="A catalog of my open source and side projects, grouped by area."
      />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Main projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {FEATURED_PROJECTS.map((project) => (
              <FeaturedProjectCard key={project.url} project={project} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-medium text-heading dark:text-dark-text">
            AI &amp; MCP (open source)
          </h2>
          <p className="mb-6 text-sm text-muted dark:text-dark-text-secondary md:text-base">
            Work around Agentage Memory - the shared memory layer for every AI - released on{' '}
            <a
              href="https://github.com/agentage"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              GitHub
            </a>{' '}
            under MIT license.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {AI_PROJECTS.map((project) => (
              <ProjectRow key={project.url} project={project} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Chemistry &amp; science tools
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <SiteCard
              href="https://crystallography.io"
              image="/mockups/crystallography-io.webp"
              title="crystallography.io"
              subtitle="Search over 80k+ structures from the Crystallography Open Database"
            />
            <SiteCard
              href="https://diffractwd.com"
              image="/mockups/diffractwd-com.webp"
              title="diffractwd.com"
              subtitle="Free powder diffraction software"
            />
          </div>
          <p className="mb-6 mt-4 text-sm text-muted dark:text-dark-text-secondary md:text-base">
            diffractwd is described in{' '}
            <a
              href="https://doi.org/10.1107/S0021889811035090"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              J. Appl. Crystallogr. (2011)
            </a>
            .
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <DemoCard
              title="MolPad"
              description="Draw and edit molecular structures"
              sourceUrl="https://github.com/chemistry/molpad"
            >
              <MolPadDemo />
            </DemoCard>
            <DemoCard
              title="CrystalView"
              description="3D crystal structure visualization"
              sourceUrl="https://github.com/chemistry/crystalview"
              bordered
            >
              <CrystalViewDemo />
            </DemoCard>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-medium text-heading dark:text-dark-text">
            Libraries &amp; other
          </h2>
          <p className="mb-6 text-sm text-muted dark:text-dark-text-secondary md:text-base">
            Open source packages published under the{' '}
            <a
              href="https://github.com/chemistry"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              @chemistry
            </a>{' '}
            npm scope.
          </p>
          <ul className="space-y-2 text-sm text-muted dark:text-dark-text-secondary">
            {CHEMISTRY_LIBRARIES.map((lib) => (
              <li key={lib.name} className="flex items-baseline gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted/50 dark:bg-dark-text-secondary/50" />
                <span>
                  <a href={lib.url} target="_blank" rel="noreferrer" className={linkClass}>
                    {lib.name}
                  </a>
                  {' - '}
                  {lib.description}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
