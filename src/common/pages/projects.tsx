import * as React from "react";

export const ProjectsPage = () => {
        return (
            <div>
                <h1>Projects</h1>
                <hr />
                <div className="app-text">
                    <p>
                        Currently I am supporting 2 projects, both are in active development phase;
                        Currently I am actively working to move project crystallography-online.com to React+NodeJS+Mongo, and planning
                        to move diffractw.com to React+ NodeJS + Electron;
                    </p>
                    <div className="row">
                        <div className="col-md-6">
                            <a href="http://crystallography-online.com" target="_blank">
                                <img
                                    src="/crystallography_online.jpg"
                                    width="397"
                                    height="284"
                                    className="img-fluid"
                                    alt="diffractw.com"
                                /><br />
                                crystallography-online.com
                            </a>
                        </div>
                        <div className="col-md-6">
                            <a href="http://diffractwd.com" target="_blank">
                                <img src="/diffractwd.jpg" width="397" height="284" className="img-fluid" alt="diffractwd.com" /><br />
                                diffractw.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
};
