import { useLang } from '../i18n/useLang.js';

export default function About() {
    const { t } = useLang();

    return (
        <section id="about" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-line">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

                {/* Kolom Judul Kiri */}
                <div data-reveal>
                    <span className="text-xs font-mono tracking-widest uppercase text-fg-subtle">
                        {t.about.kicker}
                    </span>

                    <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mt-2">
                        <span className="block">
                            {t.about.titleLine1}
                        </span>

                        <span className="block text-accent-text md:text-4xl font-extrabold uppercase tracking-tight mt-0">
                            {t.about.titleLine2}
                        </span>
                    </h2>
                </div>

                {/* Kolom Deskripsi Kanan (2 Kolom di layar besar) */}
                <div className="md:col-span-2 space-y-6 text-fg-muted text-base md:text-lg font-light leading-relaxed">

                    {t.about.paragraphs.map((paragraph, index) => (
                        <p
                            key={paragraph.slice(0, 24)}
                            data-reveal
                            style={{ '--reveal-delay': `${80 + index * 80}ms` }}
                        >
                            {paragraph}
                        </p>
                    ))}

                    {/* Kartu Info Singkat / Poin Keunggulan */}
                    <div
                        data-reveal
                        style={{ '--reveal-delay': '240ms' }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-line font-mono text-xs"
                    >

                        <div>
                            <span className="block text-fg-subtle">{t.about.campusLabel}</span>
                            <span className="font-semibold text-fg">{t.about.campusValue}</span>
                        </div>

                        <div>
                            <span className="block text-fg-subtle">{t.about.focusLabel}</span>
                            <span className="font-semibold text-fg">{t.about.focusValue}</span>
                        </div>

                        <div>
                            <span className="block text-fg-subtle">{t.about.statusLabel}</span>
                            <span className="font-semibold text-emerald-600">{t.about.statusValue}</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
