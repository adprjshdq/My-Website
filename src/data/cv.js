/**
 * Isi CV. Ini satu-satunya sumber data untuk halaman /cv/ dan PDF di
 * public/cv/Adipraja-Shidqi-CV.pdf.
 *
 * Setelah mengubah file ini, PDF dibuat otomatis:
 *   - `npm run dev`   → dibuat saat start, lalu diperbarui setiap file ini disimpan
 *   - `npm run build` → dijalankan sebelum build (termasuk deploy Vercel)
 *   - `npm run cv:pdf` → bila ingin memperbarui manual tanpa build
 *
 * Jangan menulis angka, sertifikasi, atau organisasi yang belum benar-benar
 * Anda miliki — CV yang jujur lebih mudah dipertanggungjawabkan saat interview.
 */
export const cv = {
    updated: 'November 2026',
    name: 'Adipraja Shidqi Apriliano',
    role: 'Fullstack Web Developer',
    location: 'Tasikmalaya, Jawa Barat, Indonesia',
    email: 'shidqiadipraja@gmail.com',

    links: [
        { label: 'adiprajashdq.vercel.app', href: 'https://adiprajashdq.vercel.app/' },
        { label: 'github.com/adprjshdq', href: 'https://github.com/adprjshdq/' },
        { label: 'linkedin.com/in/adiprajashdq', href: 'https://www.linkedin.com/in/adiprajashdq/' },
    ],

    profile:
        'Mahasiswa Teknik Informatika Universitas Perjuangan Tasikmalaya yang antusias pada pengembangan web fullstack. Terbiasa membangun aplikasi dari perancangan antarmuka (React + Tailwind CSS) hingga API dan basis data (Laravel + MySQL) melalui proyek akademik maupun mandiri.',

    education: [
        {
            period: '2024 – sekarang',
            degree: 'S1 Teknik Informatika',
            school: 'Universitas Perjuangan Tasikmalaya',
        },
        {
            period: '2021 – 2024',
            degree: 'Sekolah Menengah Atas',
            school: 'MAN 2 Kota Tasikmalaya',
        },
    ],

    // Opsional. Section baru hanya muncul kalau array berisi minimal satu entri.
    // Contoh: { period: '2025 – sekarang', role: 'Anggota Divisi Web', place: 'Nama Organisasi' }
    organizations: [],

    // Contoh: { year: '2025', name: 'Nama Sertifikat', issuer: 'Penerbit' }
    certifications: [],

    skills: [
        {
            label: 'Frontend',
            items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Vite'],
        },
        {
            label: 'Backend',
            items: ['Node.js', 'Laravel', 'PHP', 'MySQL', 'REST API'],
        },
        {
            label: 'Tools',
            items: ['Git & GitHub', 'VS Code', 'npm', 'Responsive Design'],
        },
    ],

    projects: [
        {
            title: 'Sistem Manajemen Kafe Berbasis Web',
            tech: ['Laravel', 'MySQL', 'React'],
            description:
                'Pengelolaan menu, kategori, transaksi penjualan, pemesanan, pembayaran, meja, pengguna, serta pemantauan pesanan lewat Kitchen Display System.',
        },
        {
            title: 'Sistem Pembayaran SPP Sekolah',
            tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'Midtrans'],
            description:
                'Admin mengelola tahun ajaran, kelas, tarif, siswa, tagihan, pembayaran, dan laporan; siswa melihat tunggakan, membayar online via Midtrans, serta mengunduh kwitansi.',
        },
        {
            title: 'Website Sekolah MAN 2 Kota Tasikmalaya',
            tech: ['HTML', 'CSS', 'JavaScript'],
            description:
                'Landing page sekolah yang responsif dan interaktif sebagai media informasi sekolah.',
        },
        {
            title: 'Personal Portfolio Website',
            tech: ['React', 'Tailwind CSS', 'Vite'],
            description:
                'Website portofolio bergaya editorial minimalis dengan animasi scroll reveal, navigasi aktif, dan form kontak fungsional.',
        },
    ],

    // File PDF yang diunduh pengunjung. Ganti isinya dengan hasil print halaman ini.
    pdfPath: '/cv/Adipraja-Shidqi-CV.pdf',
};
