import { projectFacts } from './projectsCore.js';
import { projectFactsEn } from './projectsCore.en.js';

/* Halaman Projects sengaja dibatasi agar tetap ringkas. Untuk menampilkan proyek
   lain, ubah `featured: false` di projectsCore.js / projectsCore.en.js atau
   urutan datanya. */
const MAX_PROJECTS = 5;

/* Pratinjau diambil otomatis dari src/assets/projects/<slug>.<ext>, jadi proyek
   baru cukup menaruh gambar dengan nama sesuai slug tanpa mengubah file ini. */
const coverModules = import.meta.glob('../assets/projects/*.{webp,png,jpg,jpeg}', {
    eager: true,
    import: 'default',
});

const covers = Object.fromEntries(
    Object.entries(coverModules).map(([path, src]) => [
        path.split('/').pop().replace(/\.(webp|png|jpe?g)$/i, ''),
        src,
    ])
);

const factsByLang = {
    id: projectFacts,
    en: projectFactsEn,
};

export function getProjects(lang) {
    const facts = factsByLang[lang] ?? projectFactsEn;

    return facts
        .filter((project) => project.featured !== false)
        .slice(0, MAX_PROJECTS)
        .map((project, index) => ({
            ...project,
            id: String(index + 1).padStart(2, '0'),
            image: covers[project.slug],
        }));
}
