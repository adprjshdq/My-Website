import { getMilestones } from '../data/journey.js';
import { useLang } from '../i18n/useLang.js';

export default function Journey() {
    const { lang, t } = useLang();
    const milestones = getMilestones(lang);

    return (
        <section id="journey" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-line">
            {/* Header Journey */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                <div data-reveal>
                    <span className="text-xs font-mono tracking-widest uppercase text-fg-subtle">
                        {t.journey.kicker}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">
                        {t.journey.titleLine1} <br />
                        <span className="text-accent-text text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">
                            {t.journey.titleLine2}
                        </span>
                    </h2>
                </div>
                <p data-reveal style={{ '--reveal-delay': '100ms' }} className="text-fg-muted text-sm md:text-base max-w-md font-light">
                    {t.journey.intro}
                </p>
            </div>

            {/* Daftar Timeline */}
            <ol className="space-y-8">
                {milestones.map((item, index) => (
                    <li
                        key={`${item.period}-${item.role}`}
                        data-reveal
                        style={{ '--reveal-delay': `${index * 90}ms` }}
                        className="bg-surface-muted p-6 md:p-8 rounded-2xl border border-line grid grid-cols-1 md:grid-cols-4 gap-6 items-start hover:border-fg transition"
                    >
                        {/* Periode & Jenis */}
                        <div className="font-mono text-xs text-fg-subtle md:col-span-1">
                            <span className="bg-canvas px-3 py-1 rounded-full border border-line">
                                {item.period}
                            </span>
                            <span className="mt-2 block text-[10px] uppercase tracking-widest text-fg-subtle">
                                // {item.kind}
                            </span>
                        </div>

                        {/* Detail Peran & Organisasi */}
                        <div className="md:col-span-3 space-y-2">
                            <h3 className="text-xl font-bold tracking-tight">
                                {item.role} <span className="font-light text-fg-subtle">@ {item.organization}</span>
                            </h3>
                            <p className="text-fg-muted text-sm font-light leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
