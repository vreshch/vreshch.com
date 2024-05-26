import React, { useState, Children } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import classNames from 'classnames';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { usePathname } from 'next/navigation';


const ActiveLink = ({...props}: any) => {
    const pathname = usePathname();
    let className = props.className || '';
    if (pathname === props.href && props.activeClassName) {
        className = `${className} ${props.activeClassName}`.trim();
    }
    delete props.activeClassName;

    return <Link {...props} className={className}></Link>;
}

const Sidebar = ()=> {
    const [closed, setClosed] = useState(true);

    const sidebarClass = classNames({
        "jcw-sidebar": true,
        "closed": closed,
    });

    return (
        <div className={sidebarClass}>
            <div className="jcw-sidebar-mobile-nav bg-faded">
                <button className="navbar-toggler" onClick={()=> setClosed(!closed)} >☰</button>
            </div>
            <div className="jcw-sidebar-wrap">
                <ActiveLink href="/" className="jcw-sidebar-item" activeClassName="active">Home</ActiveLink>
                <ActiveLink href="/cv" className="jcw-sidebar-item" activeClassName="active">Curriculum Vitae</ActiveLink>
                <ActiveLink href="/interests" className="jcw-sidebar-item" activeClassName="active">Interests</ActiveLink>
                <ActiveLink href="/projects" className="jcw-sidebar-item" activeClassName="active">Projects</ActiveLink>
                <ActiveLink href="/chemistry-js" className="jcw-sidebar-item" activeClassName="active">Chemistry JS</ActiveLink>
                <ActiveLink href="/contacts" className="jcw-sidebar-item" activeClassName="active">Contacts</ActiveLink>
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
            </Head>
            <div className="app-container container">
                <div className="app-logo">
                    <div className="app-logo-img" />
                    <h2 className="app-logo-title">Vreshch Volodymyr</h2>
                    <h3 className="app-logo-subtitle">:: Homepage ::</h3>
                </div>
                <div className="app-wrap row">
                    <div className="app-sidebar col-sm-12 col-md-3">
                        <Sidebar />
                    </div>
                    <div className="app-content col-sm-12 col-md-9"><Component {...pageProps} /></div>
                </div>
                <footer>
                    <hr />© Vreshch V.D. {(new Date()).getFullYear()}
                </footer>
            </div>
        </div>
    );
}
