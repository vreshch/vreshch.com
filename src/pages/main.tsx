import * as React from "react";

export function IndexPage() {
        return (
            <div>
                <h1>Home</h1>
                <hr />
                <div className="app-text">
                    <p>
                        Welcome to my personal website.
                        Here you can find some general information about my background, supported projects and contacts
                      </p>
                    <dl>
                        <dt>Personal Information</dt>
                        <dd>Volodymyr D. Vreshch<br />
                        Senior Software Engineer @ Microsoft
                        </dd>
                    </dl>
                    <dl>
                        <dt>Career path</dt>
                        <dd>
                            <b>07.2021-</b>, Senior Software Engineer, <b>Microsoft</b>
                            <ul>
                                <li>Frontend Developer</li>
                            </ul>
                        </dd>
                        <dd>
                            <b>07.2016-07.2021</b>, Lead Software Engineer, <b>EPAM Systems</b>
                            <ul>
                                <li>TypeScript, React, Angular 2+</li>
                                <li>NodeJS, Cloud</li>
                            </ul>
                        </dd>
                        <dd>
                            <b>07.2015-07.2016</b>, Software Engineer, <b>GlobalLogic</b>
                            <ul>
                                <li>JavaScript, Backbone</li>
                                <li>LESS, HTML, NodeJS</li>
                            </ul>
                        </dd>
                        <dd>
                            <b>2009-2012</b> <i>Post-Doc.</i>, USA (Albany, NY), France (Rennes 1, Toulouse)
                        </dd>
                        <dd>
                            <b>2008</b> <i>Ph.D.</i> in Inorg. Chem., Kyiv, <b>Ukraine</b>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Supported Projects:</dt>
                        <dd>
                            <ul>
                                <li><a href="https://crystallography.io/" target="_blank" rel="noreferrer">crystallography.io</a></li>
                                <li><a href="https://diffractwd.com/" target="_blank" rel="noreferrer">diffractwd.com</a></li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        );
};
