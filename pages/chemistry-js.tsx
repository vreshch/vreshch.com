import Head from 'next/head';

export default function ChemistryJSPage() {
    return (
        <div>
            <Head>
                <title>@chemistry </title>
            </Head>
            <h1>@chemistry</h1>
            <hr />
            <div className="app-text">
                    <p>Set of open source projects related to Chemistry/Crystallography released under MIT license on <a href="https://github.com/chemistry" target="_blank" rel="noreferrer">github</a></p>
                    <dl>
                        <dt><a href="https://github.com/chemistry/crystallography.io" target="_blank" rel="noreferrer">@chemistry/crystallography.io</a></dt>
                        <dd>Alternative web interface for COD database website available at: <a href="http://crystallography.io/" target="_blank" rel="noreferrer">http://crystallography.io/</a></dd>
                    </dl>
                    <dl>
                        <dt><a href="https://github.com/chemistry/crystalview" target="_blank" rel="noreferrer">@chemistry/crystalview</a></dt>
                        <dd>Simple molecular viewer for crystal structures</dd>
                    </dl>
                    <dl>
                        <dt><a href="https://github.com/chemistry/molpad" target="_blank" rel="noreferrer">@chemistry/molpad</a></dt>
                        <dd>Molecule editor used to draw molecule for search</dd>
                    </dl>

                    <dl>
                        <dt><a href="https://github.com/chemistry/chemical-libraries" target="_blank" rel="noreferrer">@chemistry/(math,elements,spacegroups)</a></dt>
                        <dd>Set of common functionality / chemical constants that support creation of software for chemistry</dd>
                    </dl>
            </div>
        </div>
    );
};
