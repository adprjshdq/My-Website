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

    organizations: [],

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

    // File PDF yang diunduh pengunjung. Dibuat oleh scripts/generate-cv-pdf.jsx.
    pdfPath: '/cv/Adipraja-Shidqi-CV.pdf',
};

export const cvEn = {
    updated: 'November 2026',
    name: 'Adipraja Shidqi Apriliano',
    role: 'Fullstack Web Developer',
    location: 'Tasikmalaya, West Java, Indonesia',
    email: 'shidqiadipraja@gmail.com',

    links: cv.links,

    profile:
        'Informatics Engineering student at Universitas Perjuangan Tasikmalaya with a strong interest in fullstack web development. Experienced in building applications from interface design (React + Tailwind CSS) to APIs and databases (Laravel + MySQL) through academic and independent projects.',

    education: [
        {
            period: '2024 – present',
            degree: 'Bachelor of Informatics Engineering',
            school: 'Universitas Perjuangan Tasikmalaya',
        },
        {
            period: '2021 – 2024',
            degree: 'Senior High School',
            school: 'MAN 2 Kota Tasikmalaya',
        },
    ],

    organizations: [],

    certifications: [],

    skills: cv.skills,

    projects: [
        {
            title: 'Web-Based Cafe Management System',
            tech: ['Laravel', 'MySQL', 'React'],
            description:
                'Menu, category, sales transaction, ordering, payment, table, and user management, plus order monitoring through a Kitchen Display System.',
        },
        {
            title: 'School Tuition Payment System',
            tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'Midtrans'],
            description:
                'Admins manage academic years, classes, rates, students, bills, payments, and reports; students view arrears, pay online via Midtrans, and download receipts.',
        },
        {
            title: 'MAN 2 Kota Tasikmalaya School Website',
            tech: ['HTML', 'CSS', 'JavaScript'],
            description:
                'A responsive, interactive school landing page serving as the school information channel.',
        },
        {
            title: 'Personal Portfolio Website',
            tech: ['React', 'Tailwind CSS', 'Vite'],
            description:
                'A minimalist editorial portfolio with scroll-reveal animations, active navigation, and a working contact form.',
        },
    ],

    pdfPath: '/cv/Adipraja-Shidqi-CV-EN.pdf',
};

const cvsByLang = { id: cv, en: cvEn };

export function getCv(lang) {
    return cvsByLang[lang] ?? cvEn;
}
