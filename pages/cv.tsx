import Head from "next/head";
import * as React from "react";

export default function CVPage() {
        return (
            <div>
                <Head>
                    <title>Vreshch Volodymyr - CV</title>
                </Head>
                <h1>Curriculum Vitae</h1>
                <hr />
                <div className="app-text">
                    <dl>
                        <dt>Programming</dt>
                        <p>
                            In general, more than 6 year of experience in developing of websites of
                            different difficulties, including GUI JavaScript development of enterprise solutions.
                            Main expertise includes:
                        </p>

                        <dd>
                            <ul>
                                <li>Angular (1.5,2.x,4.x), Backbone, React</li>
                                <li>JavaScript: Writing cross browser code, ES6 standards; DOM & BOM</li>
                                <li>HTML5, CSS3 (W3C standards) LESS, responsive design</li>
                                <li>Backend with NodeJS & PHP; Mysql, MongoDB, PM2, Docker, Express</li>
                                <li>TDD, testing with Karma, Qunit, Jasmine, end2end testing with Protractor</li>
                                <li>Common developer tools: GIT, NPM, Webpack, Grunt, Bower, Gulp, etc.</li>
                                <li>CI & Code Review: Gerrit, Jenkins, GitLab</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Chemistry</dt>
                        <dd>
                            <ul>
                                <li>Planning and project management</li>
                                <li>Synthesis of inorganic and coordination compounds</li>
                                <li>Synthetic organic chemistry</li>
                                <li>Catalysis and reactivity</li>
                                <li>Synthesis of air sensitive compounds</li>
                                <li>Operation of analytical instruments (NMR, IR, X-Ray)</li>
                                <li>Crystallization</li>
                                <li>X-Ray crystal structure determination (structure solution & refinement)</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        );
};
