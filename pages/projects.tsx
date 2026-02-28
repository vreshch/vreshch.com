import Head from 'next/head';
import Image from 'next/image';

/* IMPROVEMENT #5: Modern Project Cards with Hover Effects */
export default function ProjectsPage() {
    return (
        <div>
            <Head>
                <title>Projects</title>
            </Head>
            <h1 className="text-2xl font-bold text-slate-800">Projects</h1>
            <hr className="page-divider" />

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Currently I am supporting 2 projects, both are in active development phase.
            </p>

            {/* IMPROVEMENT #5: Project cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="https://crystallography.io" target="_blank" rel="noreferrer" className="project-card">
                    <div className="project-card-image">
                        <Image
                            src="/images/crystallography_online.jpg"
                            width={397}
                            height={284}
                            className="w-full h-auto"
                            alt="crystallography.io"
                        />
                    </div>
                    <div className="project-card-body">
                        <div className="project-card-title">crystallography.io</div>
                        <div className="project-card-desc">Alternative web interface for COD database</div>
                    </div>
                </a>

                <a href="http://diffractwd.com" target="_blank" rel="noreferrer" className="project-card">
                    <div className="project-card-image">
                        <Image
                            src="/images/diffractwd.jpg"
                            width={397}
                            height={284}
                            className="w-full h-auto"
                            alt="diffractwd.com"
                        />
                    </div>
                    <div className="project-card-body">
                        <div className="project-card-title">diffractwd.com</div>
                        <div className="project-card-desc">X-ray diffraction analysis tool</div>
                    </div>
                </a>
            </div>
        </div>
    );
};
