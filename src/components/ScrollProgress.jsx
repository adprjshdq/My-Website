import { useEffect, useRef } from 'react';

/**
 * Garis progress scroll di tepi bawah header.
 *
 * Nilai progress ditulis langsung ke style elemen (bukan state) supaya
 * tidak memicu re-render React di setiap frame scroll.
 */
export default function ScrollProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return undefined;

        let frame = 0;

        const update = () => {
            frame = 0;
            const doc = document.documentElement;
            const maxScroll = doc.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
            bar.style.transform = `scaleX(${progress})`;
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

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-neutral-900/[0.07]"
        >
            <div
                ref={barRef}
                className="h-full w-full origin-left scale-x-0 bg-neutral-900"
            />
        </div>
    );
}
