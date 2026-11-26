import { useLang } from '../i18n/useLang.js';

const EXPERTISE_SKILLS = [
    ['HTML5, CSS3, JavaScript', 'React', 'Tailwind CSS', 'Vite'],
    ['Node.js', 'Express.js', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    ['Git & GitHub', 'VS Code', 'npm / Vite', 'Antigravity', 'Gemini', 'Opencode'],
];

export default function Expertise() {
    const { t } = useLang();

    const expertises = t.expertise.items.map((item, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: item.title,
        description: item.description,
        skills: EXPERTISE_SKILLS[index],
    }));

    return (
        <section id="expertise" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-line">
            {/* Header Bagian Expertise */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                <div data-reveal>
                    <span className="text-xs font-mono tracking-widest uppercase text-fg-subtle">
                        {t.expertise.kicker}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">
                        {t.expertise.titleLine1} <br />
                        <span className="text-accent-text text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">
                            {t.expertise.titleLine2}
                        </span>
                    </h2>
                </div>
                <p data-reveal style={{ '--reveal-delay': '100ms' }} className="text-fg-muted text-sm md:text-base max-w-md font-light">
                    {t.expertise.intro}
                </p>
            </div>

            {/* Grid Kartu Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {expertises.map((item, index) => (
                    <div
                        key={item.title}
                        data-reveal
                        style={{ '--reveal-delay': `${index * 90}ms` }}
                        className="bg-surface-muted p-6 md:p-8 rounded-2xl border border-line flex flex-col justify-between hover:border-fg transition-all duration-300"
                    >
                        <div>
                            <span className="text-xs font-mono text-fg-subtle block mb-4">
                                {item.number} / {t.expertise.domain}
                            </span>
                            <h3 className="text-2xl font-bold tracking-tight mb-3">
                                {item.title}
                            </h3>
                            <p className="text-fg-muted text-sm font-light leading-relaxed mb-8">
                                {item.description}
                            </p>
                        </div>

                        {/* Daftar Skill / Teknologi */}
                        <div className="pt-6 border-t border-line">
                            <span className="text-[11px] font-mono tracking-wider text-fg-subtle uppercase block mb-3">
                                {t.expertise.technologies}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {item.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs font-mono px-2.5 py-1 bg-accent text-accent-ink rounded-md border border-line"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
