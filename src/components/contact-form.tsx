'use client';

import { useState } from 'react';

const inputStyles =
  'w-full rounded-xl border-0 bg-surface px-4 py-3 text-sm text-heading placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40 dark:bg-dark-surface-alt dark:text-dark-text dark:placeholder:text-dark-text-secondary/40 dark:focus:ring-dark-accent/40';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Message from ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:vreshch@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted dark:text-dark-text-secondary"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputStyles}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted dark:text-dark-text-secondary"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyles}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted dark:text-dark-text-secondary"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="What would you like to discuss?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={`${inputStyles} resize-none`}
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover dark:bg-dark-accent dark:text-dark-bg dark:hover:bg-dark-accent-hover"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
