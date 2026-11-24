import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import './cv.css';
import CvPage from './CvPage.jsx';
import { LanguageProvider } from '../i18n/LanguageProvider.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <LanguageProvider>
            <CvPage />
        </LanguageProvider>
    </StrictMode>,
);
