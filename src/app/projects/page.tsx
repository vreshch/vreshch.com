import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Projects',
};

const libraries = [
  {
    name: '@chemistry/crystallography.io',
    url: 'https://github.com/chemistry/crystallography.io',
    description: 'Alternative web interface for COD database website',
    link: { label: 'crystallography.io', href: 'https://crystallography.io/' },
  },
  {
    name: '@chemistry/crystalview',
    url: 'https://github.com/chemistry/crystalview',
    description: 'Simple molecular viewer for crystal structures',
  },
  {
    name: '@chemistry/molpad',
    url: 'https://github.com/chemistry/molpad',
    description: 'Molecule editor used to draw molecule for search',
  },
  {
    name: '@chemistry/(math, elements, spacegroups)',
    url: 'https://github.com/chemistry/chemical-libraries',
    description:
      'Set of common functionality / chemical constants that support creation of software for chemistry',
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Active projects and open source chemistry libraries."
      />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        {/* Active Projects */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Active Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <a href="https://crystallography.io" target="_blank" rel="noreferrer">
              <Card hover="lift" padding="none" className="overflow-hidden">
                <Image
                  src="/images/crystallography_online.jpg"
                  width={397}
                  height={284}
                  className="h-auto w-full"
                  alt="crystallography.io"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">
                    crystallography.io
                  </h3>
                  <p className="text-sm text-muted dark:text-dark-text-secondary">
                    Crystal Structure Search Application
                  </p>
                </div>
              </Card>
            </a>
            <a href="https://diffractwd.com" target="_blank" rel="noreferrer">
              <Card hover="lift" padding="none" className="overflow-hidden">
                <Image
                  src="/images/diffractwd.jpg"
                  width={397}
                  height={284}
                  className="h-auto w-full"
                  alt="diffractwd.com"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">
                    diffractwd.com
                  </h3>
                  <p className="text-sm text-muted dark:text-dark-text-secondary">
                    Free Powder Diffraction Software
                  </p>
                </div>
              </Card>
            </a>
          </div>
        </section>

        {/* Open Source Libraries */}
        <section>
          <h2 className="mb-4 text-2xl font-medium text-heading dark:text-dark-text">
            @chemistry
          </h2>
          <p className="mb-6 text-sm text-muted dark:text-dark-text-secondary md:text-base">
            Open source projects related to Chemistry &amp; Crystallography, released on{' '}
            <a
              href="https://github.com/chemistry"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-heading underline decoration-border underline-offset-4 transition-colors hover:decoration-heading dark:text-dark-text dark:decoration-dark-border dark:hover:decoration-dark-text"
            >
              GitHub
            </a>{' '}
            under MIT license.
          </p>
          <div className="space-y-3">
            {libraries.map((lib) => (
              <Card key={lib.name} hover="lift">
                <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">
                  <a
                    href={lib.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-border underline-offset-4 transition-colors hover:decoration-heading dark:decoration-dark-border dark:hover:decoration-dark-text"
                  >
                    {lib.name}
                  </a>
                </h3>
                <p className="text-sm text-muted dark:text-dark-text-secondary">
                  {lib.description}
                  {lib.link && (
                    <>
                      {' — '}
                      <a
                        href={lib.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-heading underline decoration-border underline-offset-4 transition-colors hover:decoration-heading dark:text-dark-text dark:decoration-dark-border dark:hover:decoration-dark-text"
                      >
                        {lib.link.label}
                      </a>
                    </>
                  )}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
