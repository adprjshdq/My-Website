import { cv } from './cv.js';
import { milestones } from './journey.js';
import { projectFacts } from './projectsCore.js';

export function buildKnowledgeBase() {
    const lines = [];

    lines.push('# IDENTITAS');
    lines.push(`Nama: ${cv.name}`);
    lines.push(`Peran: ${cv.role}`);
    lines.push(`Lokasi: ${cv.location}`);
    lines.push(`Email: ${cv.email}`);
    lines.push(`CV terakhir diperbarui: ${cv.updated}`);
    lines.push('Tautan:');
    for (const link of cv.links) lines.push(`- ${link.label} -> ${link.href}`);

    lines.push('');
    lines.push('# PROFIL');
    lines.push(cv.profile);

    lines.push('');
    lines.push('# PENDIDIKAN');
    for (const item of cv.education) {
        lines.push(`- ${item.period}: ${item.degree}, ${item.school}`);
    }

    lines.push('');
    lines.push('# KEAHLIAN');
    for (const group of cv.skills) {
        lines.push(`- ${group.label}: ${group.items.join(', ')}`);
    }

    lines.push('');
    lines.push('# PROYEK');
    for (const project of projectFacts) {
        lines.push('');
        lines.push(`## ${project.id}. ${project.title}`);
        lines.push(`Kategori: ${project.category} | Tahun: ${project.year} | Peran: ${project.role}`);
        lines.push(`Ringkasan: ${project.summary}`);
        lines.push(`Teknologi: ${project.tech.join(', ')}`);
        for (const section of project.sections) {
            lines.push(`${section.label}: ${section.body}`);
        }
        lines.push(`Fitur utama: ${project.features.join(', ')}`);
        lines.push(`Kode sumber: ${project.github}`);
        lines.push(`Demo publik: ${project.live ?? 'tidak ada demo publik'}`);
    }

    lines.push('');
    lines.push('# PERJALANAN');
    for (const item of milestones) {
        lines.push(`- ${item.period} | ${item.kind}: ${item.role} — ${item.organization}. ${item.description}`);
    }

    lines.push('');
    lines.push('# TENTANG WEBSITE INI');
    lines.push('- Bagian halaman: About (#about), Selected Work (#projects), Technical Skills (#expertise), Journey (#journey), dan Contact (#contact).');
    lines.push('- Halaman CV: /cv/. Berkas PDF: /cv/Adipraja-Shidqi-CV.pdf.');
    lines.push('- Dibangun dengan React, Tailwind CSS, dan Vite; dideploy di Vercel.');
    lines.push(`- Form kontak mengirim pesan lewat Web3Forms. Email langsung: ${cv.email}.`);
    lines.push('- Setiap proyek punya modal studi kasus berisi latar belakang, pekerjaan yang dilakukan, dan tantangan/solusi.');
    lines.push('- Asisten ini menjawab berdasarkan isi portofolio, bukan pencarian internet.');

    lines.push('');
    lines.push('# BATASAN DATA');
    lines.push(`- Organisasi: ${cv.organizations.length ? cv.organizations.map((item) => `${item.role} di ${item.place} (${item.period})`).join('; ') : 'tidak dicantumkan'}.`);
    lines.push(`- Sertifikasi: ${cv.certifications.length ? cv.certifications.map((item) => `${item.name} dari ${item.issuer} (${item.year})`).join('; ') : 'tidak dicantumkan'}.`);
    lines.push('- Tidak ada angka metrik (jumlah pengguna, pendapatan, performa) yang dipublikasikan.');
    lines.push('- Tidak ada pengalaman kerja formal, daftar klien, atau penghargaan yang dicantumkan selain proyek di atas.');
    lines.push('- Status ketersediaan untuk magang/freelance tidak dicantumkan; arahkan pengunjung ke form kontak atau email.');

    return lines.join('\n');
}

export const knowledgeBase = buildKnowledgeBase();
