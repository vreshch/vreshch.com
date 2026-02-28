import Head from 'next/head';

const INTERESTS = [
    {
        icon: '\u{1F9EA}',
        title: 'Cheminformatics',
        desc: 'Program development for Chemistry & Crystallography',
    },
    {
        icon: '\u{269B}\u{FE0F}',
        title: 'JavaScript / SPA',
        desc: 'Single Page Applications with React, Angular 2.x',
    },
    {
        icon: '\u{1F5A5}\u{FE0F}',
        title: 'Backend Development',
        desc: 'NodeJS + Express + MongoDB',
    },
    {
        icon: '\u{1F9EE}',
        title: 'Algorithms in Chemistry',
        desc: 'Application of computational algorithms',
    },
    {
        icon: '\u{1F48E}',
        title: 'Applied Crystallography',
        desc: 'Crystal structure analysis and determination',
    },
    {
        icon: '\u{1F4CA}',
        title: 'Data Science',
        desc: 'Big Data analysis and visualization',
    },
];

export default function InterestsPage() {
    return (
        <div>
            <Head>
                <title>Volodymyr Vreshch - Interests</title>
            </Head>
            <h1 className="text-2xl font-bold text-slate-800">Interests</h1>
            <hr className="page-divider" />

            {/* IMPROVEMENT #7: Grid layout for interests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERESTS.map((item, i) => (
                    <div key={i} className="interest-card">
                        <div className="interest-icon">{item.icon}</div>
                        <div className="interest-title">{item.title}</div>
                        <div className="interest-desc">{item.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
