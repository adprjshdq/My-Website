# Portofolio Adipraja

Personal portfolio website untuk menampilkan profil, keahlian teknis, proyek, dan rekam jejak pendidikan — dibangun dengan React 19, Vite, dan Tailwind CSS v4.

## Fitur

- Layout editorial minimalis dengan aksen lime, tipografi serif italic, dan dark section untuk kontak.
- Preloader dengan progress bar — hanya tampil sekali per sesi dan dilewati sepenuhnya saat `prefers-reduced-motion`.
- Scroll reveal per section (IntersectionObserver) dengan stagger antar elemen.
- Active navigation + scroll progress bar di header.
- Kartu proyek dengan pratinjau gambar dan **modal studi kasus** (fokus terjebak, tutup lewat Escape/backdrop, fokus kembali ke tombol pembuka).
- Badge ketersediaan ("Open to internship & freelance") di Hero.
- Responsif mobile-first, termasuk penanganan `prefers-reduced-motion`.
- Form kontak fungsional lewat Web3Forms (tanpa backend sendiri).
- Halaman CV `/cv/` berbasis React dengan tata letak A4, tombol cetak/simpan PDF, dan tautan unduh PDF.
- Halaman 404 khusus (`public/404.html`) untuk URL yang tidak dikenal.

## Teknologi

| Bagian | Dipakai |
|---|---|
| UI | React 19, Tailwind CSS v4 |
| Build | Vite 8, `@tailwindcss/vite` |
| Lint | ESLint 10 + plugin React Hooks / Refresh |
| PDF CV | `@react-pdf/renderer` + `tsx` (dev) — generate `public/cv/*.pdf` dari data CV |

## Palet warna

Warna merek didaftarkan sebagai token Tailwind di `src/index.css` (`@theme`), jadi komponen
memakai nama seperti `bg-cream` atau `text-lime` — bukan kode hex yang tersebar.

| Token | Hex | Dipakai untuk |
|---|---|---|
| `cream` | `#f4f3ef` | Latar halaman dan modal |
| `sand` | `#eae8e1` | Kartu proyek, expertise, journey |
| `lime` | `#bef264` | Aksen, badge, tombol utama |
| `lime-deep` | `#accb52` | Hover tombol lime |
| `ink` | `#141414` | Latar preloader |

`index.html` dan `public/404.html` tetap memakai hex karena keduanya HTML statis di luar build Tailwind.

## Struktur singkat

```
cv/
  index.html    # entry halaman CV (Vite multi-page), disajikan di /cv/
scripts/
  generate-cv-pdf.jsx  # membuat PDF CV dari src/data/cv.js
src/
  components/   # Navbar, Hero, Projects, CaseStudyModal, Expertise, Journey, Contact, dll
  cv/           # CvPage.jsx + main.jsx + cv.css (aturan cetak A4)
  data/         # projects.js (kartu + studi kasus), journey.js (timeline), cv.js (isi CV)
  hooks/        # useScrollReveal, useActiveSection
  assets/       # gambar yang di-import lewat bundler (projects/ untuk pratinjau proyek)
  index.css     # Tailwind + keyframes + scroll reveal + pengaman overflow
public/
  og-image.png      # kartu preview 1200x630 untuk WhatsApp/LinkedIn/X
  favicon-32.png    # ikon tab browser
  apple-touch-icon.png  # ikon saat situs disimpan ke home screen iOS
  404.html          # halaman untuk URL yang tidak dikenal (dipakai Vercel)
  cv/               # CV PDF yang diunduh dari tombol di Hero
  robots.txt        # izin crawling + lokasi sitemap
  sitemap.xml       # daftar URL untuk mesin pencari
```

## Aset & konfigurasi yang perlu diganti

| Item | Lokasi | Keterangan |
|---|---|---|
| Domain | `index.html`, `cv/index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/og-image.png` | Domain produksi saat ini `https://adiprajashdq.vercel.app`. Bila domain berubah, ganti di kelima tempat itu. |
| Pratinjau proyek | `src/assets/projects/*.webp` | Ukuran ideal 1440×900 (rasio 16:10). |
| CV | `src/data/cv.js` + `scripts/generate-cv-pdf.jsx` | Isi CV diubah di `cv.js`; halaman `/cv/` dan PDF di `public/cv/` sama-sama berasal dari data itu. PDF dibuat otomatis saat `npm run dev` / `npm run build`. |
| Preview sosial | `public/og-image.png` | Ukuran 1200×630. Ganti bila nama/role berubah. |
| `lastmod` sitemap | `public/sitemap.xml` | Perbarui tanggalnya setiap kali konten utama berubah. |

