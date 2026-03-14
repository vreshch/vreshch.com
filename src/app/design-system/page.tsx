import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card } from '@/components/card';

export const metadata: Metadata = {
  title: 'Design System',
};

const isDev = process.env.NODE_ENV === 'development';

/* ─── Icons ─── */

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ─── Layout Helpers ─── */

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 dark:bg-dark-bg">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10">
          <h2 className="mb-2 text-2xl font-bold text-heading dark:text-dark-text">{title}</h2>
          <p className="text-sm text-muted dark:text-dark-text-secondary">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function ShowcaseBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-surface p-8 dark:bg-dark-surface">
      <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted dark:text-dark-text-secondary">
        {label}
      </p>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function DarkBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-8">
      <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}
      </p>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>;
}

/* ─── Colors ─── */

function ColorsSection() {
  const colors = [
    { name: 'Accent', light: '#f59e0b', dark: '#f5a623', variable: '--color-accent' },
    { name: 'Accent Hover', light: '#d97706', dark: '#d97706', variable: '--color-accent-hover' },
    { name: 'Primary', light: '#1e3a5f', dark: '—', variable: '--color-primary' },
    { name: 'Surface', light: '#eef2f7', dark: '#2e3039', variable: '--color-surface / --color-dark-surface' },
    { name: 'Heading', light: '#1e3a5f', dark: '#ffffff', variable: '--color-heading / --color-dark-text' },
    { name: 'Body', light: '#374a60', dark: '#a9adc1', variable: '--color-body / --color-dark-text-secondary' },
    { name: 'Muted', light: '#5a6d82', dark: '#a9adc1', variable: '--color-muted' },
    { name: 'Border', light: '#c2cdd9', dark: '#3a3d4a', variable: '--color-border / --color-dark-border' },
  ];

  return (
    <Section id="colors" title="Colors" subtitle="Semantic color tokens defined in globals.css via @theme">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {colors.map((c) => (
          <div key={c.name} className="rounded-2xl bg-surface p-4 dark:bg-dark-surface">
            <div className="mb-3 flex gap-2">
              <div className="h-10 w-10 rounded-lg" style={{ backgroundColor: c.light }} />
              {c.dark !== '—' && <div className="h-10 w-10 rounded-lg border border-border/30 dark:border-dark-border" style={{ backgroundColor: c.dark }} />}
            </div>
            <p className="text-sm font-medium text-heading dark:text-dark-text">{c.name}</p>
            <p className="mt-0.5 text-xs text-muted dark:text-dark-text-secondary">{c.light}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Typography ─── */

function TypographySection() {
  return (
    <Section id="typography" title="Typography" subtitle="Headings, body text, labels, and links">
      <ShowcaseBox label="Headings & Text">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-medium text-heading dark:text-dark-text md:text-5xl md:leading-tight">Page Heading h1</h1>
          </div>
          <div>
            <h2 className="text-2xl font-medium text-heading dark:text-dark-text md:text-3xl">Section Heading h2</h2>
          </div>
          <div>
            <h3 className="text-lg font-medium text-heading dark:text-dark-text">Card Title h3</h3>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted dark:text-dark-text-secondary">
              Body text — used for descriptions, paragraphs, and general content throughout the site.
            </p>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-muted dark:text-dark-text-secondary">
              Small body text — used for secondary descriptions and supporting content.
            </p>
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-muted dark:text-dark-text-secondary">
              Uppercase Label
            </span>
          </div>
        </div>
      </ShowcaseBox>
    </Section>
  );
}

/* ─── Buttons ─── */

function ButtonsSection() {
  return (
    <Section id="buttons" title="Buttons" subtitle="Primary and secondary actions with pill shape">
      <div className="grid gap-6 md:grid-cols-2">
        <ShowcaseBox label="On Surface">
          <Row>
            <button type="button" className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover dark:bg-dark-accent dark:text-dark-bg dark:hover:bg-dark-accent-hover">
              Primary Action
            </button>
          </Row>
          <Row>
            <button type="button" className="inline-block rounded-full bg-surface-alt px-8 py-3.5 text-sm font-medium text-heading transition-colors hover:bg-surface-hover dark:bg-dark-surface-alt dark:text-dark-text dark:hover:bg-dark-surface">
              Secondary Action
            </button>
          </Row>
          <Row>
            <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover">
              Text Link
              <ArrowIcon />
            </button>
          </Row>
        </ShowcaseBox>
        <DarkBox label="On Dark Background">
          <Row>
            <button type="button" className="inline-block rounded-full bg-white px-8 py-3.5 text-sm font-medium text-primary shadow-md transition-all hover:bg-white/90 hover:shadow-lg">
              Primary on Dark
            </button>
          </Row>
          <Row>
            <button type="button" className="inline-block rounded-full border-2 border-white px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-primary">
              Secondary on Dark
            </button>
          </Row>
        </DarkBox>
      </div>
    </Section>
  );
}

/* ─── Badges ─── */

function BadgesSection() {
  return (
    <Section id="badges" title="Badges & Pills" subtitle="Status indicators, labels, and tags">
      <div className="grid gap-6 md:grid-cols-2">
        <ShowcaseBox label="On Surface">
          <Row>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent dark:bg-dark-accent/10 dark:text-dark-accent">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Active Status
            </span>
            <span className="inline-block rounded-full bg-accent px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">New</span>
          </Row>
          <Row>
            <span className="inline-block rounded-md bg-accent/12 px-2.5 py-0.5 text-xs font-semibold text-accent dark:bg-dark-accent/10 dark:text-dark-accent">v6.0</span>
            <span className="inline-block rounded-md bg-surface-alt px-2.5 py-0.5 text-xs font-semibold text-muted dark:bg-dark-surface-alt dark:text-dark-text-secondary">v5.0</span>
            <span className="inline-block rounded-md bg-surface-alt px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted dark:bg-dark-surface-alt dark:text-dark-text-secondary">React</span>
            <span className="inline-block rounded-md bg-surface-alt px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted dark:bg-dark-surface-alt dark:text-dark-text-secondary">Next.js</span>
          </Row>
        </ShowcaseBox>
        <DarkBox label="On Dark Background">
          <Row>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open Source
            </span>
          </Row>
          <Row>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              MIT License
            </span>
          </Row>
        </DarkBox>
      </div>
    </Section>
  );
}

/* ─── Cards ─── */

function CardsSection() {
  return (
    <Section id="cards" title="Cards" subtitle="Borderless cards with surface background and hover variants">
      <div className="grid gap-6 md:grid-cols-3">
        <Card hover="lift">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent dark:bg-dark-accent/10 dark:text-dark-accent">
            <StarIcon />
          </div>
          <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">Lift Card</h3>
          <p className="text-sm leading-relaxed text-muted dark:text-dark-text-secondary">Hover to see the lift effect with shadow transition.</p>
        </Card>
        <Card hover="border">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent dark:bg-dark-accent/10 dark:text-dark-accent">
            <CheckIcon />
          </div>
          <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">Border Card</h3>
          <p className="text-sm leading-relaxed text-muted dark:text-dark-text-secondary">Hover to see the accent border highlight.</p>
        </Card>
        <Card>
          <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">Static Card</h3>
          <ul className="mt-3 space-y-2 text-sm text-body dark:text-dark-text">
            <li className="flex items-center gap-2"><span className="text-accent dark:text-dark-accent">&#8226;</span>Bullet item one</li>
            <li className="flex items-center gap-2"><span className="text-accent dark:text-dark-accent">&#8226;</span>Bullet item two</li>
            <li className="flex items-center gap-2"><span className="text-accent dark:text-dark-accent">&#8226;</span>Bullet item three</li>
          </ul>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card padding="none" hover="lift" className="overflow-hidden">
          <div className="h-32 bg-surface dark:bg-dark-surface-alt" />
          <div className="p-6">
            <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">Image Card</h3>
            <p className="text-sm text-muted dark:text-dark-text-secondary">Card with no padding for image content.</p>
          </div>
        </Card>
        <Card padding="compact">
          <h3 className="mb-1 text-base font-medium text-heading dark:text-dark-text">Compact Card</h3>
          <p className="text-sm text-muted dark:text-dark-text-secondary">Tighter padding for dense layouts.</p>
        </Card>
      </div>
    </Section>
  );
}

/* ─── Icon Containers ─── */

function IconsSection() {
  return (
    <Section id="icons" title="Icon Containers" subtitle="Accent-tinted background containers at three sizes">
      <ShowcaseBox label="Sizes">
        <Row>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent dark:bg-dark-accent/10 dark:text-dark-accent"><CheckIcon /></div>
              <p className="mt-2 text-xs text-muted dark:text-dark-text-secondary">32px</p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent dark:bg-dark-accent/10 dark:text-dark-accent"><CheckIcon /></div>
              <p className="mt-2 text-xs text-muted dark:text-dark-text-secondary">40px</p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent dark:bg-dark-accent/10 dark:text-dark-accent"><CheckIcon /></div>
              <p className="mt-2 text-xs text-muted dark:text-dark-text-secondary">48px</p>
            </div>
          </div>
        </Row>
      </ShowcaseBox>
    </Section>
  );
}

/* ─── Links ─── */

function LinksSection() {
  return (
    <Section id="links" title="Links" subtitle="Inline links and links with icons">
      <div className="grid gap-6 md:grid-cols-2">
        <ShowcaseBox label="On Surface">
          <Row>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover">
              <ExternalLinkIcon />
              External link with icon
            </a>
          </Row>
          <Row>
            <span className="text-sm text-muted dark:text-dark-text-secondary">
              Inline text with a <a href="#" className="font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover">linked phrase</a> inside it.
            </span>
          </Row>
          <Row>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover">
              See all projects
              <ArrowIcon />
            </a>
          </Row>
        </ShowcaseBox>
        <DarkBox label="On Dark Background">
          <Row>
            <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white hover:underline">
              <ExternalLinkIcon />
              Link on dark
            </a>
          </Row>
        </DarkBox>
      </div>
    </Section>
  );
}

/* ─── Navigation ─── */

function NavigationSection() {
  return (
    <Section id="navigation" title="Navigation" subtitle="Sticky top nav with active indicator and mobile hamburger">
      <ShowcaseBox label="Nav Items">
        <div className="flex items-center gap-2">
          <div className="rounded-full px-4 py-2 text-sm font-medium text-heading dark:text-dark-text">
            Home
            <span className="mt-0.5 block h-[2px] rounded-full bg-accent dark:bg-dark-accent" />
          </div>
          <div className="rounded-full px-4 py-2 text-sm font-medium text-muted dark:text-dark-text-secondary">
            Interests
          </div>
          <div className="rounded-full px-4 py-2 text-sm font-medium text-muted dark:text-dark-text-secondary">
            Projects
          </div>
          <div className="rounded-full px-4 py-2 text-sm font-medium text-muted dark:text-dark-text-secondary">
            Contacts
          </div>
        </div>
      </ShowcaseBox>
    </Section>
  );
}

/* ─── Spacing ─── */

function SpacingSection() {
  return (
    <Section id="spacing" title="Spacing & Layout" subtitle="Container widths, gaps, and padding patterns">
      <ShowcaseBox label="Patterns">
        <div className="space-y-4 text-sm text-muted dark:text-dark-text-secondary">
          <div className="flex items-baseline gap-4">
            <span className="w-32 flex-shrink-0 text-xs font-medium uppercase tracking-widest">Container</span>
            <code className="rounded bg-surface-alt px-2 py-0.5 text-xs dark:bg-dark-surface-alt">mx-auto max-w-5xl px-6</code>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-32 flex-shrink-0 text-xs font-medium uppercase tracking-widest">Section</span>
            <code className="rounded bg-surface-alt px-2 py-0.5 text-xs dark:bg-dark-surface-alt">py-16 md:py-24</code>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-32 flex-shrink-0 text-xs font-medium uppercase tracking-widest">Grid</span>
            <code className="rounded bg-surface-alt px-2 py-0.5 text-xs dark:bg-dark-surface-alt">grid gap-6 md:grid-cols-2</code>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-32 flex-shrink-0 text-xs font-medium uppercase tracking-widest">Card Radius</span>
            <code className="rounded bg-surface-alt px-2 py-0.5 text-xs dark:bg-dark-surface-alt">rounded-2xl</code>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-32 flex-shrink-0 text-xs font-medium uppercase tracking-widest">Pill Radius</span>
            <code className="rounded bg-surface-alt px-2 py-0.5 text-xs dark:bg-dark-surface-alt">rounded-full</code>
          </div>
        </div>
      </ShowcaseBox>
    </Section>
  );
}

/* ─── Page ─── */

export default function DesignSystemPage() {
  if (!isDev) notFound();

  return (
    <div>
      {/* Header */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-3 text-3xl font-medium text-heading dark:text-dark-text">
            Design System
          </h1>
          <p className="text-base text-muted dark:text-dark-text-secondary">
            Common UI patterns used across vreshch.com. Toggle dark/light mode to compare.
          </p>
        </div>
      </section>

      <ColorsSection />
      <div className="mx-auto max-w-5xl border-t border-border/30 dark:border-dark-border" />
      <TypographySection />
      <div className="mx-auto max-w-5xl border-t border-border/30 dark:border-dark-border" />
      <ButtonsSection />
      <div className="mx-auto max-w-5xl border-t border-border/30 dark:border-dark-border" />
      <BadgesSection />
      <div className="mx-auto max-w-5xl border-t border-border/30 dark:border-dark-border" />
      <CardsSection />
      <div className="mx-auto max-w-5xl border-t border-border/30 dark:border-dark-border" />
      <IconsSection />
      <div className="mx-auto max-w-5xl border-t border-border/30 dark:border-dark-border" />
      <LinksSection />
      <div className="mx-auto max-w-5xl border-t border-border/30 dark:border-dark-border" />
      <NavigationSection />
      <div className="mx-auto max-w-5xl border-t border-border/30 dark:border-dark-border" />
      <SpacingSection />
    </div>
  );
}
