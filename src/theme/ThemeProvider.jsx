import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './useTheme.js';

/* Dua mode saja: terang dan gelap. Default selalu terang; setelah pengunjung
   menekan toggle, pilihannya disimpan permanen di localStorage. */
const STORAGE_KEY = 'portfolio:theme';

const THEME_COLOR = {
    light: '#f4f3ef',
    dark: '#0f0f0f',
};

function readTheme() {
    if (typeof document === 'undefined') return 'light';

    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    // Warna address bar browser mobile ikut tema.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLOR[theme]);
}

export function ThemeProvider({ children }) {
    // Inline script di index.html sudah memasang data-theme sebelum React
    // berjalan, jadi state awal dibaca dari DOM agar tidak ada flash.
    const [theme, setThemeState] = useState(readTheme);

    const setTheme = useCallback((next) => {
        const value = next === 'dark' ? 'dark' : 'light';

        applyTheme(value);
        setThemeState(value);

        try {
            window.localStorage.setItem(STORAGE_KEY, value);
        } catch {
            // Storage diblokir: tema tetap berlaku untuk sesi ini.
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    // Sinkronkan bila tema diubah dari tab lain.
    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key !== STORAGE_KEY) return;

            const value = event.newValue === 'dark' ? 'dark' : 'light';
            applyTheme(value);
            setThemeState(value);
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    // Pastikan atribut DOM dan meta selalu cocok dengan state, termasuk saat
    // provider dipasang tanpa inline script (mis. pengujian komponen).
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const value = useMemo(
        () => ({ theme, setTheme, toggleTheme }),
        [theme, setTheme, toggleTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
