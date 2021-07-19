import * as React from "react";
import Image from 'next/image'
import Head from "next/head";

export default function ProjectsPage() {
        return (
            <div>
                <Head>
                    <title>Vreshch Volodymyr - Projects</title>
                </Head>
                <h1>Projects</h1>
                <hr />
                <div className="app-text">
                    <p>
                        Currently I am supporting 2 projects, both are in active development phase;
                    </p>
                    <div className="row">
                        <div className="col-md-6">
                            <a href="https://crystallography.io" target="_blank">
                                <Image
                                    src="/crystallography_online.jpg"
                                    width={397}
                                    height={284}
                                    className="img-fluid"
                                    alt="diffractw.com"
                                /><br />
                                crystallography.io
                            </a>
                        </div>
                        <div className="col-md-6">
                            <a href="http://diffractwd.com" target="_blank">
                                <Image src="/diffractwd.jpg" width={397} height={284} className="img-fluid" alt="diffractwd.com" /><br />
                                diffractw.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
};
