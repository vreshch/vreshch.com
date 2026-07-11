'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

const linkStyles =
  'font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover';

export function ExternalLink({
  href,
  children,
  label,
}: {
  href: string;
  children: React.ReactNode;
  label?: string;
}) {
  const isInternal = href.startsWith('/');

  if (isInternal) {
    return (
      <Link href={href} className={linkStyles}>
        {children}
      </Link>
    );
  }

  const eventLabel = label ?? (typeof children === 'string' ? children : href);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={linkStyles}
      onClick={() => trackEvent('outbound_click', { url: href, label: eventLabel })}
    >
      {children}
    </a>
  );
}
