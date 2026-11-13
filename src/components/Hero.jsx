import fotoAdipraja from '../assets/tecnic.webp';

export default function Hero() {
    return (
        <section className="px-6 md:px-16 pt-12 pb-16 md:pt-16 md:pb-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Bagian Teks Kiri */}
            <div className="space-y-6 max-w-2xl">
                <div className="animate-fade-up opacity-0 [animation-delay:200ms]">
                    <span className="text-xs font-mono tracking-widest uppercase bg-[#bef264] text-neutral-800 px-3.5 py-1.5 rounded-full inline-block">
                        // Student Informatics
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.1] animate-fade-up opacity-0 [animation-delay:400ms]">

                    {/* Text Reveal Animation */}
                    <span className="inline-block overflow-hidden align-bottom">
                        <span className="inline-block opacity-0 animate-[textReveal_900ms_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:500ms]">
                            Interactive
                        </span>
                    </span>{' '}

                    <span className="inline-block overflow-hidden align-bottom">
                        <span className="inline-block font-serif italic font-normal text-neutral-500 opacity-0 animate-[textReveal_900ms_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:700ms]">
                            Fullstack
                        </span>
                    </span>{' '}

                    <span className="inline-block overflow-hidden align-bottom">
                        <span className="inline-block opacity-0 animate-[textReveal_900ms_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:900ms]">
                            Enthusiast.
                        </span>
                    </span>
                </h1>

                <p className="border-t text-neutral-600 text-lg md:text-xl font-light leading-relaxed animate-fade-up opacity-0 [animation-delay:600ms]">
                    Halo! Saya <span className="font-semibold text-neutral-900">Adipraja</span>. Berfokus pada perancangan dan pengembangan aplikasi web yang dinamis, modern, serta interaktif dengan kualitas rekayasa end-to-end yang solid.
                </p>

                <div className="flex flex-wrap gap-4 pt-4 animate-fade-up opacity-0 [animation-delay:800ms]">
                    {/* Tombol Utama dengan Warna Hijau Lime ala Video Referensi */}
                    <a
                        href="#projects"
                        className="bg-[#bef264] text-neutral-900 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider hover:bg-[#accb52] transition shadow-md flex items-center gap-2 hover:scale-105"
                    >
                        VIEW SELECTED WORK <span>↓</span>
                    </a>
                    <a
                        href="#contact"
                        className="border border-neutral-400 text-neutral-900 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider hover:bg-neutral-200/60 transition hover:scale-105"
                    >
                        CONTACT ME
                    </a>
                    <a
                        href="#contact"
                        className="border border-neutral-400 text-neutral-900 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider hover:bg-neutral-200/60 transition hover:scale-105"
                    >
                        DOWNLOAD CV
                    </a>
                </div>
            </div>

            {/* Bagian Visual / Foto Profil Kanan */}
            <div className="w-full md:w-auto flex justify-center animate-fade-up opacity-0 [animation-delay:500ms]">
                <div className="w-72 h-96 md:w-80 md:h-[420px] bg-neutral-200 rounded-2xl shadow-2xl overflow-hidden border border-neutral-300 relative flex items-center justify-center group hover:scale-[1.02] transition duration-500">
                    <img
                        src={fotoAdipraja}
                        alt="foto adipraja"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700"
                    />
                </div>
            </div>
        </section>
    );
}