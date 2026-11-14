import { useCallback, useEffect, useRef, useState } from 'react';
import ScrollProgress from './ScrollProgress';
import MobileMenu from './MobileMenu';
import useActiveSection from '../hooks/useActiveSection';

const NAV_ITEMS = [
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'WORK' },
    { id: 'expertise', label: 'EXPERTISE' },
    { id: 'journey', label: 'JOURNEY' },
];

export default function Navbar() {
    // 'contact' ikut dipantau supaya tidak ada menu yang tetap terlihat aktif
    // saat pengunjung sudah berada di area footer/kontak.
    const active = useActiveSection([...NAV_ITEMS.map((item) => item.id), 'contact']);
    const isContact = active === 'contact';

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleRef = useRef(null);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    // Tutup drawer otomatis ketika layar melebar ke ukuran desktop,
    // supaya tidak ada dua navigasi aktif sekaligus.
    useEffect(() => {
        if (!menuOpen) return undefined;

        const query = window.matchMedia('(min-width: 768px)');
        const handleChange = (event) => {
            if (event.matches) setMenuOpen(false);
        };

        query.addEventListener('change', handleChange);
        return () => query.removeEventListener('change', handleChange);
    }, [menuOpen]);

    return (
        <>
            <header
                data-active={active || undefined}
                className="w-full px-6 md:px-16 py-6 flex items-center justify-between sticky top-0 bg-[#f4f3ef]/80 backdrop-blur-md z-50"
            >
                {/* 1. Logo & Subtitle Kiri */}
                <div className="flex flex-col">
                    <a href="#" className="font-bold tracking-wider text-sm md:text-base uppercase">
                        ADIPRAJA<span className="text-neutral-400"> S.A</span>
                    </a>
                    <span className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-tight">
                        WEB DEVELOPMENT
                    </span>
                </div>

                {/* 2. Menu Navigasi Tengah (desktop) */}
                <nav
                    aria-label="Navigasi utama"
                    className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-widest"
                >
                    {NAV_ITEMS.map(({ id, label }) => {
                        const isActive = active === id;

                        return (
                            <a
                                key={id}
                                href={`#${id}`}
                                aria-current={isActive ? 'location' : undefined}
                                className={`group relative py-1 transition-colors hover:text-neutral-900 ${isActive ? 'text-neutral-900 font-semibold' : 'text-neutral-600'
                                    }`}
                            >
                                {label}
                                <span
                                    aria-hidden="true"
                                    className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[#bef264] transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                />
                            </a>
                        );
                    })}
                </nav>

                {/* 3. Tombol Kanan */}
                <div className="flex items-center gap-2">
                    <a
                        href="#contact"
                        aria-current={isContact ? 'location' : undefined}
                        className={`hidden md:flex bg-[#bef264] text-black text-xs font-medium tracking-wider px-5 py-2.5 rounded-full hover:bg-[#accb52] transition items-center gap-2 shadow-sm ${isContact ? 'ring-2 ring-neutral-900/30 ring-offset-2 ring-offset-[#f4f3ef]' : ''
                            }`}
                    >
                        LET'S TALK <span className="text-sm">→</span>
                    </a>

                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={() => setMenuOpen((isOpen) => !isOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-haspopup="dialog"
                        aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
                        className="md:hidden relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/15 text-neutral-900 transition-colors before:absolute before:-inset-1 before:content-[''] hover:bg-neutral-900 hover:text-[#f4f3ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f3ef]"
                    >
                        <span aria-hidden="true" className="flex flex-col items-end gap-[5px]">
                            <span className="block h-[1.5px] w-5 bg-current" />
                            <span className="block h-[1.5px] w-3.5 bg-current" />
                        </span>
                    </button>
                </div>

                {/* 4. Progress bar scroll (menempel di tepi bawah header) */}
                <ScrollProgress />
            </header>

            <MobileMenu
                id="mobile-menu"
                open={menuOpen}
                onClose={closeMenu}
                items={NAV_ITEMS}
                active={active}
                returnFocusRef={toggleRef}
            />
        </>
    );
}
