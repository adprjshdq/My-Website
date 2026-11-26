import { useEffect, useRef, useState } from 'react';

/* Elemen yang membuat ring membesar saat di-hover. */
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary, label[for]';

/**
 * Mouse follower dekoratif: glow lime yang mengikuti dengan lag dan ring tipis
 * yang bergerak lebih cepat. Kursor native tetap dipakai supaya input teks dan
 * pemilihan teks tidak terganggu.
 */
export default function MouseFollower({ enabled = true }) {
    const glowRef = useRef(null);
    const ringRef = useRef(null);
    const activeRef = useRef(false);
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(false);
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        if (!enabled || typeof window === 'undefined') return undefined;

        // Hanya untuk perangkat dengan pointer presisi (mouse/trackpad).
        if (!window.matchMedia?.('(pointer: fine)').matches) return undefined;

        // Hormati preferensi "kurangi gerakan": tidak ada follower sama sekali.
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

        const glow = glowRef.current;
        const ring = ringRef.current;
        if (!glow || !ring) return undefined;

        const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const glowPos = { ...target };
        const ringPos = { ...target };
        let frame = 0;
        let started = false;

        const render = () => {
            glowPos.x += (target.x - glowPos.x) * 0.08;
            glowPos.y += (target.y - glowPos.y) * 0.08;
            ringPos.x += (target.x - ringPos.x) * 0.22;
            ringPos.y += (target.y - ringPos.y) * 0.22;

            glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) translate(-50%, -50%)`;
            ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;

            frame = requestAnimationFrame(render);
        };

        const handleMove = (event) => {
            if (event.pointerType && event.pointerType !== 'mouse') return;

            target.x = event.clientX;
            target.y = event.clientY;

            if (!started) {
                started = true;
                glowPos.x = ringPos.x = event.clientX;
                glowPos.y = ringPos.y = event.clientY;
                setVisible(true);
            }

            const isInteractive =
                event.target instanceof Element && Boolean(event.target.closest(INTERACTIVE_SELECTOR));

            // Update state hanya saat berubah, bukan setiap gerakan mouse.
            if (isInteractive !== activeRef.current) {
                activeRef.current = isInteractive;
                setActive(isInteractive);
            }
        };

        const handleDown = () => setPressed(true);
        const handleUp = () => setPressed(false);
        const handleLeave = () => setVisible(false);
        const handleEnter = () => {
            if (started) setVisible(true);
        };
        const handleBlur = () => {
            setVisible(false);
            setPressed(false);
        };

        window.addEventListener('pointermove', handleMove, { passive: true });
        window.addEventListener('pointerdown', handleDown);
        window.addEventListener('pointerup', handleUp);
        document.documentElement.addEventListener('mouseleave', handleLeave);
        document.documentElement.addEventListener('mouseenter', handleEnter);
        window.addEventListener('blur', handleBlur);

        frame = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerdown', handleDown);
            window.removeEventListener('pointerup', handleUp);
            document.documentElement.removeEventListener('mouseleave', handleLeave);
            document.documentElement.removeEventListener('mouseenter', handleEnter);
            window.removeEventListener('blur', handleBlur);
        };
    }, [enabled]);

    const ringScale = pressed ? 'scale-75' : active ? 'scale-150' : 'scale-100';

    return (
        <div
            aria-hidden="true"
            data-mouse-follower
            className={`pointer-events-none fixed inset-0 z-[90] overflow-hidden transition-opacity duration-300 ${visible && enabled ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Glow lime: mengikuti paling lambat, memberi kesan jejak. */}
            <div
                ref={glowRef}
                className="absolute left-0 top-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl will-change-transform"
            />

            {/* Ring: mengikuti lebih cepat dan membesar di atas elemen interaktif. */}
            <div ref={ringRef} className="absolute left-0 top-0 will-change-transform">
                <div
                    className={`h-9 w-9 rounded-full border transition-[transform,background-color,border-color] duration-300 ease-out ${ringScale} ${active
                        ? 'border-accent bg-accent/20'
                        : 'border-accent/70'
                        }`}
                />
            </div>
        </div>
    );
}
