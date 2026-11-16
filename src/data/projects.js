import sekolahImg from '../assets/projects/sekolah.webp';
import kafeImg from '../assets/Mockup Cafe.png';
import portfolioImg from '../assets/projects/portfolio.webp';
import sppImg from '../assets/Mockup spp.png';
import { projectFacts } from './projectsCore.js';

/**
 * Gambar per proyek. Teksnya ada di `projectsCore.js` supaya bisa dipakai
 * serverless function tanpa mengimpor aset gambar.
 */
const covers = {
    'website-sekolah': sekolahImg,
    'sistem-kafe': kafeImg,
    portfolio: portfolioImg,
    'sistem-spp': sppImg,
};

export const projects = projectFacts.map((project) => ({
    ...project,
    image: covers[project.slug],
}));
