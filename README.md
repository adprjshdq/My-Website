# Portofolio Adipraja

Personal portfolio website untuk menampilkan profil, keahlian teknis, proyek, dan rekam jejak pendidikan — dibangun dengan React 19, Vite, dan Tailwind CSS v4.

## Fitur

- Layout editorial minimalis dengan aksen lime, tipografi serif italic, dan dark section untuk kontak.
- Preloader dengan progress bar — hanya tampil sekali per sesi dan dilewati sepenuhnya saat `prefers-reduced-motion`.
- Scroll reveal per section (IntersectionObserver) dengan stagger antar elemen.
- Active navigation + scroll progress bar di header.
- **Arsip proyek berbentuk folder** — sampul folder harus diklik dulu untuk membuka daftar proyek; animasi buka/tutup menghormati `prefers-reduced-motion`.
- Kartu proyek dengan pratinjau gambar dan **modal studi kasus** (fokus terjebak, tutup lewat Escape/backdrop, fokus kembali ke tombol pembuka).
- **Pencarian proyek real-time + filter kategori** di dalam folder — menjangkau judul, ringkasan, teknologi, fitur, dan isi studi kasus.
- Mouse follower dekoratif (glow lime + ring) yang hanya aktif di perangkat berpointer presisi.
- Badge ketersediaan ("Open to internship & freelance") di Hero.
- Responsif mobile-first, termasuk penanganan `prefers-reduced-motion`.
- Form kontak fungsional lewat Web3Forms (tanpa backend sendiri).
- Halaman CV `/cv/` berbasis React dengan tata letak A4, tombol cetak/simpan PDF, dan tautan unduh PDF.
- **Asisten AI** mengambang untuk menjawab pertanyaan seputar profil, proyek, keahlian, dan kontak — dibatasi pada data portofolio.
- **Dua bahasa (EN/ID)** — situs dibuka dalam bahasa Inggris; tombol `ID | ENG` di navbar (desktop dan drawer mobile) serta di halaman CV mengganti seluruh teks, isi proyek, timeline, CV, dan bahasa jawaban asisten AI.
- Halaman 404 khusus (`public/404.html`) untuk URL yang tidak dikenal.

## Teknologi

| Bagian | Dipakai |
|---|---|
| UI | React 19, Tailwind CSS v4 |
| Build | Vite 8, `@tailwindcss/vite` |
| Lint | ESLint 10 + plugin React Hooks / Refresh |
| PDF CV | `@react-pdf/renderer` + `tsx` (dev) — generate `public/cv/*.pdf` (ID & EN) dari data CV |
| Asisten AI | Google Gemini (`gemini-3.5-flash`) lewat Vercel Function `api/chat.js` |

## Menjalankan & memeriksa

```bash
npm run dev     # dev server (sekaligus membuat ulang PDF CV)
npm run build   # build produksi ke dist/
npm run check   # lint + build dalam satu perintah
npm run preview # coba hasil build secara lokal
```

`npm run check` adalah pemeriksaan tercepat sebelum commit/push: ESLint harus bersih dan
build harus selesai tanpa error. Build juga otomatis menjalankan `npm run cv:pdf`, jadi
kedua PDF CV ikut diperbarui.

## Bahasa (ID / EN)

Situs dibuka dalam **bahasa Inggris** (default). Tombol `ID | ENG` di navbar, drawer
mobile, dan toolbar halaman `/cv/` mengganti seluruh bahasa tanpa reload:

- Teks antarmuka: `src/i18n/ui.js` — semua label, tombol, aria-label, dan pesan status.
- Isi proyek: `src/data/projectsCore.js` (ID) dan `src/data/projectsCore.en.js` (EN).
- Timeline: `src/data/journey.js` (`milestones` dan `milestonesEn`).
- CV: `src/data/cv.js` (`cv` dan `cvEn`).
- Jawaban asisten AI: `api/_chat.js` memakai `payload.lang` untuk memilih system prompt
  dan knowledge base dari `src/data/knowledge.js`.

Pilihan bahasa disimpan di `sessionStorage` (`portfolio:lang`), jadi reload di tab yang
sama tetap memakai bahasa terakhir, tetapi kunjungan baru selalu mulai dari bahasa Inggris.
Ubah `DEFAULT_LANG` di `src/i18n/ui.js` bila ingin default bahasa Indonesia, atau ganti
penyimpanan ke `localStorage` di `src/i18n/LanguageProvider.jsx` agar pilihan diingat
permanen.

