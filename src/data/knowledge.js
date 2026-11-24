import { getCv } from './cv.js';
import { getMilestones } from './journey.js';
import { projectFacts } from './projectsCore.js';
import { projectFactsEn } from './projectsCore.en.js';

const copy = {
    id: {
        identity: '# IDENTITAS',
        name: 'Nama',
        role: 'Peran',
        location: 'Lokasi',
        email: 'Email',
        updated: 'CV terakhir diperbarui',
        links: 'Tautan',
        profile: '# PROFIL',
        education: '# PENDIDIKAN',
        skills: '# KEAHLIAN',
        projects: '# PROYEK',
        projectCategory: 'Kategori',
        projectYear: 'Tahun',
        projectRole: 'Peran',
        projectSummary: 'Ringkasan',
        projectTech: 'Teknologi',
        projectFeatures: 'Fitur utama',
        projectSource: 'Kode sumber',
        projectDemo: 'Demo publik',
        noDemo: 'tidak ada demo publik',
        journey: '# PERJALANAN',
        aboutSite: '# TENTANG WEBSITE INI',
        aboutLines: (email) => [
            '- Bagian halaman: About (#about), Selected Work (#projects), Technical Skills (#expertise), Journey (#journey), dan Contact (#contact).',
            '- Halaman CV: /cv/. Berkas PDF: /cv/Adipraja-Shidqi-CV.pdf.',
            '- Dibangun dengan React, Tailwind CSS, dan Vite; dideploy di Vercel.',
            `- Form kontak mengirim pesan lewat Web3Forms. Email langsung: ${email}.`,
            '- Setiap proyek punya modal studi kasus berisi latar belakang, pekerjaan yang dilakukan, dan tantangan/solusi.',
            '- Asisten ini menjawab berdasarkan isi portofolio, bukan pencarian internet.',
        ],
        limits: '# BATASAN DATA',
        limitLines: (data) => [
            `- Organisasi: ${data.organizations.length ? data.organizations.map((item) => `${item.role} di ${item.place} (${item.period})`).join('; ') : 'tidak dicantumkan'}.`,
            `- Sertifikasi: ${data.certifications.length ? data.certifications.map((item) => `${item.name} dari ${item.issuer} (${item.year})`).join('; ') : 'tidak dicantumkan'}.`,
            '- Tidak ada angka metrik (jumlah pengguna, pendapatan, performa) yang dipublikasikan.',
            '- Tidak ada pengalaman kerja formal, daftar klien, atau penghargaan yang dicantumkan selain proyek di atas.',
            '- Status ketersediaan untuk magang/freelance tidak dicantumkan; arahkan pengunjung ke form kontak atau email.',
        ],
    },

    en: {
        identity: '# IDENTITY',
        name: 'Name',
        role: 'Role',
        location: 'Location',
        email: 'Email',
        updated: 'CV last updated',
        links: 'Links',
        profile: '# PROFILE',
        education: '# EDUCATION',
        skills: '# SKILLS',
        projects: '# PROJECTS',
        projectCategory: 'Category',
        projectYear: 'Year',
        projectRole: 'Role',
        projectSummary: 'Summary',
        projectTech: 'Technologies',
        projectFeatures: 'Key features',
        projectSource: 'Source code',
        projectDemo: 'Public demo',
        noDemo: 'no public demo',
        journey: '# JOURNEY',
        aboutSite: '# ABOUT THIS WEBSITE',
        aboutLines: (email) => [
            '- Page sections: About (#about), Selected Work (#projects), Technical Skills (#expertise), Journey (#journey), and Contact (#contact).',
            '- CV page: /cv/. PDF file: /cv/Adipraja-Shidqi-CV-EN.pdf.',
            '- Built with React, Tailwind CSS, and Vite; deployed on Vercel.',
            `- The contact form sends messages via Web3Forms. Direct email: ${email}.`,
            '- Every project has a case study modal with the background, work done, and challenges/solutions.',
            '- This assistant answers from the portfolio content, not internet search.',
        ],
        limits: '# DATA LIMITS',
        limitLines: (data) => [
            `- Organizations: ${data.organizations.length ? data.organizations.map((item) => `${item.role} at ${item.place} (${item.period})`).join('; ') : 'not listed'}.`,
            `- Certifications: ${data.certifications.length ? data.certifications.map((item) => `${item.name} from ${item.issuer} (${item.year})`).join('; ') : 'not listed'}.`,
            '- No metric figures (user counts, revenue, performance) are published.',
            '- No formal work experience, client list, or awards are listed beyond the projects above.',
            '- Internship/freelance availability is not stated; direct visitors to the contact form or email.',
        ],
    },
};

export function buildKnowledgeBase(lang = 'en') {
    const key = lang === 'id' ? 'id' : 'en';
    const c = copy[key];
    const data = getCv(key);
    const milestones = getMilestones(key);
    const facts = key === 'id' ? projectFacts : projectFactsEn;

    const lines = [];

    lines.push(c.identity);
    lines.push(`${c.name}: ${data.name}`);
    lines.push(`${c.role}: ${data.role}`);
    lines.push(`${c.location}: ${data.location}`);
    lines.push(`${c.email}: ${data.email}`);
    lines.push(`${c.updated}: ${data.updated}`);
    lines.push(`${c.links}:`);
    for (const link of data.links) lines.push(`- ${link.label} -> ${link.href}`);

    lines.push('');
    lines.push(c.profile);
    lines.push(data.profile);

    lines.push('');
    lines.push(c.education);
    for (const item of data.education) {
        lines.push(`- ${item.period}: ${item.degree}, ${item.school}`);
    }

    lines.push('');
    lines.push(c.skills);
    for (const group of data.skills) {
        lines.push(`- ${group.label}: ${group.items.join(', ')}`);
    }

    lines.push('');
    lines.push(c.projects);
    for (const project of facts) {
        lines.push('');
        lines.push(`## ${project.id}. ${project.title}`);
        lines.push(
            `${c.projectCategory}: ${project.category} | ${c.projectYear}: ${project.year} | ${c.projectRole}: ${project.role}`,
        );
        lines.push(`${c.projectSummary}: ${project.summary}`);
        lines.push(`${c.projectTech}: ${project.tech.join(', ')}`);
        for (const section of project.sections) {
            lines.push(`${section.label}: ${section.body}`);
        }
        lines.push(`${c.projectFeatures}: ${project.features.join(', ')}`);
        lines.push(`${c.projectSource}: ${project.github}`);
        lines.push(`${c.projectDemo}: ${project.live ?? c.noDemo}`);
    }

    lines.push('');
    lines.push(c.journey);
    for (const item of milestones) {
        lines.push(
            `- ${item.period} | ${item.kind}: ${item.role} — ${item.organization}. ${item.description}`,
        );
    }

    lines.push('');
    lines.push(c.aboutSite);
    lines.push(...c.aboutLines(data.email));

    lines.push('');
    lines.push(c.limits);
    lines.push(...c.limitLines(data));

    return lines.join('\n');
}

const cache = new Map();

export function getKnowledgeBase(lang = 'en') {
    const key = lang === 'id' ? 'id' : 'en';

    if (!cache.has(key)) {
        cache.set(key, buildKnowledgeBase(key));
    }

    return cache.get(key);
}
