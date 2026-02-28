import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useRouter } from 'next/router';

const CURRENT_YEAR = new Date().getFullYear();

const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/cv', label: 'Curriculum Vitae' },
    { href: '/interests', label: 'Interests' },
    { href: '/projects', label: 'Projects' },
    { href: '/chemistry-js', label: 'Chemistry JS' },
    { href: '/contacts', label: 'Contacts' },
] as const;

const ActiveLink = ({ className: baseClassName, href, ...rest }: React.ComponentProps<typeof Link>) => {
    const { pathname } = useRouter();
    const isActive = pathname === href;
    const className = isActive ? `${baseClassName || ''} active`.trim() : (baseClassName || '') as string;
    return <Link href={href} {...rest} className={className} />;
};

const Sidebar = ()=> {
    const [closed, setClosed] = useState(true);

    return (
        <div className={`jcw-sidebar${closed ? ' closed' : ''}`}>
            <div className="jcw-sidebar-mobile-nav">
                <button className="navbar-toggler" onClick={()=> setClosed(!closed)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {closed ? (
                            <>
                                <line x1="3" y1="6" x2="21" y2="6"/>
                                <line x1="3" y1="12" x2="21" y2="12"/>
                                <line x1="3" y1="18" x2="21" y2="18"/>
                            </>
                        ) : (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </>
                        )}
                    </svg>
                    {closed ? 'Menu' : 'Close'}
                </button>
            </div>
            <div className="jcw-sidebar-wrap">
                {NAV_ITEMS.map(({ href, label }) => (
                    <ActiveLink key={href} href={href} className="jcw-sidebar-item">{label}</ActiveLink>
                ))}
            </div>
        </div>
    )
}

export default function MainLayout({ Component, pageProps }: AppProps) {

    return (
        <div className="app">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
                <meta name="author" content="Volodymyr D. Vreshch" />
                <meta name="description" content="Personal homepage - Volodymyr D. Vreshch" />
                <meta name="keywords" content="Personal homepage,Volodymyr D. Vreshch, Vreshch V.D." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="app-logo">
                    <div>
                        <h2 className="app-logo-title">Vreshch Volodymyr</h2>
                        <h3 className="app-logo-subtitle">Personal Homepage</h3>
                    </div>
                    <div className="app-logo-img" />
                </div>

                <div className="app-wrap flex flex-col md:flex-row gap-6 mt-6">
                    <div className="w-full md:w-48 flex-shrink-0">
                        <Sidebar />
                    </div>
                    <div className="app-content flex-1 min-h-[400px]">
                        <Component {...pageProps} />
                    </div>
                </div>

                <footer className="app-footer">
                    <span className="app-footer-copy">&copy; Vreshch V.D. {CURRENT_YEAR}</span>
                    <div className="app-footer-links">
                        <a href="https://github.com/vreshch" target="_blank" rel="noreferrer" className="app-footer-link">GitHub</a>
                        <a href="https://www.linkedin.com/in/vreshch-volodymyr-3969498a" target="_blank" rel="noreferrer" className="app-footer-link">LinkedIn</a>
                        <a href="mailto:vreshch@gmail.com" className="app-footer-link">Email</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
