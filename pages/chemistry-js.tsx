import Head from 'next/head';

export default function ChemistryJSPage() {
    return (
        <div>
            <Head>
                <title>@chemistry</title>
            </Head>
            <h1 className="text-2xl font-bold text-slate-800">@chemistry</h1>
            <hr className="page-divider" />

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Set of open source projects related to Chemistry/Crystallography released under MIT license on{' '}
                <a href="https://github.com/chemistry" target="_blank" rel="noreferrer" className="text-slate-700 font-medium underline underline-offset-2 decoration-slate-300 hover:decoration-slate-500">GitHub</a>.
            </p>

            <div className="space-y-3">
                <div className="chem-project">
                    <div className="chem-project-title">
                        <a href="https://github.com/chemistry/crystallography.io" target="_blank" rel="noreferrer">@chemistry/crystallography.io</a>
                    </div>
                    <div className="chem-project-desc">
                        Alternative web interface for COD database website available at{' '}
                        <a href="http://crystallography.io/" target="_blank" rel="noreferrer" className="underline underline-offset-2 decoration-slate-300">crystallography.io</a>
                    </div>
                </div>

                <div className="chem-project">
                    <div className="chem-project-title">
                        <a href="https://github.com/chemistry/crystalview" target="_blank" rel="noreferrer">@chemistry/crystalview</a>
                    </div>
                    <div className="chem-project-desc">Simple molecular viewer for crystal structures</div>
                </div>

                <div className="chem-project">
                    <div className="chem-project-title">
                        <a href="https://github.com/chemistry/molpad" target="_blank" rel="noreferrer">@chemistry/molpad</a>
                    </div>
                    <div className="chem-project-desc">Molecule editor used to draw molecule for search</div>
                </div>

                <div className="chem-project">
                    <div className="chem-project-title">
                        <a href="https://github.com/chemistry/chemical-libraries" target="_blank" rel="noreferrer">@chemistry/(math, elements, spacegroups)</a>
                    </div>
                    <div className="chem-project-desc">Set of common functionality / chemical constants that support creation of software for chemistry</div>
                </div>
            </div>
        </div>
    );
};
