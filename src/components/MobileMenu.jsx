import { useEffect, useRef } from 'react';

const CONTACT = {
    email: 'shidqiadipraja@gmail.com',
};

/**
 * Drawer navigasi untuk layar kecil.
 *
 * Sengaja dirender di luar <header> karena header memakai `backdrop-blur`,
 * dan elemen dengan backdrop-filter menjadi containing block untuk
 * keturunan `position: fixed` — drawer akan ikut terpotong di dalam header.
 */
export default function MobileMenu({ id, open, onClose, items, active, returnFocusRef }) {
    const panelRef = useRef(null);

    // Kunci scroll halaman selama drawer terbuka.
    useEffect(() => {
        if (!open) return undefined;

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

        // Simpan elemen pemicu sekarang; nilai ref bisa berubah saat cleanup.
        const trigger = returnFocusRef?.current;

        const focusTimer = window.setTimeout(() => {
            // Fokus ke dialognya sendiri: pembaca layar langsung membacakan
            // nama menu, dan tidak ada cincin fokus besar di salah satu link.
            panelRef.current?.focus({ preventScroll: true });
        }, 60);

        const focusables = () =>
            [...(panelRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [])];

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

            // Fokus awal ada di panel dialog itu sendiri.
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

            // Kembalikan fokus ke tombol pembuka, kecuali tombolnya sudah
            // tidak tampil (mis. layar melebar ke ukuran desktop).
            if (trigger && trigger.offsetParent !== null) {
                trigger.focus({ preventScroll: true });
            }
        };
        // `open` sengaja jadi satu-satunya dependensi: efek ini hanya untuk
        // siklus buka/tutup, bukan setiap kali props lain berubah.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleNavigate = (event, sectionId) => {
        event.preventDefault();
        onClose();

        // Tunggu sampai scroll halaman dipulihkan oleh cleanup di atas,
        // baru lompat ke section tujuan (kalau tidak, posisinya tertimpa).
        window.setTimeout(() => {
            const target = document.getElementById(sectionId);
            if (!target) return;

            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            window.history.replaceState(null, '', `#${sectionId}`);
        }, 90);
    };

    const isContact = active === 'contact';

    return (
        <div
            className={`fixed inset-0 z-[60] md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
            inert={!open}
        >
            {/* Latar gelap yang bisa diketuk untuk menutup */}
            <div
                aria-hidden="true"
                onClick={onClose}
                className={`absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${open ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Panel drawer dari kanan */}
            <div
                id={id}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Menu navigasi"
                tabIndex={-1}
                className={`absolute right-0 top-0 flex h-full w-[min(20rem,85vw)] flex-col bg-[#f4f3ef] shadow-2xl outline-none transition-transform duration-300 ease-out motion-reduce:transition-none ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between border-b border-neutral-300 px-6 py-5">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold uppercase tracking-wider">
                            ADIPRAJA<span className="text-neutral-400"> S.A</span>
                        </span>
                        <span className="font-mono text-[10px] tracking-tight text-neutral-500">
                            WEB DEVELOPMENT
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup menu"
                        className="bg-[#bef264] inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-900/15 text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-[#f4f3ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                <nav aria-label="Navigasi mobile" className="flex-1 overflow-y-auto px-6 pb-4 pt-6">
                    <span aria-hidden="true" className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                        // MENU
                    </span>
                    <ul>
                        {items.map(({ id: sectionId, label }, index) => {
                            const isActive = active === sectionId;

                            return (
                                <li key={sectionId}>
                                    <a
                                        href={`#${sectionId}`}
                                        onClick={(event) => handleNavigate(event, sectionId)}
                                        aria-current={isActive ? 'location' : undefined}
                                        className="group flex items-center gap-4 border-b border-neutral-300/80 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f3ef]"
                                    >
                                        <span className={`font-mono text-[10px] tracking-widest ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`}>
                                            0{index + 1}
                                        </span>
                                        <span
                                            className={`text-2xl font-extrabold uppercase tracking-tight transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-500 group-hover:text-neutral-900'
                                                }`}
                                        >
                                            {label}
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className={`ml-auto h-2.5 w-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${isActive
                                                    ? 'scale-100 bg-[#bef264] shadow-[0_0_0_1px_rgba(20,20,20,0.3)]'
                                                    : 'scale-0 bg-transparent'
                                                }`}
                                        />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="space-y-4 border-t border-neutral-300 px-6 py-6">
                    <a
                        href="#contact"
                        onClick={(event) => handleNavigate(event, 'contact')}
                        aria-current={isContact ? 'location' : undefined}
                        className={`flex items-center justify-between rounded-full bg-[#bef264] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-black transition-colors hover:bg-[#accb52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 ${isContact ? 'ring-2 ring-neutral-900/30 ring-offset-2 ring-offset-[#f4f3ef]' : ''
                            }`}
                    >
                        LET'S TALK
                        <span aria-hidden="true" className="text-sm">→</span>
                    </a>

                    <a
                        href={`mailto:${CONTACT.email}`}
                        className="block break-all font-mono text-[11px] text-neutral-500 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30"
                    >
                        {CONTACT.email}
                    </a>
                </div>
            </div>
        </div>
    );
}
