import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/google-analytics';
import { Navigation } from '@/components/navigation';
import './globals.css';

const SITE_TITLE = 'Volodymyr Vreshch - Software Engineer';
const SITE_DESCRIPTION =
  'Senior Software Engineer at Microsoft with 10+ years of experience. I write about AI agents, MCP, and how AI should remember.';

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | Volodymyr Vreshch',
  },
  description: SITE_DESCRIPTION,
  keywords:
    'Volodymyr Vreshch, software engineer, Microsoft, AI agents, MCP, Model Context Protocol, AI memory, TypeScript',
  authors: [{ name: 'Volodymyr Vreshch' }],
  icons: { icon: '/icon.svg' },
  metadataBase: new URL('https://vreshch.com'),
  alternates: {
    types: { 'application/rss+xml': '/rss.xml' },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://vreshch.com',
    siteName: 'Volodymyr Vreshch',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Volodymyr Vreshch' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Volodymyr Vreshch',
              url: 'https://vreshch.com',
              jobTitle: 'Senior Software Engineer',
              worksFor: { '@type': 'Organization', name: 'Microsoft' },
              sameAs: [
                'https://www.linkedin.com/in/vreshch',
                'https://github.com/vreshch',
                'https://www.facebook.com/vreshch',
                'https://www.instagram.com/vreshch.v/',
              ],
              image: 'https://vreshch.com/images/profile.jpeg',
              description:
                'Senior Software Engineer at Microsoft. Writes about AI agents, MCP, and AI memory.',
            }),
          }}
        />
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
        <GoogleAnalytics />
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
