import { getCv } from '../data/cv';
import LanguageToggle from '../components/LanguageToggle';
import { useLang } from '../i18n/useLang.js';

function Section({ title, children, className = '' }) {
    return (
        <section className={`avoid-break ${className}`}>
            <h2 className="mb-2 font-mono text-[7.5pt] uppercase tracking-[0.22em] text-neutral-500">
                <span aria-hidden="true">// </span>
                {title}
            </h2>
            {children}
        </section>
    );
}

export default function CvPage() {
    const { lang, t } = useLang();
    const data = getCv(lang);

    return (
        <div className="min-h-screen bg-neutral-200 px-0 py-0 sm:px-6 sm:py-10 print:bg-white print:p-0">
            {/* Toolbar: hanya tampil di layar, tidak ikut tercetak */}
            <div className="no-print mx-auto flex w-[210mm] max-w-full flex-wrap items-center justify-between gap-3 px-5 pb-5 pt-5 sm:px-0 sm:pb-6 sm:pt-0">
                <div className="flex flex-wrap items-center gap-4">
                    <a
                        href="/"
                        className="rounded font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-600 transition hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200"
                    >
                        {t.cv.back}
                    </a>

                    <LanguageToggle />
                </div>

                <div className="flex flex-wrap gap-2">
                    <a
                        href={data.pdfPath}
                        download={t.cv.pdfFileName}
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-900/25 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-900 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200"
                    >
                        {t.cv.download}
                    </a>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200"
                    >
                        {t.cv.print}
                    </button>
                </div>
            </div>

            {/* Lembar CV: rasio A4, putih, siap dicetak */}
            <article className="cv-sheet mx-auto flex min-h-[297mm] w-[210mm] max-w-full flex-col bg-white px-6 py-8 text-neutral-900 shadow-xl sm:px-[14mm] sm:py-[13mm]">
                <header className="border-b-2 border-neutral-900 pb-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-[7.5pt] uppercase tracking-[0.2em] text-neutral-500">
                        <span>// Curriculum Vitae</span>
                        <span>{t.cv.updated(data.updated)}</span>
                    </div>

                    <h1 className="mt-3 text-[26pt] font-extrabold uppercase leading-[0.95] tracking-tight">
                        {data.name}
                    </h1>

                    <p className="mt-2 font-mono text-[8.5pt] uppercase tracking-[0.18em] text-neutral-800">
                        <span className="bg-lime px-1.5 py-[2px]">{data.role}</span>
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[7.5pt] text-neutral-600">
                        <li>{data.location}</li>
                        <li>
                            <a
                                href={`mailto:${data.email}`}
                                className="underline decoration-neutral-400 underline-offset-2 transition hover:text-neutral-900"
                            >
                                {data.email}
                            </a>
                        </li>
                        {data.links.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-neutral-400 underline-offset-2 transition hover:text-neutral-900"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </header>

                <div className="cv-body mt-5 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-[1.55fr_1fr]">
                    <div className="space-y-6">
                        <Section title={t.cv.sections.profile}>
                            <p className="text-[9.5pt] font-light leading-[1.6] text-neutral-700">
                                {data.profile}
                            </p>
                        </Section>

                        <Section title={t.cv.sections.projects}>
                            <ol className="space-y-3.5">
                                {data.projects.map((project) => (
                                    <li key={project.title} className="avoid-break">
                                        <h3 className="text-[10.5pt] font-bold leading-snug">
                                            {project.title}
                                        </h3>
                                        <p className="mt-0.5 font-mono text-[7pt] uppercase tracking-[0.14em] text-neutral-500">
                                            {project.tech.join(' · ')}
                                        </p>
                                        <p className="mt-1 text-[9pt] font-light leading-[1.55] text-neutral-700">
                                            {project.description}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </Section>
                    </div>

                    <div className="space-y-6">
                        <Section title={t.cv.sections.education}>
                            <ol className="space-y-3">
                                {data.education.map((item) => (
                                    <li key={item.degree} className="avoid-break">
                                        <span className="font-mono text-[7pt] uppercase tracking-[0.14em] text-neutral-500">
                                            {item.period}
                                        </span>
                                        <p className="text-[10pt] font-bold leading-snug">
                                            {item.degree}
                                        </p>
                                        <p className="text-[8.5pt] font-light text-neutral-600">
                                            {item.school}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </Section>

                        {data.organizations.length > 0 && (
                            <Section title={t.cv.sections.organizations}>
                                <ol className="space-y-3">
                                    {data.organizations.map((item) => (
                                        <li key={`${item.period}-${item.role}`} className="avoid-break">
                                            <span className="font-mono text-[7pt] uppercase tracking-[0.14em] text-neutral-500">
                                                {item.period}
                                            </span>
                                            <p className="text-[10pt] font-bold leading-snug">{item.role}</p>
                                            <p className="text-[8.5pt] font-light text-neutral-600">{item.place}</p>
                                        </li>
                                    ))}
                                </ol>
                            </Section>
                        )}

                        {data.certifications.length > 0 && (
                            <Section title={t.cv.sections.certifications}>
                                <ul className="space-y-2.5">
                                    {data.certifications.map((item) => (
                                        <li key={item.name} className="avoid-break">
                                            <span className="font-mono text-[7pt] uppercase tracking-[0.14em] text-neutral-500">
                                                {item.year}
                                            </span>
                                            <p className="text-[9.5pt] font-bold leading-snug">{item.name}</p>
                                            <p className="text-[8.5pt] font-light text-neutral-600">{item.issuer}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Section>
                        )}

                        <Section title={t.cv.sections.skills}>
                            <dl className="space-y-2.5">
                                {data.skills.map((group) => (
                                    <div key={group.label} className="avoid-break">
                                        <dt className="font-mono text-[7pt] uppercase tracking-[0.14em] text-neutral-500">
                                            {group.label}
                                        </dt>
                                        <dd className="text-[8.5pt] font-light leading-[1.5] text-neutral-700">
                                            {group.items.join(' · ')}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </Section>

                        <Section title={t.cv.sections.contact}>
                            <ul className="space-y-1 text-[8.5pt] font-light text-neutral-700">
                                <li>
                                    <a
                                        href={`mailto:${data.email}`}
                                        className="underline decoration-neutral-400 underline-offset-2 transition hover:text-neutral-900"
                                    >
                                        {data.email}
                                    </a>
                                </li>
                                <li>{data.location}</li>
                            </ul>
                        </Section>
                    </div>
                </div>

                <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-neutral-300 pt-3 font-mono text-[6.5pt] uppercase tracking-[0.18em] text-neutral-500">
                    <span>Portofolio: adprjshdq.vercel.app</span>
                    <span>{data.name}</span>
                </footer>
            </article>
        </div>
    );
}
