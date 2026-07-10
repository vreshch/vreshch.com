'use client';

import { useState } from 'react';

type CopyEmailButtonProps = {
  email: string;
};

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${email} to clipboard`}
      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-medium text-heading transition-colors hover:bg-surface-alt dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-surface-alt"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {copied ? (
          <path d="M20 6 9 17l-5-5" />
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>
      {copied ? 'Copied' : 'Copy address'}
    </button>
  );
}