> ID section (`#about`, `#projects`, `#expertise`, `#journey`, `#contact`) sengaja tetap
> bahasa Inggris dan tidak ikut diterjemahkan, supaya anchor dan menu aktif tetap bekerja.

Kedua bahasa adalah sumber konten terpisah: saat menambah proyek, entri harus ditambahkan
di kedua file `projectsCore*.js` dengan `slug` dan `categoryKey` yang sama.

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
api/
  chat.js       # endpoint POST /api/chat (Vercel Function)
  _chat.js      # validasi, rate limit, pemanggilan Gemini, system prompt
cv/
  index.html    # entry halaman CV (Vite multi-page), disajikan di /cv/
scripts/
  generate-cv-pdf.jsx  # membuat PDF CV bahasa Indonesia & Inggris dari src/data/cv.js
  vite-plugin-assistant-api.js  # menjalankan /api/chat saat npm run dev
src/
  components/   # Navbar, Hero, Projects, CaseStudyModal, Expertise, Journey, Contact, Assistant, dll
  cv/           # CvPage.jsx + main.jsx + cv.css (aturan cetak A4)
  data/         # projectsCore.js + projectsCore.en.js (teks proyek), projects.js (+gambar),
                # journey.js, cv.js, knowledge.js — tiap file punya versi ID dan EN
  i18n/         # ui.js (kamus teks antarmuka), LanguageProvider.jsx, useLang.js
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
| Pratinjau proyek | `src/assets/projects/<slug>.webp` | Ukuran ideal 1440×900 (rasio 16:10). Nama file harus sama dengan `slug` proyek. |
| CV | `src/data/cv.js` + `scripts/generate-cv-pdf.jsx` | Isi CV diubah di `cv.js` (objek `cv` untuk bahasa Indonesia, `cvEn` untuk Inggris); halaman `/cv/` dan kedua PDF di `public/cv/` berasal dari data itu. PDF dibuat otomatis saat `npm run dev` / `npm run build`. |
| Preview sosial | `public/og-image.png` | Ukuran 1200×630. Ganti bila nama/role berubah. |
| `lastmod` sitemap | `public/sitemap.xml` | Perbarui tanggalnya setiap kali konten utama berubah. |

> Tombol **Buka demo** (di kartu maupun modal) hanya muncul bila `live` pada
> `src/data/projectsCore.js` berisi URL asli. Isi `live: null` selama demo belum publik.

### Menambah atau memperbarui proyek

Halaman Projects menampilkan maksimal **4 proyek** (`MAX_PROJECTS` di
`src/data/projects.js`). Proyek dengan `featured: false` tetap tersimpan di data,
tetapi tidak ditampilkan.

1. Simpan screenshot 1440×900 di `src/assets/projects/` dengan nama sesuai `slug`
   (contoh: `barbershop-booking.webp`). Gambar dikenali otomatis dari nama file.
2. Isi teksnya (`title`, `slug`, `summary`, `tech`, `role`, `year`, `sections`, `features`,
   `category`, `categoryKey`) di `src/data/projectsCore.js`, lalu salin terjemahannya ke
   `src/data/projectsCore.en.js`. Gunakan `slug` huruf kecil dan tanda hubung, dan
   `categoryKey` yang sama di kedua bahasa (`multi-page`, `web-app`, `frontend-ui`).
3. Bila gambar masih mockup (bukan screenshot asli), isi `imageNote: 'Mockup UI'`
   agar pengunjung tahu. Selama gambar belum ada, kartu menampilkan placeholder
   "Pratinjau segera hadir".
4. Set `live: null` bila belum ada demo publik.
5. Untuk menukar proyek yang tampil, set `featured: false` pada proyek yang ingin
   disembunyikan, atau ubah urutan objeknya — yang diambil adalah 4 proyek pertama.

Pencarian dan filter kategori di section Projects membaca data itu secara otomatis —
tidak ada daftar kata kunci terpisah yang perlu diperbarui. Kata kunci dicocokkan ke
`title`, `category`, `role`, `year`, `summary`, `tech`, `features`, dan seluruh
`sections` (termasuk isi studi kasus).

