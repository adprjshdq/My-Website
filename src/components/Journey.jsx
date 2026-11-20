import { milestones } from '../data/journey';

export default function Journey() {
    return (
        <section id="journey" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-neutral-300">
            {/* Header Journey */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                <div data-reveal>
                    <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
                        //  TIMELINE & EXPERIENCE
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">
                        The Journey <br /><span className="text-lime text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">so far.</span>
                    </h2>
                </div>
                <p data-reveal style={{ '--reveal-delay': '100ms' }} className="text-neutral-600 text-sm md:text-base max-w-md font-light">
                    Pendidikan formal dan praktik yang saya tekuni untuk sampai di titik ini.
                </p>
            </div>

            {/* Daftar Timeline */}
            <ol className="space-y-8">
                {milestones.map((item, index) => (
                    <li
                        key={`${item.period}-${item.role}`}
                        data-reveal
                        style={{ '--reveal-delay': `${index * 90}ms` }}
                        className="bg-sand p-6 md:p-8 rounded-2xl border border-neutral-300 grid grid-cols-1 md:grid-cols-4 gap-6 items-start hover:border-neutral-900 transition"
                    >
                        {/* Periode & Jenis */}
                        <div className="font-mono text-xs text-neutral-500 md:col-span-1">
                            <span className="bg-neutral-200 px-3 py-1 rounded-full border border-neutral-300">
                                {item.period}
                            </span>
                            <span className="mt-2 block text-[10px] uppercase tracking-widest text-neutral-400">
                                // {item.kind}
                            </span>
                        </div>

                        {/* Detail Peran & Organisasi */}
                        <div className="md:col-span-3 space-y-2">
                            <h3 className="text-xl font-bold tracking-tight">
                                {item.role} <span className="font-light text-neutral-500">@ {item.organization}</span>
                            </h3>
                            <p className="text-neutral-600 text-sm font-light leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
