// Ganti data contoh ini dengan sertifikat milikmu.
// Gambar di src/assets perlu di-import seperti di bawah agar ikut diproses Vite.
import webDevelopment from '../assets/projects/achieve-webdev.webp.webp';
import javascriptIntermediate from '../assets/projects/achieve-jsintermedia.webp.webp';
import sqlIntroduction from '../assets/projects/achieve-sql.webp.webp';
import pythonIntroduction from '../assets/projects/achieve-py.webp.webp';

export const certificates = [
    {
        id: 'Web-development',
        title: 'Web-Development',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: webDevelopment,
        credentialUrl: '',
        skills: ['HTML', 'CSS', 'JavaScript'],
    },
    {
        id: 'Javascript Mengenah',
        title: 'JavaScript Intermediate',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: javascriptIntermediate,
        credentialUrl: '',
        skills: ['JavaScript'],
    },
    {
        id: 'Pengenalan SQL',
        title: 'Introduction SQL',
        issuer: 'SOLOLEARN',
        date: '2025',
        image: sqlIntroduction,
        credentialUrl: '',
        skills: ['Database SQL'],
    },
    {
        id: 'Pengenalan Python',
        title: 'Introduction Python',
        issuer: 'SOLOLEARN',
        date: '2025',
        image: pythonIntroduction,
        credentialUrl: '',
        skills: ['Python'],
    },
];
