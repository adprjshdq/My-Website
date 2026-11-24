export const milestones = [
    {
        period: '2024 – Sekarang',
        kind: 'Pendidikan',
        role: 'S1 Teknik Informatika',
        organization: 'Universitas Perjuangan Tasikmalaya',
        description:
            'Menempuh studi dengan fokus rekayasa perangkat lunak, struktur data, dan pengembangan web',
    },
    {
        period: '2024 – Sekarang',
        kind: 'Praktik',
        role: 'Proyek Web Fullstack',
        organization: 'Mandiri & tugas kuliah',
        description:
            'Membangun aplikasi nyata seperti sistem manajemen Cafe dan pembayaran SPP untuk mengasah alur kerja end-to-end: perancangan antarmuka, API, basis data, sampai versi terkontrol di Git.',
    },
    {
        period: '2021 – 2024',
        kind: 'Pendidikan',
        role: 'Sekolah Menengah Atas',
        organization: 'MAN 2 Kota Tasikmalaya',
        description:
            'Menyelesaikan pendidikan menengah atas dan mulai belajar pemrograman web secara mandiri.',
    },
];

export const milestonesEn = [
    {
        period: '2024 – Present',
        kind: 'Education',
        role: 'Informatics Engineering (S1)',
        organization: 'Universitas Perjuangan Tasikmalaya',
        description:
            'Studying software engineering, data structures, and web development.',
    },
    {
        period: '2024 – Present',
        kind: 'Practice',
        role: 'Fullstack Web Projects',
        organization: 'Independent & coursework',
        description:
            'Building real applications such as a cafe management system and a school tuition payment system to sharpen the end-to-end workflow: interface design, APIs, databases, and version control with Git.',
    },
    {
        period: '2021 – 2024',
        kind: 'Education',
        role: 'Senior High School',
        organization: 'MAN 2 Kota Tasikmalaya',
        description:
            'Completed secondary education and began learning web programming independently.',
    },
];

export function getMilestones(lang) {
    return lang === 'id' ? milestones : milestonesEn;
}
