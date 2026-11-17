import { cv } from '../data/cv';

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
    return (
        <div className="min-h-screen bg-neutral-200 px-0 py-0 sm:px-6 sm:py-10 print:bg-white print:p-0">
            {/* Toolbar: hanya tampil di layar, tidak ikut tercetak */}
            <div className="no-print mx-auto flex w-[210mm] max-w-full flex-wrap items-center justify-between gap-3 px-5 pb-5 pt-5 sm:px-0 sm:pb-6 sm:pt-0">
                <a
                    href="/"
                    className="rounded font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-600 transition hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200"
                >
                    ← Kembali ke portofolio
                </a>

                <div className="flex flex-wrap gap-2">
                    <a
                        href={cv.pdfPath}
                        download="Adipraja-Shidqi-CV.pdf"
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-900/25 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-900 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200"
                    >
                        Unduh PDF
                    </a>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200"
                    >
                        Cetak / Simpan PDF
                    </button>
                </div>
            </div>

            {/* Lembar CV: rasio A4, putih, siap dicetak */}
            <article className="cv-sheet mx-auto flex min-h-[297mm] w-[210mm] max-w-full flex-col bg-white px-6 py-8 text-neutral-900 shadow-xl sm:px-[14mm] sm:py-[13mm]">
                <header className="border-b-2 border-neutral-900 pb-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-[7.5pt] uppercase tracking-[0.2em] text-neutral-500">
                        <span>// Curriculum Vitae</span>
                        <span>Diperbarui {cv.updated}</span>
                    </div>

                    <h1 className="mt-3 text-[26pt] font-extrabold uppercase leading-[0.95] tracking-tight">
                        {cv.name}
                    </h1>

                    <p className="mt-2 font-mono text-[8.5pt] uppercase tracking-[0.18em] text-neutral-800">
                        <span className="bg-lime px-1.5 py-[2px]">{cv.role}</span>
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[7.5pt] text-neutral-600">
                        <li>{cv.location}</li>
                        <li>
                            <a
                                href={`mailto:${cv.email}`}
                                className="underline decoration-neutral-400 underline-offset-2 transition hover:text-neutral-900"
                            >
                                {cv.email}
                            </a>
                        </li>
                        {cv.links.map((link) => (
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
                        <Section title="Profil">
                            <p className="text-[9.5pt] font-light leading-[1.6] text-neutral-700">
                                {cv.profile}
                            </p>
                        </Section>

                        <Section title="Proyek Pilihan">
                            <ol className="space-y-3.5">
                                {cv.projects.map((project) => (
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
                        <Section title="Pendidikan">
                            <ol className="space-y-3">
                                {cv.education.map((item) => (
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

                        {cv.organizations.length > 0 && (
                            <Section title="Organisasi">
                                <ol className="space-y-3">
                                    {cv.organizations.map((item) => (
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

                        {cv.certifications.length > 0 && (
                            <Section title="Sertifikasi">
                                <ul className="space-y-2.5">
                                    {cv.certifications.map((item) => (
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

                        <Section title="Keahlian">
                            <dl className="space-y-2.5">
                                {cv.skills.map((group) => (
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

                        <Section title="Kontak">
                            <ul className="space-y-1 text-[8.5pt] font-light text-neutral-700">
                                <li>
                                    <a
                                        href={`mailto:${cv.email}`}
                                        className="underline decoration-neutral-400 underline-offset-2 transition hover:text-neutral-900"
                                    >
                                        {cv.email}
                                    </a>
                                </li>
                                <li>{cv.location}</li>
                            </ul>
                        </Section>
                    </div>
                </div>

                <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-neutral-300 pt-3 font-mono text-[6.5pt] uppercase tracking-[0.18em] text-neutral-500">
                    <span>Portofolio: adiprajashdq.vercel.app</span>
                    <span>{cv.name}</span>
                </footer>
            </article>
        </div>
    );
}
