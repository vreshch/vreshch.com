import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar, navItems } from './sidebar';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('navItems', () => {
  it('contains all expected navigation routes', () => {
    const expectedRoutes = ['/', '/cv', '/interests', '/projects', '/chemistry-js', '/contacts'];
    const routes = navItems.map((item) => item.href);
    expect(routes).toEqual(expectedRoutes);
  });

  it('has unique hrefs', () => {
    const hrefs = navItems.map((item) => item.href);
    const uniqueHrefs = new Set(hrefs);
    expect(uniqueHrefs.size).toBe(hrefs.length);
  });

  it('has non-empty labels for all items', () => {
    for (const item of navItems) {
      expect(item.label.length).toBeGreaterThan(0);
    }
  });

  it('all hrefs start with /', () => {
    for (const item of navItems) {
      expect(item.href).toMatch(/^\//);
    }
  });
});

describe('Sidebar', () => {
  it('renders all navigation links', () => {
    render(<Sidebar />);

    for (const item of navItems) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it('renders navigation links with correct hrefs', () => {
    render(<Sidebar />);

    for (const item of navItems) {
      const link = screen.getByText(item.label);
      expect(link.closest('a')).toHaveAttribute('href', item.href);
    }
  });

  it('renders the hamburger menu button', () => {
    render(<Sidebar />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    render(<Sidebar />);

    const button = screen.getByRole('button');
    const nav = button.closest('nav');
    const menuContainer = nav?.querySelector('div:last-child');

    expect(menuContainer?.className).toContain('max-h-0');

    fireEvent.click(button);
    expect(menuContainer?.className).toContain('max-h-[550px]');

    fireEvent.click(button);
    expect(menuContainer?.className).toContain('max-h-0');
  });
});
