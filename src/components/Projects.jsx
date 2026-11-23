import { useCallback, useMemo, useRef, useState } from 'react';
import CaseStudyModal from './CaseStudyModal';
import { projects } from '../data/projects';

const ALL_CATEGORIES = 'all';

/* Indeks teks dibuat sekali dari data proyek, sehingga menambah proyek baru di
   projectsCore.js otomatis ikut bisa dicari tanpa mengubah komponen ini. */
const projectSearchIndex = new Map(
    projects.map((project) => [
        project.id,
        [
            project.title,
            project.category,
            project.role,
            project.year,
            project.summary,
            ...project.tech,
            ...project.features,
            ...project.sections.flatMap((section) => [section.label, section.body]),
        ]
            .join(' ')
            .toLowerCase(),
    ])
);

const categoryFilters = [
    { value: ALL_CATEGORIES, label: 'Semua' },
    ...Array.from(new Set(projects.map((project) => project.category))).map((category) => ({
        value: category,
        label: category,
    })),
];

const normalizeQuery = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim();

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState(ALL_CATEGORIES);
    const triggerRef = useRef(null);

    const normalizedQuery = normalizeQuery(query);

    const filteredProjects = useMemo(
        () =>
            projects.filter((project) => {
                const matchesCategory = category === ALL_CATEGORIES || project.category === category;
                const matchesQuery =
                    normalizedQuery === '' || projectSearchIndex.get(project.id).includes(normalizedQuery);

                return matchesCategory && matchesQuery;
            }),
        [category, normalizedQuery]
    );

    const visibleIds = useMemo(
        () => new Set(filteredProjects.map((project) => project.id)),
        [filteredProjects]
    );

    const isFiltering = normalizedQuery !== '' || category !== ALL_CATEGORIES;

    const resetFilters = useCallback(() => {
        setQuery('');
        setCategory(ALL_CATEGORIES);
    }, []);

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
                    <span className="text-xs font-mono tracking-widest uppercase text-neutral-500"> // MY PROJECT </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">This My <span className='block text-lime text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2'>Project.</span></h2>
                </div>
                <p data-reveal style={{ '--reveal-delay': '100ms' }} className="text-neutral-600 text-sm md:text-base max-w-md font-light">
                    Kumpulan proyek pilihan yang saya bangun selama mendalami pengembangan web full-stack maupun proyek akademik.
                </p>
            </div>

            {/* Pencarian & Filter Kategori */}
            <div
                data-reveal
                style={{ '--reveal-delay': '150ms' }}
                className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            >
                <div className="relative w-full lg:max-w-sm">
                    <label htmlFor="project-search" className="sr-only">
                        Cari proyek
                    </label>
                    <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
                    </svg>
                    <input
                        id="project-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Escape' && query !== '') {
                                event.preventDefault();
                                setQuery('');
                            }
                        }}
                        placeholder="Cari proyek, teknologi, kategori…"
                        autoComplete="off"
                        enterKeyHint="search"
                        className="w-full rounded-full border border-neutral-300 bg-cream py-3 pl-11 pr-11 text-sm text-neutral-900 transition placeholder:text-neutral-500 focus:border-neutral-900"
                    />
                    {query !== '' && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            aria-label="Hapus kata kunci pencarian"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-500 transition hover:bg-neutral-900 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
                        >
                            <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <div role="group" aria-label="Filter kategori proyek" className="flex flex-wrap gap-2">
                    {categoryFilters.map((filter) => {
                        const isActive = category === filter.value;

                        return (
                            <button
                                key={filter.value}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setCategory(filter.value)}
                                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition ${isActive
                                    ? 'border-neutral-900 bg-lime text-neutral-900'
                                    : 'border-neutral-300 bg-cream text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Jumlah hasil, diumumkan ke pembaca layar saat filter berubah */}
            <p
                role="status"
                aria-live="polite"
                className="mb-6 font-mono text-[11px] uppercase tracking-widest text-neutral-500"
            >
                {isFiltering
                    ? `Menampilkan ${filteredProjects.length} dari ${projects.length} proyek`
                    : `${projects.length} proyek`}
            </p>

            {/* Grid Kartu Proyek */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => {
                    const isVisible = visibleIds.has(project.id);

                    return (
                    <article
                        key={project.id}
                        data-reveal
                        className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-sand transition-all duration-300 hover:border-neutral-900 hover:shadow-lg"
                        style={{
                            '--reveal-delay': `${index * 90}ms`,
                            display: isVisible ? undefined : 'none',
                        }}
                    >
                        {/* Pratinjau: tombol agar bisa dibuka dengan keyboard maupun pembaca layar */}
                        <button
                            type="button"
                            aria-haspopup="dialog"
                            aria-label={`Buka studi kasus ${project.title}`}
                            onClick={(event) => openProject(project, event.currentTarget)}
                            className="relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-900"
                        >
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.imageAlt}
                                    width="1440"
                                    height="900"
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[16/10] w-full bg-cream object-contain"
                                />
                            ) : (
                                <div
                                    aria-hidden="true"
                                    className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 bg-cream px-6 text-center"
                                >
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                                        Pratinjau segera hadir
                                    </span>
                                    <span className="max-w-[22ch] text-2xl font-extrabold uppercase leading-none tracking-tight text-neutral-900">
                                        {project.title}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                                        {project.tech.join(' · ')}
                                    </span>
                                </div>
                            )}
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
                    );
                })}
            </div>

            {filteredProjects.length === 0 && (
                <div className="rounded-2xl border border-dashed border-neutral-400 bg-sand px-6 py-14 text-center">
                    <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">// Tidak ada hasil</p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight">Proyek tidak ditemukan.</h3>
                    <p className="mx-auto mt-2 max-w-md text-sm font-light leading-relaxed text-neutral-600">
                        Coba kata kunci lain, atau kembali ke semua kategori untuk melihat seluruh proyek.
                    </p>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-6 rounded-full border border-neutral-900 bg-neutral-900 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-cream transition hover:bg-lime hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
                    >
                        Reset pencarian
                    </button>
                </div>
            )}

            <CaseStudyModal
                project={activeProject}
                onClose={closeProject}
                returnFocusRef={triggerRef}
            />
        </section>
    );
}
