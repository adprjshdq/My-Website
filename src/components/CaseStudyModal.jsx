import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function CaseStudyModal({ project, onClose, returnFocusRef }) {
    const panelRef = useRef(null);
    const titleId = useId();
    const descId = useId();

    useEffect(() => {
        if (!project) return undefined;

        const { style } = document.body;
        const scrollY = window.scrollY;
        const previous = {
            position: style.position,
            top: style.top,
            left: style.left,
            right: style.right,
            width: style.width,
            overflow: style.overflow,
        };

        style.position = 'fixed';
        style.top = `-${scrollY}px`;
        style.left = '0';
        style.right = '0';
        style.width = '100%';
        style.overflow = 'hidden';

        const trigger = returnFocusRef?.current;

        const focusTimer = window.setTimeout(() => {
            panelRef.current?.focus({ preventScroll: true });
        }, 60);

        const focusables = () => [
            ...(panelRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? []),
        ];

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== 'Tab') return;

            const nodes = focusables();
            if (!nodes.length) return;

            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            const activeEl = document.activeElement;

            if (event.shiftKey && (activeEl === first || activeEl === panelRef.current)) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && activeEl === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.clearTimeout(focusTimer);
            document.removeEventListener('keydown', handleKeyDown);

            Object.assign(style, previous);
            window.scrollTo({ top: scrollY, behavior: 'instant' });

            if (trigger && trigger.offsetParent !== null) {
                trigger.focus({ preventScroll: true });
            }
        };
        // Cukup bergantung pada proyek yang dibuka; modal di-mount/unmount bersamaan.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project]);

    if (!project) return null;

    return createPortal(
        <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
            <div
                aria-hidden="true"
                onClick={onClose}
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
            />

            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descId}
                tabIndex={-1}
                className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-cream shadow-2xl outline-none animate-[modalIn_260ms_cubic-bezier(0.16,1,0.3,1)] md:max-h-[88vh] md:max-w-3xl md:rounded-2xl"
            >
                <div className="flex items-start justify-between gap-4 border-b border-neutral-300 px-5 py-4 md:px-8">
                    <div className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                            {project.id} / {project.category} · {project.year}
                        </span>
                        <h2
                            id={titleId}
                            className="mt-1 text-xl font-extrabold uppercase leading-tight tracking-tight md:text-2xl"
                        >
                            {project.title}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup studi kasus"
                        className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-900/15 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                <div className="overflow-y-auto overscroll-contain px-5 pb-8 md:px-8">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.imageAlt}
                            className="mt-5 w-full rounded-xl border border-neutral-300 bg-cream"
                        />
                    ) : (
                        <div
                            aria-hidden="true"
                            className="mt-5 flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-neutral-300 bg-cream px-6 text-center"
                        >
                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                                Pratinjau segera hadir
                            </span>
                            <span className="max-w-[26ch] text-2xl font-extrabold uppercase leading-none tracking-tight text-neutral-900">
                                {project.title}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                                {project.tech.join(' · ')}
                            </span>
                        </div>
                    )}

                    <p id={descId} className="mt-5 text-sm font-light leading-relaxed text-neutral-600 md:text-base">
                        {project.summary}
                    </p>

                    <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-neutral-300 py-4 font-mono text-[11px] md:grid-cols-3">
                        <div>
                            <dt className="uppercase tracking-widest text-neutral-400">Peran</dt>
                            <dd className="mt-1 font-sans text-sm font-semibold text-neutral-900">{project.role}</dd>
                        </div>
                        <div>
                            <dt className="uppercase tracking-widest text-neutral-400">Tahun</dt>
                            <dd className="mt-1 font-sans text-sm font-semibold text-neutral-900">{project.year}</dd>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <dt className="uppercase tracking-widest text-neutral-400">Stack</dt>
                            <dd className="mt-1 font-sans text-sm font-semibold text-neutral-900">
                                {project.tech.join(' · ')}
                            </dd>
                        </div>
                    </dl>

                    <div className="mt-6 space-y-6">
                        {project.sections.map((section) => (
                            <div key={section.label}>
                                <h3 className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                    // {section.label}
                                </h3>
                                <p className="mt-2 text-sm font-light leading-relaxed text-neutral-700">
                                    {section.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-7">
                        <h3 className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                            // Fitur utama
                        </h3>
                        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {project.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm font-light text-neutral-700">
                                    <span aria-hidden="true" className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3 border-t border-neutral-300 pt-6">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                        >
                            GitHub <span aria-hidden="true">↗</span>
                        </a>
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-neutral-900/25 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-900 transition-colors hover:bg-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                            >
                                Live <span aria-hidden="true">↗</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
}
