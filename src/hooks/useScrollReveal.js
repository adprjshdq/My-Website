import { useEffect } from 'react';

/* Menambahkan class `is-visible` ke setiap elemen `[data-reveal]` saat elemen tersebut masuk ke viewport. Jeda antar elemen diatur lewat CSS variable `--reveal-delay'.*/
export default function useScrollReveal(enabled = true) {
    useEffect(() => {
        if (!enabled) return undefined;

        const elements = Array.from(document.querySelectorAll('[data-reveal]'));

        if (typeof IntersectionObserver === 'undefined') {
            elements.forEach((el) => el.classList.add('is-visible'));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [enabled]);
}
