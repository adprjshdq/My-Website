import { createContext, useContext } from 'react';

/* Context dan hook dipisah dari LanguageProvider.jsx supaya file provider hanya
   mengekspor komponen. Aturan react-refresh (Fast Refresh) tidak mengizinkan
   komponen dan non-komponen berada dalam satu file. */
export const LanguageContext = createContext(null);

export function useLang() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLang harus dipakai di dalam LanguageProvider');
    }

    return context;
}
