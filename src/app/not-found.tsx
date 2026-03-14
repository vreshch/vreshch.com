import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h1 className="mb-2 text-6xl font-medium text-heading dark:text-dark-text">404</h1>
      <p className="mb-8 text-lg text-muted dark:text-dark-text-secondary">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover dark:bg-dark-accent dark:text-dark-bg dark:hover:bg-dark-accent-hover"
      >
        Back to Home
      </Link>
    </div>
  );
}
