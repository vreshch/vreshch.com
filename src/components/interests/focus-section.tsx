import { NowThreadCard } from './now-thread-card';
import { FocusStats } from './focus-stats';
import { ScrollReveal } from './scroll-reveal';
import { NOW_THREADS, FOCUS_STATS } from '@/lib/interests-data';

type Cover = { src: string; alt: string; width: number; height: number };

export function FocusSection({ writingCover }: { writingCover?: Cover }) {
  const [aiMemory, mcp, writing] = NOW_THREADS;

  return (
    <section className="mb-20 md:mb-28">
      <ScrollReveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent dark:text-dark-accent">
          Current focus / AI
        </p>
        <h2 className="max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight text-heading dark:text-dark-text md:text-5xl">
          Building the memory and plumbing that lets{' '}
          <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent dark:from-dark-accent dark:to-primary-light">
            AI actually remember
          </span>
          .
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted dark:text-dark-text-secondary md:text-lg">
          Three open threads, all pointed at the same idea: AI you can extend, inspect, and own.
        </p>
      </ScrollReveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <ScrollReveal className="md:row-span-2">
          <NowThreadCard thread={aiMemory} featured />
        </ScrollReveal>
        <ScrollReveal delayMs={80}>
          <NowThreadCard thread={mcp} featured />
        </ScrollReveal>
        <ScrollReveal delayMs={160}>
          <NowThreadCard thread={writing} coverImage={writingCover} />
        </ScrollReveal>
      </div>

      <ScrollReveal delayMs={80} className="mt-10">
        <FocusStats stats={FOCUS_STATS} />
      </ScrollReveal>
    </section>
  );
}
