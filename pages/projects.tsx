import Head from 'next/head';
import Image from 'next/image';

export default function NewsPage() {
    return (
        <div>
            <Head>
                <title>Projects</title>
            </Head>
            <h1>Projects</h1>
            <hr />
            <div className="app-text">
                <p>
                    Currently I am supporting 2 projects, both are in active development phase;
                </p>
                <div className="row">
                    <div className="col-md-6">
                        <a href="https://crystallography.io" target="_blank" rel="noreferrer">
                            <Image
                                src="/images/crystallography_online.jpg"
                                width={397}
                                height={284}
                                className="img-fluid"
                                alt="crystallography.io"
                            /><br />
                            crystallography.io
                        </a>
                    </div>
                    <div className="col-md-6">
                        <a href="http://diffractwd.com" target="_blank" rel="noreferrer">
                        <Image src="/images/diffractwd.jpg" width={397} height={284} className="img-fluid" alt="diffractwd.com" /><br />
                            diffractwd.com</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
