import ScrollProgress from './ScrollProgress';
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

    return (
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

            {/* 2. Menu Navigasi Tengah */}
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

            {/* 3. Tombol Kanan (Let's Talk) */}
            <div>
                <a
                    href="#contact"
                    aria-current={isContact ? 'location' : undefined}
                    className={`bg-[#bef264] text-white text-xs font-medium tracking-wider px-5 py-2.5 rounded-full hover:bg-[#accb52] transition flex items-center gap-2 shadow-sm ${isContact ? 'ring-2 ring-neutral-900/30 ring-offset-2 ring-offset-[#f4f3ef]' : ''
                        }`}
                >
                    LET'S TALK <span className="text-sm">→</span>
                </a>
            </div>

            {/* 4. Progress bar scroll (menempel di tepi bawah header) */}
            <ScrollProgress />
        </header>
    );
}
