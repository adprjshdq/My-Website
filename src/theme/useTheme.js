import { createContext, useContext } from 'react';

/* Context dan hook dipisah dari provider supaya Fast Refresh tidak mengeluh
   saat satu file mengekspor komponen dan non-komponen sekaligus. */
export const ThemeContext = createContext(null);

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme harus dipakai di dalam ThemeProvider');
    }

    return context;
}
