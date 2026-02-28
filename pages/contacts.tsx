import Head from 'next/head';
import Image from 'next/image';

/* IMPROVEMENT #6: Clean Contact Card with Icons */
export default function ContactsPage() {
    return (
        <div>
            <Head>
                <title>Volodymyr Vreshch - Contacts</title>
            </Head>
            <h1 className="text-2xl font-bold text-slate-800">Contacts</h1>
            <hr className="page-divider" />

            {/* IMPROVEMENT #6: Contact layout with photo and grid */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="flex-shrink-0">
                    <Image
                        className="contact-photo"
                        alt="Volodymyr Vreshch"
                        width={160}
                        height={160}
                        src="/images/mphoto.jpeg"
                    />
                </div>
                <div className="flex-1">
                    <div className="space-y-1">
                        <a href="http://vreshch.com/" target="_blank" rel="noreferrer" className="contact-card">
                            <div className="contact-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            </div>
                            <div>
                                <div className="contact-label">Homepage</div>
                                <div className="contact-value">vreshch.com</div>
                            </div>
                        </a>

                        <a href="mailto:vreshch@gmail.com" className="contact-card">
                            <div className="contact-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </div>
                            <div>
                                <div className="contact-label">Email</div>
                                <div className="contact-value">vreshch@gmail.com</div>
                            </div>
                        </a>

                        <div className="contact-card">
                            <div className="contact-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                            <div>
                                <div className="contact-label">Phone</div>
                                <div className="contact-value">+38(096)337-87-**</div>
                            </div>
                        </div>

                        <a href="https://www.linkedin.com/in/vreshch-volodymyr-3969498a" target="_blank" rel="noreferrer" className="contact-card">
                            <div className="contact-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                            </div>
                            <div>
                                <div className="contact-label">LinkedIn</div>
                                <div className="contact-value">Volodymyr Vreshch</div>
                            </div>
                        </a>

                        <a href="https://github.com/vreshch" target="_blank" rel="noreferrer" className="contact-card">
                            <div className="contact-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                            </div>
                            <div>
                                <div className="contact-label">GitHub</div>
                                <div className="contact-value">vreshch</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
