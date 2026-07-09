import { Fragment } from 'react';
import { Card } from '@/components/card';
import { ExternalLink } from './external-link';
import type { NowThread } from '@/lib/interests-data';

export function NowThreadCard({ thread }: { thread: NowThread }) {
  return (
    <Card className="flex h-full flex-col">
      <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">{thread.title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted dark:text-dark-text-secondary">
        {thread.body}
      </p>
      <p className="text-sm">
        {thread.links.map((link, index) => (
          <Fragment key={link.href}>
            {index > 0 && (
              <span className="text-muted dark:text-dark-text-secondary" aria-hidden>
                {' · '}
              </span>
            )}
            <ExternalLink href={link.href}>{link.label}</ExternalLink>
          </Fragment>
        ))}
      </p>
    </Card>
  );
}
