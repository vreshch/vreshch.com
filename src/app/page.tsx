import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/card';

export const metadata: Metadata = {
  title: 'Volodymyr Vreshch - Home',
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Volodymyr Vreshch
          </h1>
          <p className="mb-2 text-lg font-medium text-white/90">
            Senior Software Engineer @ Microsoft
          </p>
          <p className="mb-10 max-w-lg text-base leading-relaxed text-white/70">
            Full-stack developer with 10+ years of experience building enterprise products.
            Background in chemistry, crystallography, and cheminformatics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/cv"
              className="inline-block rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-md transition-all hover:bg-white/90 hover:shadow-lg"
            >
              View CV
            </Link>
            <Link
              href="/contacts"
              className="inline-block rounded-lg border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Career */}
      <section className="py-16 dark:bg-dark-bg md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-heading dark:text-dark-text">
            Career Path
          </h2>
          <div className="space-y-4">
            <Card hover="lift">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted dark:text-dark-text-secondary">
                2021 — Present
              </div>
              <h3 className="mb-1 text-base font-semibold text-heading dark:text-dark-text">
                Senior Software Engineer, Microsoft
              </h3>
              <p className="text-sm text-muted dark:text-dark-text-secondary">Frontend Developer</p>
            </Card>
            <Card hover="lift">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted dark:text-dark-text-secondary">
                2016 — 2021
              </div>
              <h3 className="mb-1 text-base font-semibold text-heading dark:text-dark-text">
                Lead Software Engineer, EPAM Systems
              </h3>
              <p className="text-sm text-muted dark:text-dark-text-secondary">
                TypeScript, React, Angular 2+, NodeJS, Cloud
              </p>
            </Card>
            <Card hover="lift">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted dark:text-dark-text-secondary">
                2015 — 2016
              </div>
              <h3 className="mb-1 text-base font-semibold text-heading dark:text-dark-text">
                Software Engineer, GlobalLogic
              </h3>
              <p className="text-sm text-muted dark:text-dark-text-secondary">
                JavaScript, Backbone, LESS, HTML, NodeJS
              </p>
            </Card>
            <Card hover="lift">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted dark:text-dark-text-secondary">
                2008 — 2012
              </div>
              <h3 className="mb-1 text-base font-semibold text-heading dark:text-dark-text">
                Academic Research
              </h3>
              <p className="text-sm text-muted dark:text-dark-text-secondary">
                Post-Doc: USA (Albany, NY), France (Rennes 1, Toulouse). Ph.D. in Inorganic
                Chemistry, Kyiv, Ukraine (2008)
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="border-y border-border bg-surface py-16 dark:border-dark-border dark:bg-dark-surface md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-heading dark:text-dark-text">
            Supported Projects
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <a href="https://crystallography.io/" target="_blank" rel="noreferrer">
              <Card hover="border" className="group">
                <h3 className="mb-2 text-base font-semibold text-heading dark:text-dark-text">
                  crystallography.io
                </h3>
                <p className="text-sm text-muted dark:text-dark-text-secondary">
                  Crystal Structure Search Application — search and analyze structures from the COD
                  database
                </p>
              </Card>
            </a>
            <a href="https://diffractwd.com/" target="_blank" rel="noreferrer">
              <Card hover="border" className="group">
                <h3 className="mb-2 text-base font-semibold text-heading dark:text-dark-text">
                  diffractwd.com
                </h3>
                <p className="text-sm text-muted dark:text-dark-text-secondary">
                  Free open-source software for powder diffraction pattern manipulation, simulation,
                  and visualization
                </p>
              </Card>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
