import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Contacts',
};

const contacts = [
  { label: 'Homepage', value: 'vreshch.com', href: 'https://vreshch.com/' },
  { label: 'Email', value: 'vreshch@gmail.com' },
  { label: 'Skype', value: 'vreshch.work' },
  { label: 'Tel', value: '+38(096)337-87-**' },
  {
    label: 'LinkedIn',
    value: 'Volodymyr Vreshch',
    href: 'https://www.linkedin.com/in/vreshch-volodymyr-3969498a',
  },
  { label: 'GitHub', value: 'vreshch', href: 'https://github.com/vreshch' },
];

export default function ContactsPage() {
  return (
    <div>
      <PageHeader title="Contacts" description="Get in touch." />

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          <div className="flex justify-center md:justify-start">
            <Image
              className="rounded-xl border border-border dark:border-dark-border"
              alt="Volodymyr Vreshch"
              width={200}
              height={200}
              src="/images/mphoto.jpeg"
            />
          </div>
          <Card>
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.label} className="flex items-baseline gap-3">
                  <span className="w-20 flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-muted dark:text-dark-text-secondary">
                    {contact.label}
                  </span>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-accent hover:underline dark:text-accent-light"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <span className="text-sm text-body dark:text-dark-text">{contact.value}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
