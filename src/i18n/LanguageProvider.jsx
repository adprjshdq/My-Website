import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANG, LANGUAGES, ui } from './ui.js';
import { LanguageContext } from './useLang.js';

/* Pilihan bahasa disimpan per sesi tab: setiap kunjungan baru selalu mulai
   dengan bahasa Inggris, tetapi reload di tab yang sama mempertahankan pilihan
   pengunjung. Ganti ke localStorage bila ingin diingat permanen. */
const STORAGE_KEY = 'portfolio:lang';

function readStoredLang() {
    if (typeof window === 'undefined') return DEFAULT_LANG;

    try {
        const value = window.sessionStorage.getItem(STORAGE_KEY);
        if (LANGUAGES.includes(value)) return value;
    } catch {
        // Storage diblokir: tetap pakai bahasa default.
    }

    return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(readStoredLang);

    useEffect(() => {
        document.documentElement.lang = lang;

        try {
            window.sessionStorage.setItem(STORAGE_KEY, lang);
        } catch {
            // Tidak masalah bila storage tidak tersedia.
        }
    }, [lang]);

    const setLang = useCallback((next) => {
        if (LANGUAGES.includes(next)) setLangState(next);
    }, []);

    const value = useMemo(
        () => ({
            lang,
            setLang,
            t: ui[lang],
        }),
        [lang, setLang],
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
