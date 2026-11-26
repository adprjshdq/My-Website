import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import './cv.css';
import CvPage from './CvPage.jsx';
import { LanguageProvider } from '../i18n/LanguageProvider.jsx';

// Halaman CV selalu terang, termasuk saat dicetak ke PDF. Jangan ikut tema
// portofolio yang tersimpan di localStorage.
document.documentElement.dataset.theme = 'light';
document.documentElement.style.colorScheme = 'light';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <LanguageProvider>
            <CvPage />
        </LanguageProvider>
    </StrictMode>,
);
