import Head from 'next/head';

/* IMPROVEMENT #3: Visual Career Timeline */
export default function MainPage() {
    return (
        <div>
            <Head>
                <title>Volodymyr Vreshch - Home</title>
            </Head>
            <h1 className="text-2xl font-bold text-slate-800">Home</h1>
            <hr className="page-divider" />

            <p className="text-slate-600 mb-6 leading-relaxed">
                Welcome to my personal website.
                Here you can find some general information about my background, supported projects and contacts.
            </p>

            {/* Personal info card */}
            <div className="info-card mb-8">
                <div className="info-card-label">Personal Information</div>
                <div className="info-card-value">Volodymyr D. Vreshch</div>
                <div className="info-card-sub">Senior Software Engineer @ Microsoft</div>
            </div>

            {/* IMPROVEMENT #3: Visual Career Timeline */}
            <div className="section-label">Career Path</div>
            <div className="timeline">
                <div className="timeline-item">
                    <div className="timeline-date">07.2021 &mdash; Present</div>
                    <div className="timeline-title">Senior Software Engineer, <span className="timeline-company">Microsoft</span></div>
                    <div className="timeline-details">Frontend Developer</div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-date">07.2016 &mdash; 07.2021</div>
                    <div className="timeline-title">Lead Software Engineer, <span className="timeline-company">EPAM Systems</span></div>
                    <div className="timeline-details">TypeScript, React, Angular 2+ &middot; NodeJS, Cloud</div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-date">07.2015 &mdash; 07.2016</div>
                    <div className="timeline-title">Software Engineer, <span className="timeline-company">GlobalLogic</span></div>
                    <div className="timeline-details">JavaScript, Backbone &middot; LESS, HTML, NodeJS</div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-date">2009 &mdash; 2012</div>
                    <div className="timeline-title">Post-Doc</div>
                    <div className="timeline-details">USA (Albany, NY), France (Rennes 1, Toulouse)</div>
                </div>
                <div className="timeline-item">
                    <div className="timeline-date">2008</div>
                    <div className="timeline-title">Ph.D. in Inorg. Chem.</div>
                    <div className="timeline-details">Kyiv, Ukraine</div>
                </div>
            </div>

            {/* Supported Projects */}
            <div className="section-label mt-8">Supported Projects</div>
            <div className="flex flex-wrap">
                <a href="https://crystallography.io/" target="_blank" rel="noreferrer" className="project-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    crystallography.io
                </a>
                <a href="https://diffractwd.com/" target="_blank" rel="noreferrer" className="project-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    diffractwd.com
                </a>
            </div>
        </div>
    )
}
