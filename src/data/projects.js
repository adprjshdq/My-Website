import sekolahImg from '../assets/projects/sekolah.webp';
import kafeImg from '../assets/dashboard.png';
import portfolioImg from '../assets/projects/portfolio.webp';
import sppImg from '../assets/pembayaranSPP.png';
import { projectFacts } from './projectsCore.js';

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
