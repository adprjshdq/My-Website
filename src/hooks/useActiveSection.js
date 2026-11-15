import { useEffect, useRef, useState } from 'react';

/* Menentukan section mana yang sedang aktif di navbar. */

export default function useActiveSection(ids = []) {
    const [active, setActive] = useState('');
    const activeRef = useRef('');
    const idsKey = ids.join('|');

    useEffect(() => {
        const list = idsKey.split('|').filter(Boolean);
        if (!list.length) return undefined;

        const sections = list
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (!sections.length) return undefined;

        let frame = 0;
        // Sedikit lebih besar dari tinggi header + jarak scroll-padding, agar
        // section yang baru dituju lewat anchor langsung dianggap aktif.
        let offset = 104;

        const measure = () => {
            const header = document.querySelector('header');
            offset = (header?.offsetHeight ?? 0) + 16;
        };

        const update = () => {
            frame = 0;

            let current = '';
            sections.forEach((section) => {
                if (section.getBoundingClientRect().top - offset <= 0) {
                    current = section.id;
                }
            });

            if (current !== activeRef.current) {
                activeRef.current = current;
                setActive(current);
            }
        };

        const schedule = () => {
            if (frame) return;
            frame = requestAnimationFrame(update);
        };

        const onResize = () => {
            measure();
            schedule();
        };

        measure();
        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', onResize);
        };
    }, [idsKey]);

    return active;
}
