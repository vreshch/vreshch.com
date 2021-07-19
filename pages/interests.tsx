import Head from "next/head";
import * as React from "react";

export default function InterestsPage() {
        return (
            <div>
                <Head>
                    <title>Vreshch Volodymyr - Interests</title>
                </Head>
                <h1>Interests</h1>
                <hr />
                <div className="app-text">
                    <dd>
                        <ul>
                            <li>Cheminformatics; program development for Chemistry & Crystallography</li>
                            <li>JavaScript (ES6): Single Page Applications (Angular 2.x, React)</li>
                            <li>Backend development NodeJS + Express + MongoDB</li>
                            <li>Application of different Algorithms in Chemistry</li>
                            <li>Applied Crystallography</li>
                            <li>Analysis of BigData</li>
                        </ul>
                    </dd>
                </div>
            </div>
        );
};
