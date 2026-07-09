import { ExternalLink } from './external-link';
import type { TimelineEntry } from '@/lib/interests-data';

export function TimelineRow({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="grid gap-1 md:grid-cols-[8rem_1fr] md:gap-6">
      <p className="text-sm font-medium text-muted dark:text-dark-text-secondary">{entry.period}</p>
      <div className="space-y-2">
        <p className="text-sm font-medium text-heading dark:text-dark-text md:text-base">
          {entry.role}
        </p>
        {entry.detail && (
          <p className="text-sm leading-relaxed text-muted dark:text-dark-text-secondary">
            {entry.detail}
          </p>
        )}
        {entry.receipts && (
          <ul className="space-y-1.5 text-sm leading-relaxed text-muted dark:text-dark-text-secondary">
            {entry.receipts.map((receipt) => (
              <li key={receipt.href} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted/50 dark:bg-dark-text-secondary/50" />
                <ExternalLink href={receipt.href}>{receipt.label}</ExternalLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
