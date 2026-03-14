import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Volodymyr Vreshch - Website',
    template: '%s | Volodymyr Vreshch',
  },
  description: 'Personal homepage - Volodymyr D. Vreshch',
  keywords: 'Personal homepage, Volodymyr D. Vreshch, Vreshch V.D.',
  authors: [{ name: 'Volodymyr D. Vreshch' }],
  icons: { icon: '/favicon.ico' },
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
