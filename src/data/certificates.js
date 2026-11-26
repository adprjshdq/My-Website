// Ganti data contoh ini dengan sertifikat milikmu.
// Gambar di src/assets perlu di-import seperti di bawah agar ikut diproses Vite.
import webdev from '../assets/projects/achieve-webdev.webp';
import javascriptIntermediate from '../assets/projects/achieve-jsI.webp.webp';
import pythonIntroduction from '../assets/projects/achieve-introductionpy.webp.webp';
import typeScript from '../assets/projects/achieve-ts.webp.webp';
import frontend from '../assets/projects/fe-angular.webp';
import html from '../assets/projects/html-introduction.webp';
import sqlintermediate from '../assets/projects/sql-intermediate.webp';
import cssintroduction from '../assets/projects/introduction-css.webp';

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
        id: 'Front-end',
        title: 'Front-end for Beginners',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: frontend,
        credentialUrl: '',
        skills: ['TypeScript'],
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
        date: '2026',
        image: javascriptIntermediate,
        credentialUrl: '',
        skills: ['JavaScript'],
    },
    {
        id: 'Pengenalan CSS',
        title: 'Introduction CSS',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: cssintroduction,
        credentialUrl: '',
        skills: ['CSS'],
    },
    {
        id: 'Pengenalan HTMLD',
        title: 'Introduction HTML',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: html,
        credentialUrl: '',
        skills: ['HTML'],
    },
    {
        id: 'SQl Menengah',
        title: 'SQL Intermediate',
        issuer: 'SOLOLEARN',
        date: '2026',
        image: sqlintermediate,
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
