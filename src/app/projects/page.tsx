import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { MolPadDemo } from '@/components/molpad-demo';
import { CrystalViewDemo } from '@/components/crystalview-demo';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Projects by Volodymyr Vreshch: Agentage Memory and its open source ecosystem, mcpxhub.io, crystallography.io, plus chemistry tools and interactive demos.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects',
    description:
      'Agentage Memory and its open source ecosystem, mcpxhub.io, crystallography.io, plus chemistry tools and interactive demos.',
    url: '/projects',
    siteName: 'Volodymyr Vreshch',
  },
};

const libraries = [
  {
    name: '@chemistry/crystallography.io',
    url: 'https://github.com/chemistry/crystallography.io',
    description: 'Web interface for COD database',
  },
  {
    name: '@chemistry/crystalview',
    url: 'https://github.com/chemistry/crystalview',
    description: 'Molecular viewer for crystal structures',
  },
  {
    name: '@chemistry/molpad',
    url: 'https://github.com/chemistry/molpad',
    description: 'Molecule editor component',
  },
  {
    name: '@chemistry/chemical-libraries',
    url: 'https://github.com/chemistry/chemical-libraries',
    description: 'Math, elements, and space group utilities',
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Active projects, AI tools, and open source libraries."
      />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">Featured</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <a href="https://agentage.io" target="_blank" rel="noreferrer">
              <Card hover="lift" padding="none" className="overflow-hidden">
                <div className="bg-gradient-to-b from-[#1e2e47] to-[#0c0f16] p-4">
                  <Image
                    src="/mockups/agentage-io.png"
                    width={1360}
                    height={967}
                    className="h-auto w-full"
                    alt="Agentage Memory"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">
                    Agentage Memory
                  </h3>
                  <p className="text-sm text-muted dark:text-dark-text-secondary">
                    One memory, every AI, owned by you - a shared markdown memory every tool reads
                    and writes through one MCP endpoint.
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
        </section>

        {/* Agentage Ecosystem */}
        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-medium text-heading dark:text-dark-text">
            Agentage Ecosystem
          </h2>
          <p className="mb-6 text-sm text-muted dark:text-dark-text-secondary md:text-base">
            Open source tools around Agentage Memory - the shared memory layer for every AI -
            released on{' '}
            <a
              href="https://github.com/agentage"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
            >
              GitHub
            </a>{' '}
            under MIT license.
          </p>
          <div className="space-y-3">
            {[
              {
                name: '@agentage/cli',
                url: 'https://github.com/agentage/cli',
                description:
                  'Command-line client for Agentage Memory - connect, search, and manage your memory from the terminal',
              },
              {
                name: 'agentage/obsidian-sync',
                url: 'https://github.com/agentage/obsidian-sync',
                description:
                  'Obsidian plugin - two-way sync your vault to a memory every AI can read and write',
              },
              {
                name: 'agentage/obsidian-galaxy',
                url: 'https://github.com/agentage/obsidian-galaxy',
                description: 'Obsidian plugin - render your vault as a 3D, rotating force-graph',
              },
              {
                name: 'agentage/vscode-agentage',
                url: 'https://github.com/agentage/vscode-agentage',
                description: 'VS Code extension - connect your editor to your memory over MCP',
              },
              {
                name: 'agentage/server-memory',
                url: 'https://github.com/agentage/server-memory',
                description: 'The MCP server behind memory.agentage.io - git-backed markdown store',
              },
            ].map((pkg) => (
              <Card key={pkg.name} hover="lift">
                <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">
                  <a
                    href={pkg.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
                  >
                    {pkg.name}
                  </a>
                </h3>
                <p className="text-sm text-muted dark:text-dark-text-secondary">
                  {pkg.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Other Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <a href="https://crystallography.io" target="_blank" rel="noreferrer">
              <Card hover="lift" padding="none" className="overflow-hidden">
                <div className="bg-gradient-to-b from-[#1e2e47] to-[#0c0f16] p-4">
                  <Image
                    src="/mockups/crystallography-io.png"
                    width={1400}
                    height={1007}
                    className="h-auto w-full"
                    alt="crystallography.io"
                  />
                </div>
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
                <div className="bg-gradient-to-b from-[#1e2e47] to-[#0c0f16] p-4">
                  <Image
                    src="/mockups/diffractwd-com.png"
                    width={1400}
                    height={1007}
                    className="h-auto w-full"
                    alt="diffractwd.com"
                  />
                </div>
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

        {/* Interactive Demos */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-medium text-heading dark:text-dark-text">
            Interactive Demos
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card padding="none" className="overflow-hidden">
              <div className="aspect-square bg-white">
                <MolPadDemo />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">
                  MolPad
                </h3>
                <p className="text-sm text-muted dark:text-dark-text-secondary">
                  Draw and edit molecular structures —{' '}
                  <a
                    href="https://github.com/chemistry/molpad"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
                  >
                    source
                  </a>
                </p>
              </div>
            </Card>
            <Card
              padding="none"
              className="overflow-hidden border border-border dark:border-dark-border"
            >
              <div className="aspect-square">
                <CrystalViewDemo />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">
                  CrystalView
                </h3>
                <p className="text-sm text-muted dark:text-dark-text-secondary">
                  3D crystal structure visualization —{' '}
                  <a
                    href="https://github.com/chemistry/crystalview"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
                  >
                    source
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Open Source Libraries */}
        <section>
          <h2 className="mb-4 text-2xl font-medium text-heading dark:text-dark-text">
            Open Source Libraries
          </h2>
          <ul className="space-y-2 text-sm text-muted dark:text-dark-text-secondary">
            {libraries.map((lib) => (
              <li key={lib.name} className="flex items-baseline gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted/50 dark:bg-dark-text-secondary/50" />
                <span>
                  <a
                    href={lib.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
                  >
                    {lib.name}
                  </a>
                  {' — '}
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
