import fotoAdipraja from '../assets/foto-hero.png';
import { getCv } from '../data/cv.js';
import { useLang } from '../i18n/useLang.js';

export default function Hero() {
    const { lang, t } = useLang();
    const data = getCv(lang);

    return (
        <section className="relative overflow-hidden px-6 pt-2 pb-12 md:px-12 md:pt-6 md:pb-20 max-w-7xl mx-auto">
            {/* Layer 1: Teks besar PORTFOLIO di latar belakang */}
            <div
                aria-hidden="true"
                className="pointer-events-none select-none text-center leading-none"
            >
                <span className="text-accent-text block text-[min(13.5vw,165px)] font-black tracking-tight uppercase">
                    {t.hero.backdrop}
                </span>
            </div>
            <div aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 left-1/2 z-0 h-48 w-4/5 -translate-x-1/2 rounded-full bg-gradient-to-b from-accent via-accent/35 to-transparent blur-2xl">
                </div>

            {/* Area utama gabungan foto & elemen informasi */}
            <div className="relative mt-3 lg:-mt-25 grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
                {/* Kolom Kiri: Sapaan, Nama, Status & Deskripsi */}
                <div className="z-20 space-y-4 lg:col-span-4 text-left animate-fade-up opacity-0 [animation-delay:200ms]">
                    <div className="space-y-1">
                        <p className="font-serif italic text-2xl md:text-3xl text-accent-text">
                            {t.hero.greeting}
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-fg">
                            Adipraja Shidqi Apriliano
                        </h1>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-fg px-3.5 py-1.5 text-xs font-medium text-canvas shadow-sm">
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        {t.hero.badge}
                    </div>

                    <p className="text-sm md:text-base text-fg-muted leading-relaxed max-w-md">
                        {t.hero.description}
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                        <a
                            href="#projects"
                            className="bg-accent text-accent-ink px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider hover:bg-accent-strong transition shadow-sm flex items-center gap-1.5"
                        >
                            {t.hero.projectsCta}<span aria-hidden="true">↓</span>
                        </a>
                        <a
                            href="#contact"
                            className="border border-line text-fg px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider hover:bg-fg hover:text-canvas transition"
                        >
                            {t.hero.contactCta}
                        </a>
                        <a
                            href={data.pdfPath}
                            download={t.cv.pdfFileName}
                            aria-label={t.hero.cvAria}
                            className="border border-fg/30 text-fg px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider hover:bg-fg hover:text-canvas transition"
                        >
                            {t.hero.cvCta}
                        </a>
                    </div>
                </div>

                {/* Kolom Tengah: Foto utama menumpuk di depan teks PORTFOLIO */}
                <div className="z-10 lg:col-span-4 flex flex-col items-center justify-end animate-fade-up opacity-0 [animation-delay:400ms]">
                    <div className="relative flex w-[300px] items-end justify-center sm:w-[360px] md:w-[400px]">
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 bottom-2 z-0 h-80 w-80 md:h-130 md:w-121 rounded-full bg-gradient-to-tr from-accent via-accent to-accent/30 blur-3xl"></div>
                        <img
                            src={fotoAdipraja}
                            alt={t.hero.photoAlt}
                            className="h-auto w-full drop-shadow-[0_2px_30px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_2px_40px_rgba(190,242,100,0.15)] md:translate-x-13"
                        />
                    </div>
                </div>

                {/* Kolom Kanan: Floating badge / highlight keahlian */}
                <div className="z-20 lg:col-span-4 flex flex-col items-start lg:items-end gap-4 animate-fade-up opacity-0 [animation-delay:600ms]">
                    <div className="rounded-2xl bg-night px-4 py-3 text-night-fg shadow-lg border border-night-line max-w-xs w-full lg:w-auto">
                        <div className="flex items-center gap-2 text-xs font-semibold text-accent-text">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            {t.hero.stackTitle}
                        </div>
                        <p className="mt-1 text-xs text-night-muted">
                            {t.hero.stackTech}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-line bg-surface/95 backdrop-blur px-5 py-4 shadow-md max-w-xs w-full lg:w-auto lg:text-center">
                        <p className="text-sm font-bold text-fg">
                            {t.hero.focusTitle}
                        </p>
                        <p className="text-xs text-fg-subtle mt-0.5">
                            {t.hero.focusSubtitle}
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}
