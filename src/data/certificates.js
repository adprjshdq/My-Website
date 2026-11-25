// Ganti data contoh ini dengan sertifikat milikmu.
// Gambar di src/assets perlu di-import seperti di bawah agar ikut diproses Vite.
import webdev from '../assets/projects/achieve-webdev.webp';
import javascriptIntermediate from '../assets/projects/achieve-jsI.webp.webp';
import sqlIntroduction from '../assets/projects/achieve-introductionSQL.webp.webp';
import pythonIntroduction from '../assets/projects/achieve-introductionpy.webp.webp';
import introductionJavascript from '../assets/projects/achieve-introductionjs.webp.webp';
import typeScript from '../assets/projects/achieve-ts.webp.webp';

export const certificates = [
    {
        id: 'Web-development',
        title: 'Web-Development',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: webdev,
        credentialUrl: '',
        skills: ['HTML', 'CSS', 'JavaScript'],
    },
    {
        id: 'TypeScript for Beginners',
        title: 'TypeScript for Beginners: Code in the AI Era',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: typeScript,
        credentialUrl: '',
        skills: ['TypeScript'],
    },
    {
        id: 'JavaScript Menengah',
        title: 'JavaScript Intermediate',
        issuer: 'SOLOLEARN',
        date: '2025',
        image: javascriptIntermediate,
        credentialUrl: '',
        skills: ['JavaScript'],
    },
    {
        id: 'Pengenalan JavaScript',
        title: 'Introduction JavaScript',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: introductionJavascript,
        credentialUrl: '',
        skills: ['JavaScript'],
    },
    {
        id: 'Pengenalan SQL',
        title: 'Introduction SQL',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: sqlIntroduction,
        credentialUrl: '',
        skills: ['Database SQL'],
    },
    {
        id: 'Pengenalan Python',
        title: 'Introduction Python',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: pythonIntroduction,
        credentialUrl: '',
        skills: ['Python'],
    },
];
