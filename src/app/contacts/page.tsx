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
  {
    label: 'LinkedIn',
    value: 'in/vreshch',
    href: 'https://www.linkedin.com/in/vreshch',
  },
  { label: 'GitHub', value: 'vreshch', href: 'https://github.com/vreshch' },
  {
    label: 'Facebook',
    value: 'vreshch',
    href: 'https://www.facebook.com/vreshch',
  },
  {
    label: 'Instagram',
    value: 'vreshch.v',
    href: 'https://www.instagram.com/vreshch.v/',
  },
];

export default function ContactsPage() {
  return (
    <div>
      <PageHeader title="Contacts" description="Get in touch." />

      <div className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
          <div className="flex-shrink-0">
            <Image
              className="rounded-full"
              alt="Volodymyr Vreshch"
              width={200}
              height={200}
              src="/images/profile.jpeg"
            />
          </div>
          <Card className="w-full flex-1">
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.label} className="flex items-baseline gap-4">
                  <span className="w-20 flex-shrink-0 text-xs font-medium uppercase tracking-widest text-muted dark:text-dark-text-secondary">
                    {contact.label}
                  </span>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <span className="text-sm text-heading dark:text-dark-text">
                      {contact.value}
                    </span>
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
