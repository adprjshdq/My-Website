import { useCallback, useRef, useState } from 'react';
import CaseStudyModal from './CaseStudyModal';
import { projects } from '../data/projects';

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const triggerRef = useRef(null);

    const openProject = (project, trigger) => {
        triggerRef.current = trigger;
        setActiveProject(project);
    };

    const closeProject = useCallback(() => setActiveProject(null), []);

    return (
        <section id="projects" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-neutral-300">
            {/* Header Bagian Projects */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                <div data-reveal>
                    <span className="text-xs font-mono tracking-widest uppercase text-neutral-500"> // MY PROJECTS </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2"> These Are My <span className='block text-lime text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2'>Projects.</span></h2>
                </div>
                <p data-reveal style={{ '--reveal-delay': '100ms' }} className="text-neutral-600 text-sm md:text-base max-w-md font-light">
                    Kumpulan proyek pilihan yang saya bangun selama mendalami pengembangan web full-stack maupun proyek akademik.
                </p>
            </div>

            {/* Grid Kartu Proyek */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <article
                        key={project.id}
                        data-reveal
                        style={{ '--reveal-delay': `${index * 90}ms` }}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-sand transition-all duration-300 hover:border-neutral-900 hover:shadow-lg"
                    >
                        {/* Pratinjau: tombol agar bisa dibuka dengan keyboard maupun pembaca layar */}
                        <button
                            type="button"
                            aria-haspopup="dialog"
                            aria-label={`Buka studi kasus ${project.title}`}
                            onClick={(event) => openProject(project, event.currentTarget)}
                            className="relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-900"
                        >
                            <img
                                src={project.image}
                                alt={project.imageAlt}
                                width="1440"
                                height="900"
                                loading="lazy"
                                decoding="async"
                                className="aspect-[16/10] w-full bg-cream object-contain"
                            />
                            {project.imageNote && (
                                <span className="absolute left-3 top-3 rounded-full border border-neutral-300 bg-cream/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-600 backdrop-blur">
                                    {project.imageNote}
                                </span>
                            )}
                        </button>

                        <div className="flex flex-1 flex-col p-6 md:p-8">
                            {/* Nomor Urut, Kategori & Link GitHub */}
                            <div className="flex items-center justify-between text-xs font-mono mb-5">
                                <span className="text-neutral-500">
                                    {project.id} / {project.category}
                                </span>

                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Kode sumber ${project.title} di GitHub`}
                                    title="Lihat kode sumber di GitHub"
                                    className="rounded-full border border-neutral-300 p-2.5 text-neutral-900 transition hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-900 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                                >
                                    <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </a>
                            </div>

                            {/* Judul & Ringkasan */}
                            <h3 className="text-2xl font-bold tracking-tight mb-2">
                                {project.title}
                            </h3>
                            <p className="mb-6 text-sm font-light leading-relaxed text-neutral-600">
                                {project.summary}
                            </p>

                            <div className="mt-auto">
                                {/* Badge Tech Stack */}
                                <div className="flex flex-wrap gap-2 border-t border-neutral-300/70 pt-4">
                                    {project.tech.map((item) => (
                                        <span
                                            key={item}
                                            className="text-[11px] font-mono px-3 py-1 rounded-full bg-lime text-neutral-800"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    aria-haspopup="dialog"
                                    onClick={(event) => openProject(project, event.currentTarget)}
                                    className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-900 underline decoration-neutral-400 decoration-1 underline-offset-4 transition hover:decoration-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-4 focus-visible:ring-offset-sand"
                                >
                                    Baca studi kasus <span aria-hidden="true">→</span>
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <CaseStudyModal
                project={activeProject}
                onClose={closeProject}
                returnFocusRef={triggerRef}
            />
        </section>
    );
}
