import { useTheme } from '../theme/useTheme.js';
import { useLang } from '../i18n/useLang.js';

/* Switch dua mode. aria-checked menyatakan apakah mode gelap aktif; title
   menjelaskan aksi berikutnya saat kursor diarahkan ke tombol. */
export default function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme } = useTheme();
    const { t } = useLang();

    const isDark = theme === 'dark';
    const label = isDark ? t.theme.toLight : t.theme.toDark;

    return (
        <button
            type="button"
            role="switch"
            onClick={toggleTheme}
            aria-label={t.theme.label}
            aria-checked={isDark}
            title={label}
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-fg/15 text-fg transition-colors hover:bg-fg hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
        >
            {isDark ? (
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
                </svg>
            )}
        </button>
    );
}
