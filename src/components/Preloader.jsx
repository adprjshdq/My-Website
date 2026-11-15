import { useState, useEffect, useRef } from 'react';

export default function Preloader({ onReveal, onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isHiding, setIsHiding] = useState(false);

    // Simpan callback di ref supaya effect tidak restart saat parent re-render
    const onRevealRef = useRef(onReveal);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onRevealRef.current = onReveal;
        onCompleteRef.current = onComplete;
    }, [onReveal, onComplete]);

    useEffect(() => {
        let hideTimer;
        let completeTimer;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    hideTimer = setTimeout(() => {
                        setIsHiding(true);
                        // Muat konten tepat saat tirai mulai naik
                        if (onRevealRef.current) onRevealRef.current();
                        completeTimer = setTimeout(() => {
                            if (onCompleteRef.current) onCompleteRef.current();
                        }, 700); // Lama animasi tirai naik
                    }, 120);
                    return 100;
                }
                return prev + 5; // Kecepatan naik angka persentase
            });
        }, 30);

        return () => {
            clearInterval(timer);
            clearTimeout(hideTimer);
            clearTimeout(completeTimer);
        };
    }, []);

    return (
        <div
            className={`fixed inset-0 z-50 bg-ink text-white flex flex-col justify-between p-8 md:p-14 transition-transform duration-700 ease-in-out ${isHiding ? '-translate-y-full' : 'translate-y-0'
                }`}
        >
            {/* Baris Atas */}
            <div className="flex justify-between items-center font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                <span>ADIPRAJA</span>
                <span>PORTOFOLIO • 2026</span>
            </div>

            {/* Bagian Tengah: Teks & Progress Bar */}
            <div className="max-w-xl w-full">
                <span className="font-mono text-xs tracking-widest text-lime block mb-2"> // INITIALIZING </span>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-6">LOADING<span className="text-lime">...</span></h2>

                {/* Garis Progress Bar */}
                <div className="w-full h-[2px] bg-neutral-800 overflow-hidden">
                    <div
                        className="h-full bg-lime transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Baris Bawah: Tagline & Angka Persentase */}
            <div className="flex justify-between items-end">
                <span className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase">
                    SYSTEM LOGIC & EXPERIENCES
                </span>
                <span className="font-mono text-3xl md:text-5xl font-bold text-lime">
                    {progress}%
                </span>
            </div>
        </div>
    );
}
