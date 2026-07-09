import Link from 'next/link';

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isInternal = href.startsWith('/');

  if (isInternal) {
    return (
      <Link
        href={href}
        className="font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
    >
      {children}
    </a>
  );
}