Folder arsip dimulai dalam keadaan tertutup. Pencarian, filter, dan kartu proyek baru
bisa diakses setelah folder dibuka; tombol **Tutup folder** mengembalikan fokus ke
sampul. Jumlah proyek di tab folder (`// 04 PROYEK`) mengikuti panjang data.

### Mengubah CV

Semua teks CV ada di **`src/data/cv.js`**: objek `cv` untuk bahasa Indonesia dan `cvEn`
untuk bahasa Inggris (nama, profil, pendidikan, keahlian, proyek, tautan). Halaman `/cv/`
mengikuti bahasa yang dipilih, dan dua PDF di `public/cv/` dibuat dari file yang sama.
Label section dan nama file PDF ada di `src/i18n/ui.js` (`cv.sections`, `pdfFileName`).

1. Edit `src/data/cv.js` — perbarui `cv` **dan** `cvEn` agar isi kedua bahasa tetap sama.
2. Tambah entri dengan menambahkan objek ke array `projects`, `education`, atau `skills`.
   Untuk organisasi dan sertifikasi, isi `organizations` / `certifications` — section-nya
   muncul otomatis begitu array tidak kosong (tidak perlu mengubah JSX).
3. Buka `http://localhost:5173/cv/` untuk melihat halaman CV, lalu coba toggle `ID | ENG`.

PDF **tidak perlu dicetak manual**. Skrip `scripts/generate-cv-pdf.jsx` dijalankan otomatis
lewat `predev` dan `prebuild`, jadi `npm run dev` dan `npm run build` selalu memperbarui
kedua berkas:

- `public/cv/Adipraja-Shidqi-CV.pdf` — versi bahasa Indonesia.
- `public/cv/Adipraja-Shidqi-CV-EN.pdf` — versi bahasa Inggris.

Tombol unduh di Hero dan halaman `/cv/` menunjuk ke berkas sesuai bahasa aktif. Saat dev
server berjalan, perubahan `cv.js` juga langsung memicu pembuatan ulang PDF (plugin di
`vite.config.js`). Ingin memperbarui tanpa build?

```bash
npm run cv:pdf
```

Tombol **Cetak / Simpan PDF** di halaman `/cv/` tetap tersedia bila Anda ingin versi cetak
dari tampilan web; keduanya memakai data yang sama.

Tidak perlu Python atau library tambahan. Jangan lupa perbarui `updated` di `cv.js`.

### Mengisi timeline Journey

Urutan entri ada di `src/data/journey.js`: `milestones` untuk bahasa Indonesia dan
`milestonesEn` untuk bahasa Inggris. Riwayat SD/SMP sengaja tidak ditampilkan.
Tambahkan organisasi, kepanitiaan, atau sertifikasi sebagai objek baru dengan `kind` yang
sesuai, supaya section ini tidak berhenti pada riwayat pendidikan saja.

## Asisten AI

Widget **Tanya AI** di kanan bawah menjawab pertanyaan pengunjung tentang isi portofolio.
Jawabannya dibatasi pada knowledge base di `src/data/knowledge.js`, yang dirangkai otomatis
dari `cv.js`, `journey.js`, dan `projectsCore*.js` (versi ID maupun EN) — jadi isi proyek
tidak perlu disalin dua kali.

### Setup

