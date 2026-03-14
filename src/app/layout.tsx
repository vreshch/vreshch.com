import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Volodymyr Vreshch — Software Engineer',
    template: '%s | Volodymyr Vreshch',
  },
  description:
    'Building quality software that matters — for millions. Senior Software Engineer at Microsoft.',
  keywords:
    'Volodymyr Vreshch, software engineer, AI agents, MCP, TypeScript, Microsoft, startup CTO, technical co-founder, engineering leadership, MVP development, build SaaS application, software consulting, product engineering, AI application development, startup engineering partner, scalable web applications, team building, engineering management',
  authors: [{ name: 'Volodymyr Vreshch' }],
  icons: { icon: '/icon.svg' },
  metadataBase: new URL('https://vreshch.com'),
  openGraph: {
    title: 'Volodymyr Vreshch — Software Engineer',
    description:
      'Building quality software that matters — for millions. Senior Software Engineer at Microsoft.',
    url: 'https://vreshch.com',
    siteName: 'Volodymyr Vreshch',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Volodymyr Vreshch' }],
  },
  twitter: {
    card: 'summary',
    title: 'Volodymyr Vreshch — Software Engineer',
    description:
      'Building quality software that matters — for millions.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (theme === 'dark' || !theme) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white dark:bg-dark-bg">
        <Navigation />
        <main className="flex-1">{children}</main>
        <footer className="py-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="border-t border-border/30 pt-8 dark:border-dark-border">
              <p className="text-sm text-muted dark:text-dark-text-secondary">
                &copy; {new Date().getFullYear()} Volodymyr D. Vreshch. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
