'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

const inputStyles =
  'w-full rounded-xl border-0 bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40 dark:bg-dark-surface-alt dark:text-dark-text dark:placeholder:text-dark-text-secondary/40 dark:focus:ring-dark-accent/40';

const labelStyles =
  'mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted dark:text-dark-text-secondary';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        trackEvent('contact_submit', { method: 'form' });
        setStatus('sent');
        setName('');
        setEmail('');
        setMessage('');
        return;
      }
      trackEvent('contact_submit_error', { method: 'form' });
      setError(data.error || 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      trackEvent('contact_submit_error', { method: 'form' });
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelStyles}>
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            className={inputStyles}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelStyles}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={200}
            className={inputStyles}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelStyles}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="What would you like to discuss?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={5000}
          className={`${inputStyles} resize-none`}
        />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 dark:bg-dark-accent dark:text-dark-bg dark:hover:bg-dark-accent-hover"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'sent' && (
          <p className="text-sm font-medium text-accent dark:text-dark-accent">
            Thanks - your message is on its way.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </form>
  );
}
