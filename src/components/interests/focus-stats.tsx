'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { FocusStat } from '@/lib/interests-data';

const DURATION_MS = 1100;

function useCountUp(target: number, active: boolean): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return value;
}

function StatCell({ stat, active }: { stat: FocusStat; active: boolean }) {
  const value = useCountUp(stat.value, active);
  const external = !stat.href.startsWith('/');
  const linkProps = external ? { target: '_blank', rel: 'noopener' } : {};
  return (
    <Link
      href={stat.href}
      {...linkProps}
      className="group flex flex-col gap-1 rounded-xl px-1 py-2 transition-colors hover:bg-surface-alt dark:hover:bg-dark-surface-alt"
    >
      <span className="text-3xl font-semibold tabular-nums tracking-tight text-heading dark:text-dark-text md:text-4xl">
        {stat.prefix}
        {value}
        {stat.suffix}
      </span>
      <span className="text-sm text-muted dark:text-dark-text-secondary">{stat.label}</span>
      <span className="text-xs text-accent transition-colors group-hover:text-accent-hover dark:text-dark-accent">
        {stat.source} &rarr;
      </span>
    </Link>
  );
}

export function FocusStats({ stats }: { stats: FocusStat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <StatCell key={stat.label} stat={stat} active={active} />
      ))}
    </div>
  );
}
