'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/cv', label: 'Curriculum Vitae' },
  { href: '/interests', label: 'Interests' },
  { href: '/projects', label: 'Projects' },
  { href: '/chemistry-js', label: 'Chemistry JS' },
  { href: '/contacts', label: 'Contacts' },
];

export function Sidebar() {
  const [closed, setClosed] = useState(true);
  const pathname = usePathname();

  return (
    <nav className="mb-4 pl-0">
      <div className="block p-2 md:hidden">
        <button
          className="cursor-pointer border-none bg-transparent text-xl"
          onClick={() => setClosed(!closed)}
        >
          ☰
        </button>
      </div>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-500 md:max-h-none md:overflow-visible',
          closed ? 'max-h-0' : 'max-h-[550px]'
        )}
      >
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'block border-l-3 px-4 py-2 my-0.5',
              pathname === href
                ? 'border-l-sidebar-border bg-sidebar-hover'
                : 'border-l-white hover:border-l-sidebar-border hover:bg-sidebar-hover'
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
