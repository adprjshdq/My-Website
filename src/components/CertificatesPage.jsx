import Navbar from './Navbar';
import { certificates } from '../data/certificates.js';
import { useLang } from '../i18n/useLang.js';

export default function CertificatesPage() {
    const { t } = useLang();

    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-5rem)] px-6 py-16 md:px-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <a href="/#expertise" className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-900">
                        <span aria-hidden="true">←</span> {t.certificates.back}
                    </a>

                    <header className="mb-12 flex flex-col gap-6 border-b border-neutral-300 pb-10 md:mb-16 md:flex-row md:items-end md:justify-between md:pb-14">
                        <div data-reveal>
                            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">{t.certificates.kicker}</span>
                            <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
                                {t.certificates.titleLine1}<br />
                                <span className="text-lime">{t.certificates.titleLine2}</span>
                            </h1>
                        </div>
                        <p data-reveal style={{ '--reveal-delay': '100ms' }} className="max-w-md text-sm font-light leading-relaxed text-neutral-600 md:text-base">
                            {t.certificates.intro}
                        </p>
                    </header>

                    {certificates.length ? (
                        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {certificates.map((certificate, index) => (
                                <li key={certificate.id} data-reveal style={{ '--reveal-delay': `${index * 80}ms` }} className="overflow-hidden rounded-2xl border border-neutral-300 bg-sand transition-colors hover:border-neutral-900">
                                    {certificate.image && <img src={certificate.image} alt={certificate.title} className="aspect-[4/3] w-full object-cover" />}
                                    <div className="p-6">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{certificate.issuer} · {certificate.date}</span>
                                        <h2 className="mt-3 text-xl font-bold tracking-tight">{certificate.title}</h2>
                                        {certificate.skills?.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">{certificate.skills.map((skill) => <li key={skill} className="rounded-md border border-neutral-300 bg-cream px-2.5 py-1 font-mono text-xs">{skill}</li>)}</ul>}
                                        {certificate.credentialUrl && <a href={certificate.credentialUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-xs font-semibold uppercase tracking-wider underline decoration-lime decoration-2 underline-offset-4">{certificate.linkLabel || 'View credential'} <span aria-hidden="true" className="ml-2">↗</span></a>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div data-reveal className="rounded-2xl border border-neutral-300 bg-sand p-8 md:p-12">
                            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">// 00 — 00</span>
                            <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">{t.certificates.empty}</h2>
                            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-neutral-600">{t.certificates.emptyHint}</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
