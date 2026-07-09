import type { ReactNode } from 'react';
import { Card } from '@/components/card';

const linkClass =
  'font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover';

export function DemoCard({
  title,
  description,
  sourceUrl,
  bordered = false,
  children,
}: {
  title: string;
  description: string;
  sourceUrl: string;
  bordered?: boolean;
  children: ReactNode;
}) {
  return (
    <Card
      padding="none"
      className={
        bordered
          ? 'overflow-hidden border border-border dark:border-dark-border'
          : 'overflow-hidden'
      }
    >
      <div className={bordered ? 'aspect-square' : 'aspect-square bg-white'}>{children}</div>
      <div className="p-6">
        <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">{title}</h3>
        <p className="text-sm text-muted dark:text-dark-text-secondary">
          {description} -{' '}
          <a href={sourceUrl} target="_blank" rel="noreferrer" className={linkClass}>
            source
          </a>
        </p>
      </div>
    </Card>
  );
}
