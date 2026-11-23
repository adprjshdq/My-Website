import fotoAdipraja from '../assets/foto-hero.png';

export default function Hero() {
    return (
        <section className="relative overflow-hidden px-6 pt-2 pb-12 md:px-12 md:pt-6 md:pb-20 max-w-7xl mx-auto">
            {/* Layer 1: Teks besar PORTFOLIO di latar belakang */}
            <div
                aria-hidden="true"
                className="pointer-events-none select-none text-center leading-none"
            >
                <span className="text-lime block text-[min(13.5vw,165px)] font-black tracking-tight uppercase text-emerald-600/90">
                    PORTOFOLIO
                </span>
            </div>
            <div aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 left-1/2 z-0 h-48 w-4/5 -translate-x-1/2 rounded-full bg-gradient-to-b from-lime via-lime-300/35 to-transparent blur-2xl">
                </div>

            {/* Area utama gabungan foto & elemen informasi */}
            <div className="relative mt-3 lg:-mt-25 grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
                {/* Kolom Kiri: Sapaan, Nama, Status & Deskripsi */}
                <div className="z-20 space-y-4 lg:col-span-4 text-left animate-fade-up opacity-0 [animation-delay:200ms]">
                    <div className="space-y-1">
                        <p className="font-serif italic text-2xl md:text-3xl text-lime">
                            Hai, saya
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                            Adipraja Shidqi Apriliano
                        </h1>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm">
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        Student Teknik Informatika • Universitas perjuangan
                    </div>

                    <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-md">
                        Berfokus pada perancangan dan pengembangan aplikasi web yang dinamis, modern, serta interaktif dengan kualitas rekayasa end-to-end yang solid.
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                        <a
                            href="#projects"
                            className="bg-lime text-neutral-900 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider hover:bg-lime-deep transition shadow-sm flex items-center gap-1.5"
                        >
                            PROJECT<span aria-hidden="true">↓</span>
                        </a>
                        <a
                            href="#contact"
                            className="border border-neutral-400 text-neutral-900 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider hover:bg-neutral-900 hover:text-cream transition"
                        >
                            CONTACT ME
                        </a>
                        <a
                            href="/cv/Adipraja-Shidqi-CV.pdf"
                            download="Adipraja-Shidqi-CV.pdf"
                            aria-label="Unduh CV Adipraja Shidqi dalam format PDF"
                            className="border border-neutral-900/30 text-neutral-900 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider hover:bg-neutral-900 hover:text-cream transition"
                        >
                            UNDUH CV ↓
                        </a>
                    </div>
                </div>

                {/* Kolom Tengah: Foto utama menumpuk di depan teks PORTFOLIO */}
                <div className="z-10 lg:col-span-4 flex flex-col items-center justify-end animate-fade-up opacity-0 [animation-delay:400ms]">
                    <div className="relative flex w-[300px] items-end justify-center sm:w-[360px] md:w-[400px]">
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 bottom-2 z-0 h-80 w-80 md:h-130 md:w-121 rounded-full bg-gradient-to-tr from-lime via-lime to-lime-200/30 blur-3xl"></div>
                        <img
                            src={fotoAdipraja}
                            alt="Foto Adipraja Shidqi Apriliano"
                            className="h-auto w-full drop-shadow-[0_2px_30px_rgba(0,0,0,0.2)] md:translate-x-13"
                        />
                    </div>
                </div>

                {/* Kolom Kanan: Floating badge / highlight keahlian */}
                <div className="z-20 lg:col-span-4 flex flex-col items-start lg:items-end gap-4 animate-fade-up opacity-0 [animation-delay:600ms]">
                    <div className="rounded-2xl bg-neutral-900 px-4 py-3 text-white shadow-lg max-w-xs w-full lg:w-auto">
                        <div className="flex items-center gap-2 text-xs font-semibold text-lime">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Fullstack Web Development
                        </div>
                        <p className="mt-1 text-xs text-neutral-300">
                            React • Tailwind CSS • Laravel • MySQL
                        </p>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur px-5 py-4 shadow-md max-w-xs w-full lg:w-auto lg:text-center">
                        <p className="text-sm font-bold text-black">
                            Web Development &amp; UI
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                            End-to-End Architecture &amp; Interactive Apps
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}
