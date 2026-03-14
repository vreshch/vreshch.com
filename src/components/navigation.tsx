'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { ThemeToggle } from '@/components/theme-toggle';

const isDev = process.env.NODE_ENV === 'development';

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/interests', label: 'Interests' },
  { href: '/projects', label: 'Projects' },
  { href: '/contacts', label: 'Contacts' },
  ...(isDev ? [{ href: '/design-system', label: 'Design System' }] : []),
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
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 shadow-sm backdrop-blur-xl dark:bg-dark-bg/80'
          : 'bg-white dark:bg-dark-bg',
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-lg font-medium text-heading dark:text-dark-text"
        >
          Volodymyr Vreshch
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-heading dark:text-dark-text'
                    : 'text-muted hover:text-heading dark:text-dark-text-secondary dark:hover:text-dark-text',
                )}
              >
                {label}
                {isActive && (
                  <span className="mt-0.5 block h-[2px] rounded-full bg-accent dark:bg-dark-accent" />
                )}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="relative rounded-full p-2 text-muted transition-colors duration-200 hover:text-heading dark:text-dark-text-secondary dark:hover:text-dark-text"
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
        <nav className="px-6 pb-4 pt-2">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'block rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-heading dark:text-dark-text'
                    : 'text-muted hover:text-heading dark:text-dark-text-secondary dark:hover:text-dark-text',
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