1. Buat API key gratis di [Google AI Studio](https://aistudio.google.com/apikey).
2. Lokal: salin `.env.example` menjadi `.env.local`, lalu isi `GEMINI_API_KEY`.
3. Vercel: **Project → Settings → Environment Variables**, tambahkan `GEMINI_API_KEY`
   untuk Production (dan Preview bila perlu), lalu redeploy.
4. Tanpa key, widget tetap tampil dan menjawab dengan pesan "asisten belum aktif" —
   situs tidak error.

Opsional: isi `GEMINI_MODEL` untuk mengganti model (default `gemini-3.5-flash`).

### Cara kerja

- `src/components/Assistant.jsx` mengirim maksimal 10 pesan terakhir ke `POST /api/chat`
  beserta `lang` yang sedang aktif.
- `api/chat.js` adalah Vercel Function; API key hanya dibaca di server dan tidak pernah
  masuk ke bundle browser.
- `api/_chat.js` memvalidasi input, membatasi **20 permintaan / 10 menit / IP**, dan memanggil
  Gemini dengan system prompt yang melarang menjawab di luar data portofolio. Prompt dan
  pesan error tersedia dalam dua bahasa; `payload.lang` (`'id'` / `'en'`) memilihnya.
- Saat `npm run dev`, `scripts/vite-plugin-assistant-api.js` menjalankan logika yang sama di
  Vite, jadi fitur ini bisa diuji tanpa `vercel dev`.

### Batasan yang disengaja

- Pertanyaan di luar portofolio ditolak dengan sopan.
- Angka, metrik, sertifikasi, organisasi, klien, dan pengalaman kerja tidak dikarang. Bila
  datanya tidak ada, asisten mengatakan belum dicantumkan dan mengarahkan ke kontak.
- Jangan menambahkan data pribadi sensitif ke `knowledge.js` atau `cv.js` — model akan
  membacanya. Pertanyaan pengunjung juga dikirim ke Google Gemini untuk diproses.
- Rate limit berbasis memori hanya berlaku per instance serverless. Untuk pembatasan yang
  lebih kuat, gunakan penyimpanan bersama (mis. Upstash Redis) atau batas kuota di Google AI Studio.

### Jika bermasalah

| Gejala | Penyebab umum |
|---|---|
| `503` | `GEMINI_API_KEY` belum diatur atau ditolak |
| `429` | Kuota Gemini habis, atau rate limit lokal tercapai |
| Model tidak ditemukan | Set `GEMINI_MODEL` ke model yang tersedia di akun Anda |

## Aksesibilitas

- Fokus keyboard terlihat di semua elemen interaktif: aturan global `:focus-visible` di `index.css` plus ring pada komponen.
- Modal studi kasus dan drawer mobile memakai focus trap, bisa ditutup dengan Escape, dan mengembalikan fokus ke tombol pemicu.
- Semua animasi berhenti saat `prefers-reduced-motion: reduce`; preloader juga dilewati.
- Mouse follower tidak menangkap klik (`pointer-events-none`), tidak aktif di layar sentuh, dan dimatikan saat `prefers-reduced-motion`.
- Form kontak: label terhubung ke input, status pengiriman diumumkan lewat `role="status"` + `aria-live`, tombol dinonaktifkan selama mengirim, dan honeypot `botcheck` aktif.
- Asisten AI: panel memakai `role="dialog"` dengan judul, fokus pindah ke input saat dibuka, Escape menutup dan mengembalikan fokus ke tombol pembuka, balasan diumumkan lewat `aria-live`, dan tombol kembali-ke-atas dinonaktifkan saat panel terbuka.

> Access key Web3Forms ada di `src/components/Contact.jsx` (normal untuk layanan ini).
> Batasi domain pengirim di dashboard Web3Forms agar key tidak disalahgunakan pihak lain.

## Deploy (Vercel)

1. Import repo ini di Vercel.
2. Framework preset: **Vite** (terdeteksi otomatis).
3. Build command: `npm run build` · Output directory: `dist`.
4. Tambahkan environment variable `GEMINI_API_KEY` agar asisten AI aktif
   (lihat bagian [Asisten AI](#asisten-ai)).
5. `public/404.html` otomatis disajikan Vercel untuk URL yang tidak dikenal — tidak perlu konfigurasi tambahan.

Setiap push ke `main` akan menjadi production deployment; branch lain menghasilkan preview URL.

Setelah domain aktif, cek berurutan:
1. Pastikan domain di `index.html`, `robots.txt`, `sitemap.xml`, dan `og-image.png` sudah sesuai.
2. Buka `https://domain-anda/robots.txt` → harus `Allow: /`, bukan `Disallow: /`.
3. Buka `https://domain-anda/og-image.png` → harus tampil gambarnya.
4. Uji preview link dengan WhatsApp/LinkedIn (atau [opengraph.xyz](https://www.opengraph.xyz/)).
5. Submit `sitemap.xml` di Google Search Console.
6. Buka URL ngawur, mis. `https://domain-anda/halaman-tidak-ada` → harus muncul halaman 404, bukan layar putih.
