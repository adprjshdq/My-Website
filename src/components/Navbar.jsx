import { useCallback, useEffect, useRef, useState } from 'react';
import ScrollProgress from './ScrollProgress';
import MobileMenu from './MobileMenu';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import useActiveSection from '../hooks/useActiveSection';
import { useLang } from '../i18n/useLang.js';

/* id section sengaja tetap bahasa Inggris dan tidak ikut berubah saat bahasa
   diganti, supaya anchor serta indikator menu aktif tetap bekerja. */
const NAV_ITEMS = [
    { id: 'about', key: 'about' },
    { id: 'projects', key: 'projects' },
    { id: 'expertise', key: 'expertise' },
    { id: 'certificates', key: 'certificates' },
    { id: 'journey', key: 'journey' },
];

export default function Navbar() {
    const { t } = useLang();

    // 'contact' ikut dipantau supaya tidak ada menu yang tetap terlihat aktif
    // saat pengunjung sudah berada di area footer/kontak.
    const isCertificatesPage = window.location.pathname.replace(/\/$/, '') === '/certificates';
    const activeSection = useActiveSection([...NAV_ITEMS.filter((item) => item.id !== 'certificates').map((item) => item.id), 'contact']);
    const active = isCertificatesPage ? 'certificates' : activeSection;
    const isContact = active === 'contact';

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleRef = useRef(null);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const items = NAV_ITEMS.map((item) => ({
        ...item,
        label: t.nav[item.key],
        href: item.id === 'certificates' ? '/certificates' : (isCertificatesPage ? `/#${item.id}` : `#${item.id}`),
    }));

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
                className="w-full px-6 md:px-16 py-6 flex items-center justify-between sticky top-0 bg-canvas/80 backdrop-blur-md z-50"
            >
                {/* 1. Logo & Subtitle Kiri */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <a href="/" className="font-bold tracking-wider text-sm md:text-base uppercase rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas">
                            ADIPRAJA
                        </a>
                        <span className="text-[10px] md:text-xs text-fg-subtle font-mono tracking-tight">
                            {t.nav.brandSub}
                        </span>
                    </div>
                </div>

                {/* 2. Menu Navigasi Tengah (desktop) */}
                <nav
                    aria-label={t.nav.mainLabel}
                    className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-widest"
                >
                    {items.map(({ id, label }) => {
                        const isActive = active === id;

                        return (
                            <a
                                key={id}
                                href={id === 'certificates' ? '/certificates' : (isCertificatesPage ? `/#${id}` : `#${id}`)}
                                aria-current={isActive ? 'location' : undefined}
                                className={`group relative rounded-sm py-1 transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas ${isActive ? 'text-fg font-semibold' : 'text-fg-muted'
                                    }`}
                            >
                                {label}
                                <span
                                    aria-hidden="true"
                                    className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                />
                            </a>
                        );
                    })}
                </nav>

                {/* 3. Tombol Kanan */}
                <div className="flex items-center gap-3 md:gap-4">
                    <LanguageToggle />
                    <ThemeToggle className="hidden md:inline-flex" />

                    <a
                        href={isCertificatesPage ? '/#contact' : '#contact'}
                        aria-current={isContact ? 'location' : undefined}
                        className={`hidden md:flex bg-accent text-accent-ink text-xs font-medium tracking-wider px-5 py-2.5 rounded-full hover:bg-accent-strong transition items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${isContact ? 'ring-2 ring-fg/30 ring-offset-2 ring-offset-canvas' : ''
                            }`}
                    >
                        {t.nav.contact} <span className="text-sm">→</span>
                    </a>

                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={() => setMenuOpen((isOpen) => !isOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        aria-haspopup="dialog"
                        aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
                        className="md:hidden relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/15 text-fg transition-colors before:absolute before:-inset-1 before:content-[''] hover:bg-fg hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                    >
                        <span aria-hidden="true" className="flex flex-col items-end gap-[5px]">
                            <span className="block h-[1.5px] w-5 bg-current" />
                            <span className="block h-[1.5px] w-3.5 bg-current" />
                        </span>
                    </button>
                </div>

                {/* 4. Progress bar scroll (menempel di tepi bawah header) */}
                <ScrollProgress />
            </header >

            <MobileMenu
                id="mobile-menu"
                open={menuOpen}
                onClose={closeMenu}
                items={items}
                active={active}
                returnFocusRef={toggleRef}
            />
        </>
    );
}
