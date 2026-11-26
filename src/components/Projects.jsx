import { useCallback, useMemo, useRef, useState } from 'react';
import CaseStudyModal from './CaseStudyModal';
import { getProjects } from '../data/projects';
import { useLang } from '../i18n/useLang.js';

const ALL_CATEGORIES = 'all';

const normalizeQuery = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim();

/* Animasi buka/tutup folder: tinggi dianimasikan lewat grid-template-rows
   (0fr <-> 1fr) supaya tetap mulus meski isinya tinggi dan responsif. */
const FOLDER_TRANSITION =
    'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none';

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState(ALL_CATEGORIES);
    const triggerRef = useRef(null);
    const coverRef = useRef(null);
    const closeRef = useRef(null);

    const { lang, t } = useLang();
    const projects = useMemo(() => getProjects(lang), [lang]);
    const projectCount = String(projects.length).padStart(2, '0');

    /* Indeks teks dibuat dari data proyek bahasa aktif, sehingga menambah proyek
       baru di projectsCore.js / projectsCore.en.js otomatis ikut bisa dicari. */
    const projectSearchIndex = useMemo(
        () =>
            new Map(
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
            ),
        [projects]
    );

    const categoryFilters = useMemo(() => {
        const seen = new Set();
        const filters = [{ value: ALL_CATEGORIES, label: t.projects.allCategories }];

        for (const project of projects) {
            if (seen.has(project.categoryKey)) continue;
            seen.add(project.categoryKey);
            filters.push({ value: project.categoryKey, label: project.category });
        }

        return filters;
    }, [projects, t]);

    const normalizedQuery = normalizeQuery(query);

    const filteredProjects = useMemo(
        () =>
            projects.filter((project) => {
                const matchesCategory =
                    category === ALL_CATEGORIES || project.categoryKey === category;
                const matchesQuery =
                    normalizedQuery === '' || projectSearchIndex.get(project.id).includes(normalizedQuery);

                return matchesCategory && matchesQuery;
            }),
        [projects, projectSearchIndex, category, normalizedQuery]
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

    // Fokus dipindah ke tombol tutup karena tombol sampul ikut terlipat.
    const openFolder = useCallback(() => {
        setIsFolderOpen(true);
        window.requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    }, []);

    const closeFolder = useCallback(() => {
        setIsFolderOpen(false);
        window.requestAnimationFrame(() => coverRef.current?.focus({ preventScroll: true }));
    }, []);

    const openProject = (project, trigger) => {
        triggerRef.current = trigger;
        setActiveProject(project);
    };

    const closeProject = useCallback(() => setActiveProject(null), []);

    return (
        <section id="projects" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-line">
            {/* Header Bagian Projects */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                <div data-reveal>
                    <span className="text-xs font-mono tracking-widest uppercase text-fg-subtle"> {t.projects.kicker} </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">{t.projects.titleLine1} <span className='block text-accent-text text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2'>{t.projects.titleLine2}</span></h2>
                </div>
                <p data-reveal style={{ '--reveal-delay': '100ms' }} className="text-fg-muted text-sm md:text-base max-w-md font-light">
                    {t.projects.intro}
                </p>
            </div>

            {/* Folder arsip proyek */}
            <div data-reveal style={{ '--reveal-delay': '150ms' }} className="relative pt-10">
                {/* Tab folder: rata tepi kanan, menimpa 1px garis atas badan folder */}
                <div
                    aria-hidden="true"
                    className="absolute right-0 top-0 z-10 flex h-[41px] w-36 items-end justify-between rounded-tl-lg rounded-tr-2xl border border-b-0 border-line bg-surface-muted px-4 pb-2 font-mono text-[10px] uppercase tracking-widest text-fg-subtle md:w-44"
                >
                    <span>{t.projects.folderTab(projectCount)}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>

                {/* Badan folder */}
                <div className="relative rounded-2xl rounded-tr-none border border-line bg-surface-muted p-3 md:p-4">
                    {/* Sampul folder — terlipat saat arsip dibuka */}
                    <div
                        className={`${FOLDER_TRANSITION} ${isFolderOpen ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}
                        inert={isFolderOpen}
                    >
                        <div className="min-h-0 overflow-hidden">
                            <button
                                ref={coverRef}
                                type="button"
                                onClick={openFolder}
                                aria-expanded={isFolderOpen}
                                aria-controls="project-panel"
                                className="group/cover block w-full rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg"
                            >
                                <span className="relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-xl border border-line bg-canvas p-6 transition-colors duration-300 group-hover/cover:border-fg md:min-h-[23rem] md:p-10">
                                    <span className="flex items-start justify-between gap-4">
                                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-fg-subtle md:text-[10px] md:tracking-[0.25em]">
                                            {t.projects.archive}
                                        </span>
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg-subtle transition duration-300 group-hover/cover:border-fg group-hover/cover:bg-accent group-hover/cover:text-accent-ink">
                                            <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1M3 8v9a2 2 0 0 0 2 2h12.4a2 2 0 0 0 1.9-1.4l1.7-5.1a1 1 0 0 0-1-1.3H6.9a2 2 0 0 0-1.9 1.4L3 19" />
                                            </svg>
                                        </span>
                                    </span>

                                    <span className="block py-8 md:py-10">
                                        <span className="block text-[13vw] font-extrabold uppercase leading-[0.82] tracking-tight text-fg md:text-[6rem]">
                                            {t.projects.coverLine1}
                                        </span>
                                        <span className="block text-[13vw] font-extrabold uppercase leading-[0.82] tracking-tight text-accent-text md:text-[6rem]">
                                            {t.projects.coverLine2}
                                        </span>
                                        <span className="mt-5 block max-w-sm text-sm font-light leading-relaxed text-fg-muted">
                                            {t.projects.coverHint}
                                        </span>
                                    </span>

                                    <span className="flex flex-wrap items-end justify-between gap-4 border-t border-line/70 pt-5">
                                        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fg">
                                            {t.projects.openFolder}
                                            <span aria-hidden="true" className="transition-transform duration-300 group-hover/cover:translate-x-1">
                                                →
                                            </span>
                                        </span>
                                        <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                                            {t.projects.folderCount(projectCount)}
                                        </span>
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Isi folder — muncul setelah folder diklik */}
                    <div
                        id="project-panel"
                        className={`${FOLDER_TRANSITION} ${isFolderOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        inert={!isFolderOpen}
                    >
                        <div className="min-h-0 overflow-hidden">
                            <div className="flex flex-col gap-5">
                                {/* Toolbar: jumlah hasil & tombol tutup */}
                                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-4 pt-1">
                                    <p
                                        role="status"
                                        aria-live="polite"
                                        className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle"
                                    >
                                        {isFiltering
                                            ? t.projects.showing(filteredProjects.length, projects.length)
                                            : t.projects.folderCount(projects.length)}
                                    </p>
                                    <button
                                        ref={closeRef}
                                        type="button"
                                        onClick={closeFolder}
                                        aria-controls="project-panel"
                                        className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-fg-muted transition hover:border-fg hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-muted"
                                    >
                                        <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                        {t.projects.closeFolder}
                                    </button>
                                </div>

                                {/* Pencarian & Filter Kategori */}
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="relative w-full lg:max-w-sm">
                                        <label htmlFor="project-search" className="sr-only">
                                            {t.projects.searchLabel}
                                        </label>
                                        <svg
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle"
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
                                            placeholder={t.projects.searchPlaceholder}
                                            autoComplete="off"
                                            enterKeyHint="search"
                                            className="w-full rounded-full border border-line bg-canvas py-3 pl-11 pr-11 text-sm text-fg transition placeholder:text-fg-subtle focus:border-fg"
                                        />
                                        {query !== '' && (
                                            <button
                                                type="button"
                                                onClick={() => setQuery('')}
                                                aria-label={t.projects.clearSearch}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-fg-subtle transition hover:bg-fg hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40"
                                            >
                                                <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    <div role="group" aria-label={t.projects.filterLabel} className="flex flex-wrap gap-2">
                                        {categoryFilters.map((filter) => {
                                            const isActive = category === filter.value;

                                            return (
                                                <button
                                                    key={filter.value}
                                                    type="button"
                                                    aria-pressed={isActive}
                                                    onClick={() => setCategory(filter.value)}
                                                    className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition ${isActive
                                                        ? 'border-fg bg-accent text-accent-ink'
                                                        : 'border-line bg-canvas text-fg-muted hover:border-fg hover:text-fg'
                                                        }`}
                                                >
                                                    {filter.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Grid Kartu Proyek */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                                    {projects.map((project, index) => {
                                        const isVisible = visibleIds.has(project.id);

                                        return (
                                            <article
                                                key={project.id}
                                                data-reveal
                                                className="group flex flex-col overflow-hidden rounded-xl border border-line bg-canvas shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-fg hover:shadow-lg"
                                                style={{
                                                    '--reveal-delay': `${index * 90}ms`,
                                                    display: isVisible ? undefined : 'none',
                                                }}
                                            >
                                                {/* Pratinjau */}
                                                <button
                                                    type="button"
                                                    aria-haspopup="dialog"
                                                    aria-label={t.projects.cardAria(project.title)}
                                                    onClick={(event) => openProject(project, event.currentTarget)}
                                                    className="relative block w-full border-b border-line/70 bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg"
                                                >
                                                    {project.image ? (
                                                        <img
                                                            src={project.image}
                                                            alt={project.imageAlt}
                                                            width="1440"
                                                            height="900"
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="aspect-[16/10] w-full object-contain"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 bg-surface-muted px-6 text-center"
                                                        >
                                                            <span className="font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
                                                                {t.projects.previewSoon}
                                                            </span>
                                                            <span className="max-w-[22ch] text-2xl font-extrabold uppercase leading-none tracking-tight text-fg">
                                                                {project.title}
                                                            </span>
                                                            <span className="font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
                                                                {project.tech.join(' · ')}
                                                            </span>
                                                        </span>
                                                    )}
                                                    {project.imageNote && (
                                                        <span className="absolute left-3 top-3 rounded-full border border-line bg-canvas/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-fg-muted backdrop-blur">
                                                            {project.imageNote}
                                                        </span>
                                                    )}
                                                </button>

                                                <div className="flex flex-1 flex-col p-5 md:p-6">
                                                    {/* Nomor Urut, Kategori & Link GitHub */}
                                                    <div className="flex items-center justify-between font-mono text-[11px] mb-4">
                                                        <span className="text-fg-subtle">
                                                            {project.id} / {project.category}
                                                        </span>

                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={t.projects.githubAria(project.title)}
                                                            title={t.projects.githubTitle}
                                                            className="rounded-full border border-line p-2.5 text-fg transition hover:-translate-y-0.5 hover:border-fg hover:bg-fg hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                                                        >
                                                            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                            </svg>
                                                        </a>
                                                    </div>

                                                    {/* Judul & Ringkasan */}
                                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
                                                        {project.title}
                                                    </h3>
                                                    <p className="mb-5 text-sm font-light leading-relaxed text-fg-muted">
                                                        {project.summary}
                                                    </p>

                                                    <div className="mt-auto">
                                                        {/* Badge Tech Stack */}
                                                        <div className="flex flex-wrap gap-2 border-t border-line/70 pt-4">
                                                            {project.tech.map((item) => (
                                                                <span
                                                                    key={item}
                                                                    className="text-[11px] font-mono px-3 py-1 rounded-full bg-accent text-accent-ink"
                                                                >
                                                                    {item}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        <button
                                                            type="button"
                                                            aria-haspopup="dialog"
                                                            onClick={(event) => openProject(project, event.currentTarget)}
                                                            className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fg underline decoration-fg-subtle decoration-1 underline-offset-4 transition hover:decoration-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
                                                        >
                                                            {t.projects.readCaseStudy} <span aria-hidden="true">→</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>

                                {filteredProjects.length === 0 && (
                                    <div className="rounded-xl border border-dashed border-line bg-canvas px-6 py-14 text-center">
                                        <p className="font-mono text-xs uppercase tracking-widest text-fg-subtle">{t.projects.emptyKicker}</p>
                                        <h3 className="mt-3 text-xl font-bold tracking-tight">{t.projects.emptyTitle}</h3>
                                        <p className="mx-auto mt-2 max-w-md text-sm font-light leading-relaxed text-fg-muted">
                                            {t.projects.emptyBody}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="mt-6 rounded-full border border-fg bg-fg px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-canvas transition hover:bg-accent hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                                        >
                                            {t.projects.reset}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CaseStudyModal
                project={activeProject}
                onClose={closeProject}
                returnFocusRef={triggerRef}
            />
        </section>
    );
}
