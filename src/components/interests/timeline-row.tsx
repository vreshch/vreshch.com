'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { ExternalLink } from './external-link';
import type { TimelineEntry } from '@/lib/interests-data';

export function TimelineRow({ entry }: { entry: TimelineEntry }) {
  const hasDetails = Boolean(entry.detail || entry.receipts || entry.image);
  const [open, setOpen] = useState(Boolean(entry.defaultOpen));
  const panelId = useId();

  return (
    <div className="grid gap-1 md:grid-cols-[8rem_1fr] md:gap-6">
      <p className="pt-0.5 text-sm font-medium text-muted dark:text-dark-text-secondary">
        {entry.period}
      </p>
      <div>
        {hasDetails ? (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="group flex w-full items-start gap-2 text-left"
          >
            <span
              aria-hidden
              className={`mt-1.5 text-xs text-accent transition-transform duration-200 dark:text-dark-accent motion-reduce:transition-none ${
                open ? 'rotate-90' : ''
              }`}
            >
              &#9654;
            </span>
            <span className="text-sm font-medium text-heading transition-colors group-hover:text-accent dark:text-dark-text dark:group-hover:text-dark-accent md:text-base">
              {entry.role}
            </span>
          </button>
        ) : (
          <p className="pl-5 text-sm font-medium text-heading dark:text-dark-text md:text-base">
            {entry.role}
          </p>
        )}

        {hasDetails && (
          <div
            id={panelId}
            hidden={!open}
            className="space-y-3 pl-5 pt-2 text-sm leading-relaxed text-muted dark:text-dark-text-secondary"
          >
            {entry.detail && <p>{entry.detail}</p>}
            {entry.image && (
              <div className="overflow-hidden rounded-lg bg-gradient-to-b from-[#1e2e47] to-[#0c0f16] p-2">
                <Image
                  src={entry.image.src}
                  alt={entry.image.alt}
                  width={entry.image.width}
                  height={entry.image.height}
                  className="h-auto w-full rounded"
                />
              </div>
            )}
            {entry.receipts && (
              <ul className="space-y-1.5">
                {entry.receipts.map((receipt) => (
                  <li key={receipt.href} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted/50 dark:bg-dark-text-secondary/50" />
                    <ExternalLink href={receipt.href}>{receipt.label}</ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
