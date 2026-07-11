'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import type { FocusStat } from '@/lib/interests-data';

function StatCell({ stat }: { stat: FocusStat }) {
  const external = !stat.href.startsWith('/');
  const linkProps = external ? { target: '_blank', rel: 'noopener' } : {};
  return (
    <Link
      href={stat.href}
      {...linkProps}
      onClick={
        external
          ? () => trackEvent('outbound_click', { url: stat.href, label: stat.source })
          : undefined
      }
      className="group flex flex-col gap-1 rounded-xl px-1 py-2 transition-colors hover:bg-surface-alt dark:hover:bg-dark-surface-alt"
    >
      <span className="text-3xl font-semibold tabular-nums tracking-tight text-heading dark:text-dark-text md:text-4xl">
        {stat.value}
      </span>
      <span className="text-sm text-muted dark:text-dark-text-secondary">{stat.label}</span>
      <span className="text-xs text-accent transition-colors group-hover:text-accent-hover dark:text-dark-accent">
        {stat.source} &rarr;
      </span>
    </Link>
  );
}

export function FocusStats({ stats }: { stats: FocusStat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <StatCell key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
