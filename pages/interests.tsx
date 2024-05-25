import Head from 'next/head';

export default function DownloadsPage() {
        return (
            <div>
                <Head>
                    <title>Volodymyr Vreshch - Interests</title>
                </Head>
                <h1>Interests</h1>
                <hr />
                <div className="app-text">
                    <dd>
                        <ul>
                            <li>Cheminformatics; program development for Chemistry & Crystallography</li>
                            <li>JavaScript (ES6): Single Page Applications (React, Angular 2.x)</li>
                            <li>Backend development NodeJS + Express + MongoDB</li>
                            <li>Application of different Algorithms in Chemistry</li>
                            <li>Applied Crystallography</li>
                            <li>Data Science, Big Data</li>
                        </ul>
                    </dd>
                </div>
            </div>
        );
};
