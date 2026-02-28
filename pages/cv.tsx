import Head from 'next/head';

/* IMPROVEMENT #4: Skills Section with Modern Tags/Badges */
export default function CVPage() {
    return (
        <div>
            <Head>
                <title>Curriculum Vitae</title>
            </Head>
            <h1 className="text-2xl font-bold text-slate-800">Curriculum Vitae</h1>
            <hr className="page-divider" />

            {/* IMPROVEMENT #4: Skills with tags */}
            <div className="section-label">Programming</div>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                More than 10+ years of experience in developing websites of
                different complexities, including enterprise products with millions of users.
            </p>

            <div className="skill-category">Frontend</div>
            <div className="flex flex-wrap mb-2">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">ES6+</span>
                <span className="skill-tag">HTML5 &amp; CSS3</span>
                <span className="skill-tag">LESS</span>
                <span className="skill-tag">SVG</span>
                <span className="skill-tag">Canvas</span>
                <span className="skill-tag">Browser API</span>
            </div>

            <div className="skill-category">Backend &amp; Cloud</div>
            <div className="flex flex-wrap mb-2">
                <span className="skill-tag">NodeJS</span>
                <span className="skill-tag">C#</span>
                <span className="skill-tag">Express</span>
                <span className="skill-tag">Azure</span>
                <span className="skill-tag">Google Cloud</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">CosmosDB</span>
            </div>

            <div className="skill-category">Tools &amp; Practices</div>
            <div className="flex flex-wrap mb-2">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Data Science</span>
                <span className="skill-tag">TDD</span>
                <span className="skill-tag">Jest</span>
                <span className="skill-tag">CI/CD</span>
            </div>

            <div className="section-label mt-8">Chemistry</div>
            <div className="flex flex-wrap mb-2">
                <span className="skill-tag">Planning &amp; Project Management</span>
                <span className="skill-tag">Inorganic Synthesis</span>
                <span className="skill-tag">Organic Chemistry</span>
                <span className="skill-tag">Catalysis &amp; Reactivity</span>
                <span className="skill-tag">Air-Sensitive Compounds</span>
                <span className="skill-tag">NMR</span>
                <span className="skill-tag">IR Spectroscopy</span>
                <span className="skill-tag">X-Ray Diffraction</span>
                <span className="skill-tag">Crystallization</span>
                <span className="skill-tag">Crystal Structure Determination</span>
            </div>
        </div>
    );
};
