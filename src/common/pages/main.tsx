import * as React from "react";

export const IndexPage = () => {
        return (
            <div>
                <h1>Home</h1>
                <hr />
                <div className="app-text">
                    <p>
                        Welcome to my personal website.
                        Here you can find some general
                        information about my backgound, supported projects and contacts
                      </p>
                    <dl>
                        <dt>Personal Information</dt>
                        <dd>Volodymyr D. Vreshch<br />
                        Lead Software Engineer – EPAM Systems
                        </dd>
                    </dl>

                    <dl>
                        <dt>Career path</dt>
                        <dd>
                            <b>06.2018</b>, Lead Software Engineer, <b>EPAM Systems</b>
                            <ul>
                                <li>JavaScript, Angular 4.x, React, NodeJS, ...</li>
                            </ul>
                        </dd>
                        <dd>
                            <b>07.2017</b>, Senior Software Engineer, <b>EPAM Systems</b>
                            <ul>
                                <li>JavaScript, Angular 4.x</li>
                            </ul>
                        </dd>
                        <dd>
                            <b>07.2016</b>, Software Engineer, <b>EPAM Systems</b>
                            <ul>
                                <li>JavaScript, Angular 1.x</li>
                                <li>Angular 2.x, React</li>
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
                            <b>06.2012-07.2015</b>, FullStack Web Developer, <b>White Studio & Jeny-Art</b>
                            <ul>
                                <li>HTML5, CSS3, LESS, JavaScript</li>
                                <li>PHP, MySQL</li>
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
                        <dt>Current Projects:</dt>
                        <dd>
                            <ul>
                                <li><a href="https://crystallography.io/" target="_blank">crystallography.io</a></li>
                                <li><a href="https://diffractwd.com/" target="_blank">diffractwd.com</a></li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
        );
};
