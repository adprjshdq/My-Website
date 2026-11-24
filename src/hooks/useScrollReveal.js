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

        const observe = (el) => {
            if (el instanceof Element && el.matches('[data-reveal]')) {
                observer.observe(el);
            }
            el.querySelectorAll?.('[data-reveal]').forEach((child) => observer.observe(child));
        };

        elements.forEach(observe);

        // Language changes and project filters can mount new reveal elements
        // after the initial page scan. Observe them too so they do not remain
        // hidden until a full page refresh.
        const mutations = new MutationObserver((records) => {
            records.forEach((record) => record.addedNodes.forEach(observe));
        });
        mutations.observe(document.body, { childList: true, subtree: true });

        return () => {
            mutations.disconnect();
            observer.disconnect();
        };
    }, [enabled]);
}
