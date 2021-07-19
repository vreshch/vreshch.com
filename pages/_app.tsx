import React, { useState, Children } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import type { AppProps } from 'next/app';
import classNames from 'classnames';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'


const ActiveLink = withRouter( (({ router, children, ...props }: any) => {
    const child = Children.only(children);

    let className = child.props.className || '';
    if (router.pathname === props.href && props.activeClassName) {
      className = `${className} ${props.activeClassName}`.trim();
    }

    delete props.activeClassName;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
}));


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
                <ActiveLink exact={true} href="/" activeClassName="active"><a className="jcw-sidebar-item">Home</a></ActiveLink>
                <ActiveLink href="/cv" activeClassName="active"><a className="jcw-sidebar-item">Curriculum Vitae</a></ActiveLink>
                <ActiveLink href="/interests" activeClassName="active"><a className="jcw-sidebar-item">Interests</a></ActiveLink>
                <ActiveLink href="/projects" activeClassName="active"><a className="jcw-sidebar-item">Projects</a></ActiveLink>
                <ActiveLink href="/chemistry-js" activeClassName="active"><a className="jcw-sidebar-item">Chemistry JS</a></ActiveLink>
                <ActiveLink href="/contacts" activeClassName="active"><a className="jcw-sidebar-item">Contacts</a></ActiveLink>
            </div>
        </div>
    )
}

export default function MainLayout({ Component, pageProps }: AppProps) {

    return (
        <div className="app">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
                <meta name="author" content="Volodymyr D. Vreshch" />
                <meta name="description" content="Personal homepage - Volodymyr D. Vreshch" />
                <meta name="keywords" content="Personal homepage,Volodymyr D. Vreshch, Vresch V.D." />
                <meta name="google-site-verification" content="UarjyPE0cvOJykaPBf85EkRxcY_XCW1W8TWzA0_Y6wo" />
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
