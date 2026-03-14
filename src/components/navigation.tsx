'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { ThemeToggle } from '@/components/theme-toggle';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/interests', label: 'Interests' },
  { href: '/projects', label: 'Projects' },
  { href: '/contacts', label: 'Contacts' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'border-b border-border/60 bg-[#f0f4f8]/85 shadow-sm backdrop-blur-xl dark:border-dark-border/60 dark:bg-dark-bg/85'
          : 'border-b border-transparent bg-[#f0f4f8] dark:bg-dark-bg',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group text-xl font-bold tracking-tight text-heading dark:text-dark-text"
        >
          <span className="transition-colors duration-200 group-hover:text-primary dark:group-hover:text-accent-light">
            Vreshch
          </span>
          <span className="text-primary transition-opacity duration-200 group-hover:opacity-70 dark:text-accent-light">
            .com
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'group relative px-3 py-2 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-heading dark:text-dark-text'
                    : 'text-muted hover:text-heading dark:text-dark-text-secondary dark:hover:text-dark-text',
                )}
              >
                {label}
                <span
                  className={cn(
                    'absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full transition-all duration-300',
                    isActive
                      ? 'bg-primary dark:bg-accent-light'
                      : 'scale-x-0 bg-primary/60 group-hover:scale-x-100 dark:bg-accent-light/60',
                  )}
                />
              </Link>
            );
          })}
          <div className="ml-2 border-l border-border pl-2 dark:border-dark-border">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="relative rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-heading dark:text-dark-text-secondary dark:hover:bg-dark-surface dark:hover:text-dark-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative h-5 w-5">
              <span
                className={cn(
                  'absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300',
                  mobileOpen ? 'top-[9px] rotate-45' : 'top-[3px] rotate-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[9px] block h-[2px] w-5 rounded-full bg-current transition-all duration-200',
                  mobileOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300',
                  mobileOpen ? 'top-[9px] -rotate-45' : 'top-[15px] rotate-0',
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="border-t border-border/60 px-6 pb-4 pt-2 dark:border-dark-border/60">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative block rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/8 text-primary dark:bg-accent/10 dark:text-accent-light'
                    : 'text-muted hover:bg-surface-hover hover:text-heading dark:text-dark-text-secondary dark:hover:bg-dark-surface dark:hover:text-dark-text',
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary dark:bg-accent-light" />
                )}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