> Tombol **Buka demo** (di kartu maupun modal) hanya muncul bila `live` pada
> `src/data/projects.js` berisi URL asli. Isi `live: null` selama demo belum publik.

### Menambah atau memperbarui proyek

1. Simpan screenshot 1440×900 di `src/assets/projects/` lalu import di `src/data/projects.js`.
2. Isi `title`, `summary`, `tech`, `role`, `year`, `sections`, dan `features`.
3. Bila gambar masih mockup (bukan screenshot asli), isi `imageNote: 'Mockup UI'` agar pengunjung tahu.
4. Set `live: null` bila belum ada demo publik.

### Mengubah CV

Semua teks CV ada di **`src/data/cv.js`** (nama, profil, pendidikan, keahlian, proyek, tautan).
Halaman `/cv/` dan PDF di `public/cv/Adipraja-Shidqi-CV.pdf` sama-sama dibuat dari file itu.

1. Edit `src/data/cv.js`.
2. Tambah entri dengan menambahkan objek ke array `projects`, `education`, atau `skills`.
   Untuk organisasi dan sertifikasi, isi `organizations` / `certifications` — section-nya
   muncul otomatis begitu array tidak kosong (tidak perlu mengubah JSX).
3. Buka `http://localhost:5173/cv/` untuk melihat halaman CV.

PDF **tidak perlu dicetak manual**. Skrip `scripts/generate-cv-pdf.jsx` dijalankan otomatis
lewat `predev` dan `prebuild`, jadi `npm run dev` dan `npm run build` selalu memperbarui
`public/cv/Adipraja-Shidqi-CV.pdf` dari data terbaru. Saat dev server berjalan, perubahan
`cv.js` juga langsung memicu pembuatan ulang PDF (plugin di `vite.config.js`). Ingin
memperbarui tanpa build?

```bash
npm run cv:pdf
```

Tombol **Cetak / Simpan PDF** di halaman `/cv/` tetap tersedia bila Anda ingin versi cetak
dari tampilan web; keduanya memakai data yang sama.

Tidak perlu Python atau library tambahan. Jangan lupa perbarui `updated` di `cv.js`.

### Mengisi timeline Journey

Urutan entri ada di `src/data/journey.js`. Riwayat SD/SMP sengaja tidak ditampilkan.
Tambahkan organisasi, kepanitiaan, atau sertifikasi sebagai objek baru dengan `kind` yang
sesuai, supaya section ini tidak berhenti pada riwayat pendidikan saja.

## Aksesibilitas

- Fokus keyboard terlihat di semua elemen interaktif: aturan global `:focus-visible` di `index.css` plus ring pada komponen.
- Modal studi kasus dan drawer mobile memakai focus trap, bisa ditutup dengan Escape, dan mengembalikan fokus ke tombol pemicu.
- Semua animasi berhenti saat `prefers-reduced-motion: reduce`; preloader juga dilewati.
- Form kontak: label terhubung ke input, status pengiriman diumumkan lewat `role="status"` + `aria-live`, tombol dinonaktifkan selama mengirim, dan honeypot `botcheck` aktif.

> Access key Web3Forms ada di `src/components/Contact.jsx` (normal untuk layanan ini).
> Batasi domain pengirim di dashboard Web3Forms agar key tidak disalahgunakan pihak lain.

## Deploy (Vercel)

1. Import repo ini di Vercel.
2. Framework preset: **Vite** (terdeteksi otomatis).
3. Build command: `npm run build` · Output directory: `dist`.
4. `public/404.html` otomatis disajikan Vercel untuk URL yang tidak dikenal — tidak perlu konfigurasi tambahan.

Setiap push ke `main` akan menjadi production deployment; branch lain menghasilkan preview URL.

Setelah domain aktif, cek berurutan:
1. Pastikan domain di `index.html`, `robots.txt`, `sitemap.xml`, dan `og-image.png` sudah sesuai.
2. Buka `https://domain-anda/robots.txt` → harus `Allow: /`, bukan `Disallow: /`.
3. Buka `https://domain-anda/og-image.png` → harus tampil gambarnya.
4. Uji preview link dengan WhatsApp/LinkedIn (atau [opengraph.xyz](https://www.opengraph.xyz/)).
5. Submit `sitemap.xml` di Google Search Console.
6. Buka URL ngawur, mis. `https://domain-anda/halaman-tidak-ada` → harus muncul halaman 404, bukan layar putih.
