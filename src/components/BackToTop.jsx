import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/useLang.js';

/**
 * Tombol "kembali ke atas".
 *
 * Muncul setelah pengunjung melewati sekitar satu layar. Saat section kontak
 * atau footer mulai terlihat, tombol disembunyikan: halaman sudah berada di
 * ujung bawah, dan di layar kecil tombol ini menutupi input form.
 */
export default function BackToTop() {
    const { t } = useLang();
    const [visible, setVisible] = useState(false);
    const [assistantOpen, setAssistantOpen] = useState(false);
    const visibleRef = useRef(false);

    // Saat panel asisten terbuka, tombol ini disembunyikan agar tidak tertimbun
    // panel dan tidak bisa dijangkau Tab di belakangnya.
    useEffect(() => {
        const onAssistantVisibility = (event) => setAssistantOpen(Boolean(event.detail));

        window.addEventListener('assistant:visibility', onAssistantVisibility);
        return () => window.removeEventListener('assistant:visibility', onAssistantVisibility);
    }, []);

    useEffect(() => {
        let frame = 0;
        const footer = document.getElementById('contact');

        const update = () => {
            frame = 0;
            // Ambang batas: minimal 480px, atau 80% tinggi layar di HP.
            const threshold = Math.max(480, window.innerHeight * 0.8);
            // Footer dianggap sudah terlihat bila menutupi 120px terbawah layar.
            const nearFooter = !!footer && footer.getBoundingClientRect().top <= window.innerHeight - 120;
            const next = window.scrollY > threshold && !nearFooter;

            if (next !== visibleRef.current) {
                visibleRef.current = next;
                setVisible(next);
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

    const shown = visible && !assistantOpen;

    return (
        <button
            type="button"
            onClick={handleClick}
            inert={!shown}
            aria-label={t.backToTop}
            className={`group fixed bottom-24 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-cream shadow-lg ring-1 ring-cream/25 transition-all duration-300 hover:bg-lime hover:text-neutral-900 motion-reduce:transition-none md:bottom-28 md:right-8 md:h-12 md:w-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                }`}
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
