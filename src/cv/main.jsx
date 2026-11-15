import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import './cv.css';
import CvPage from './CvPage.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CvPage />
    </StrictMode>,
);
