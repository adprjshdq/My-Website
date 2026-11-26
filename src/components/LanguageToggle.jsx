import { useLang } from '../i18n/useLang.js';

const OPTIONS = [
    { code: 'id', label: 'ID', full: 'Bahasa Indonesia' },
    { code: 'en', label: 'ENG', full: 'English' },
];

/* Toggle ID | ENG. Dipakai di navbar desktop, drawer mobile, dan halaman CV. */
export default function LanguageToggle({ className = '' }) {
    const { lang, setLang, t } = useLang();

    return (
        <div
            role="group"
            aria-label={t.nav.language}
            className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest ${className}`}
        >
            {OPTIONS.map((option, index) => {
                const isActive = lang === option.code;

                return (
                    <span key={option.code} className="inline-flex items-center gap-1">
                        {index > 0 && (
                            <span aria-hidden="true" className="text-fg-subtle">
                                |
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={() => setLang(option.code)}
                            aria-pressed={isActive}
                            title={option.full}
                            className={`rounded-sm px-0.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                                isActive
                                    ? 'font-bold text-fg'
                                    : 'text-fg-subtle hover:text-fg'
                            }`}
                        >
                            {option.label}
                        </button>
                    </span>
                );
            })}
        </div>
    );
}
