# Portofolio Adipraja

Personal portfolio website untuk menampilkan profil, keahlian teknis, proyek, dan rekam jejak pendidikan — dibangun dengan React 19, Vite, dan Tailwind CSS v4.

## Fitur

- Layout editorial minimalis dengan aksen lime, tipografi serif italic, dan dark section untuk kontak.
- Preloader dengan progress bar, lalu konten beranimasi saat tirai terangkat.
- Scroll reveal per section (IntersectionObserver) dengan stagger antar elemen.
- Active navigation + scroll progress bar di header.
- Responsif mobile-first, termasuk penanganan `prefers-reduced-motion`.
- Form kontak fungsional lewat Web3Forms (tanpa backend sendiri).

## Teknologi

| Bagian | Dipakai |
|---|---|
| UI | React 19, Tailwind CSS v4 |
| Build | Vite 8, `@tailwindcss/vite` |
| Lint | ESLint 10 + plugin React Hooks / Refresh |

## Menjalankan secara lokal

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output ke dist/
npm run preview  # cek hasil build
npm run lint
```

## Struktur singkat

```
src/
  components/   # Navbar, Hero, About, Projects, Expertise, Journey, Contact, Preloader, dll
  hooks/        # useScrollReveal, useActiveSection
  assets/       # gambar yang di-import lewat bundler
  index.css     # Tailwind + keyframes + scroll reveal + pengaman overflow
```

## Deploy (Vercel)

1. Import repo ini di Vercel.
2. Framework preset: **Vite** (terdeteksi otomatis).
3. Build command: `npm run build` · Output directory: `dist`.

Setiap push ke `main` akan menjadi production deployment; branch lain menghasilkan preview URL.
