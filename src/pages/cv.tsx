import * as React from "react";

export function CVPage() {
        return (
            <div>
                <h1>Curriculum Vitae</h1>
                <hr />
                <div className="app-text">
                    <dl>
                        <dt>Programming</dt>
                        <p>
                            In general, more than 8+ year of experience in developing of websites of
                            different difficulties, including enterprise products with millions of users
                            Main expertise includes:
                        </p>
                        <dd>
                            <ul>
                                <li>React, NodeJS, C#</li>
                                <li>JavaScript, ES6, Browser API</li>
                                <li>Azure, Google Cloud, AWS</li>
                                <li>Express, MongoDB, CosmosDB</li>
                                <li>HTML5 & CSS3, LESS, SVG, Canvas</li>
                                <li>Python, Data Science</li>
                                <li>TDD, Jest, CI/CD</li>
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
