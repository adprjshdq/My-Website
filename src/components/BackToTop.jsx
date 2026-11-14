import { useEffect, useRef, useState } from 'react';

/**
 * Tombol "kembali ke atas".
 *
 * Baru muncul setelah pengunjung melewati sekitar satu layar, supaya tidak
 * mengganggu saat masih membaca bagian atas halaman. Nilai tampil ditulis
 * lewat ref agar listener scroll tidak perlu di-render ulang tiap frame.
 */
export default function BackToTop() {
    const [visible, setVisible] = useState(false);
    const [onDark, setOnDark] = useState(false);
    const visibleRef = useRef(false);
    const onDarkRef = useRef(false);

    useEffect(() => {
        let frame = 0;
        const footer = document.getElementById('contact');

        const update = () => {
            frame = 0;
            // Ambang batas: minimal 480px, atau 80% tinggi layar di HP.
            const threshold = Math.max(480, window.innerHeight * 0.8);
            const next = window.scrollY > threshold;

            if (next !== visibleRef.current) {
                visibleRef.current = next;
                setVisible(next);
            }

            // Saat area kontak (latar gelap) mulai menutupi posisi tombol,
            // warna tombol dibalik agar tetap terlihat.
            const dark = !!footer && footer.getBoundingClientRect().top <= window.innerHeight - 72;

            if (dark !== onDarkRef.current) {
                onDarkRef.current = dark;
                setOnDark(dark);
            }
        };

        const schedule = () => {
            if (frame) return;
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    const handleClick = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });

        // Pindahkan fokus ke logo di header supaya pengguna keyboard
        // tidak kehilangan posisi setelah tombol ini tersembunyi.
        document.querySelector('header a[href="#"]')?.focus({ preventScroll: true });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            inert={!visible}
            aria-label="Kembali ke atas"
            className={`group fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full shadow-lg ring-1 transition-all duration-300 motion-reduce:transition-none md:bottom-8 md:right-8 md:h-12 md:w-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bef264] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f3ef] ${onDark
                    ? 'bg-[#bef264] text-neutral-900 ring-neutral-900/10 hover:bg-[#f4f3ef]'
                    : 'bg-neutral-900 text-[#f4f3ef] ring-[#f4f3ef]/25 hover:bg-[#bef264] hover:text-neutral-900'
                } ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
            </svg>
        </button>
    );
}
