import { projectFacts } from './projectsCore.js';

/* Halaman Projects sengaja dibatasi agar tetap ringkas. Untuk menampilkan proyek
   lain, ubah `featured: false` di projectsCore.js atau urutan datanya. */
const MAX_PROJECTS = 4;

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

export const projects = projectFacts
    .filter((project) => project.featured !== false)
    .slice(0, MAX_PROJECTS)
    .map((project, index) => ({
        ...project,
        id: String(index + 1).padStart(2, '0'),
        image: covers[project.slug],
    }));
