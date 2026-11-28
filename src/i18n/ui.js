/* Kamus teks antarmuka.
   Setiap komponen membaca teks lewat `useLang().t`, jadi tidak ada string
   bahasa yang tertinggal di JSX. Isi proyek, journey, dan CV ada di file data
   masing-masing (projectsCore.en.js, journey.js, cv.js). */

export const LANGUAGES = ['id', 'en'];
export const DEFAULT_LANG = 'en';

export const ui = {
    id: {
        nav: {
            about: 'TENTANG SAYA',
            projects: 'PROYEK',
            expertise: 'KEAHLIAN',
            certificates: 'SERTIFIKAT',
            journey: 'PERJALANAN SAYA',
            contact: 'AYO BICARA',
            brandSub: 'PENGEMBANGAN WEB',
            mainLabel: 'Navigasi utama',
            mobileLabel: 'Navigasi mobile',
            menuLabel: 'Menu navigasi',
            menu: '// MENU',
            openMenu: 'Buka menu',
            closeMenu: 'Tutup menu',
            language: 'Pilih bahasa',
        },

        theme: {
            label: 'Mode gelap',
            toDark: 'Aktifkan mode gelap',
            toLight: 'Aktifkan mode terang',
        },

        hero: {
            greeting: 'Hai, saya',
            badge: 'Mahasiswa Teknik Informatika • Universitas Perjuangan',
            description:
                'Berfokus pada perancangan dan pengembangan aplikasi web yang dinamis, modern, serta interaktif dengan kualitas rekayasa end-to-end yang solid.',
            projectsCta: 'PROYEK',
            contactCta: 'HUBUNGI SAYA',
            cvCta: 'UNDUH CV ↓',
            cvAria: 'Unduh CV Adipraja Shidqi dalam format PDF',
            photoAlt: 'Foto Adipraja Shidqi Apriliano',
            stackTitle: 'Pengembangan Web Fullstack',
            stackTech: 'React • Tailwind CSS • Laravel • MySQL',
            focusTitle: 'Pengembangan Web & UI',
            focusSubtitle: 'Arsitektur end-to-end & Aplikasi Interaktif',
            backdrop: 'PORTOFOLIO',
        },

        about: {
            kicker: '// TENTANG SAYA',
            titleLine1: 'Adipraja - Mahasiswa',
            titleLine2: 'Informatika',
            paragraphs: [
                'Saya adalah Mahasiswa Teknik Informatika Universitas Perjuangan Tasikmalaya yang antusias dalam pengembangan web. Berfokus pada perancangan antarmuka yang bersih dan interaktif, serta memiliki ketertarikan kuat pada rekayasa perangkat lunak end-to-end.',
                'Sebagai mahasiswa Teknik Informatika yang sedang mendalami jalur full-stack, saya aktif mengeksplorasi ekosistem web. Melalui berbagai proyek akademik maupun mandiri, saya terbiasa merancang aplikasi web dari tahap konsep dasar hingga fungsional.',
            ],
            campusLabel: 'KAMPUS',
            campusValue: 'Universitas Perjuangan Tasikmalaya',
            focusLabel: 'FOKUS',
            focusValue: 'Fullstack Dev',
            statusLabel: 'STATUS',
            statusValue: 'Mahasiswa Aktif',
        },

        expertise: {
            kicker: '// KEAHLIAN TEKNIS',
            titleLine1: 'Keahlian',
            titleLine2: 'Teknis.',
            intro:
                'Kumpulan keahlian teknis yang saya pelajari dan kembangkan melalui perkuliahan maupun eksplorasi proyek mandiri.',
            domain: 'DOMAIN',
            technologies: 'TEKNOLOGI:',
            items: [
                {
                    title: 'Pengembangan Frontend',
                    description:
                        'Membangun antarmuka web yang interaktif, responsif, dan mengutamakan pengalaman pengguna (UI/UX) yang bersih.',
                },
                {
                    title: 'Pengembangan Backend',
                    description:
                        'Merancang arsitektur sisi server, pengelolaan basis data, dan pengembangan logika aplikasi yang aman serta terstruktur.',
                },
                {
                    title: 'Alat & Alur Kerja',
                    description:
                        'Memanfaatkan perangkat pendukung modern untuk kolaborasi, manajemen versi kode, dan pengujian aplikasi.',
                },
            ],
        },

        certificates: {
            kicker: '// VALIDASI PEMBELAJARAN',
            titleLine1: 'Sertifikat',
            titleLine2: ' & Pencapaian.',
            intro: 'Kumpulan sertifikat dan pencapaian yang mendukung perjalanan saya di bidang teknologi dan pengembangan web.',
            empty: 'Sertifikat akan ditampilkan di sini.',
            emptyHint: 'Halaman ini siap dikembangkan. Setiap sertifikat nantinya dapat dilengkapi penerbit, tanggal, keterampilan, dan tautan verifikasi.',
            back: 'Kembali ke portofolio',
        },

        projects: {
            kicker: '// PROYEK SAYA',
            titleLine1: 'Ini adalah',
            titleLine2: 'Proyek-proyek saya.',
            intro:
                'Kumpulan proyek pilihan yang saya bangun selama mendalami pengembangan web full-stack maupun proyek akademik.',
            folderTab: (count) => `// ${count} proyek`,
            archive: 'Arsip proyek // 2024 — 2026',
            coverLine1: 'Karya',
            coverLine2: 'Pilihan.',
            coverHint: 'KLIK untuk membuka arsip: studi kasus, teknologi, dan tautan kode.',
            openFolder: 'Buka folder',
            closeFolder: 'Tutup folder',
            folderCount: (count) => `${count} proyek`,
            showing: (shown, total) => `Menampilkan ${shown} dari ${total} proyek`,
            searchLabel: 'Cari proyek',
            searchPlaceholder: 'Cari proyek, teknologi, kategori…',
            clearSearch: 'Hapus kata kunci pencarian',
            filterLabel: 'Filter kategori proyek',
            allCategories: 'Semua',
            cardAria: (title) => `Buka studi kasus ${title}`,
            previewSoon: 'Pratinjau segera hadir',
            githubAria: (title) => `Kode sumber ${title} di GitHub`,
            githubTitle: 'Lihat kode sumber di GitHub',
            readCaseStudy: 'Baca studi kasus',
            emptyKicker: '// Tidak ada hasil',
            emptyTitle: 'Proyek tidak ditemukan.',
            emptyBody:
                'Coba kata kunci lain, atau kembali ke semua kategori untuk melihat seluruh proyek.',
            reset: 'Reset pencarian',
        },

        caseStudy: {
            close: 'Tutup studi kasus',
            previewSoon: 'Pratinjau segera hadir',
            role: 'Peran',
            year: 'Tahun',
            stack: 'Stack',
            features: 'Fitur utama',
            live: 'Demo',
        },

        journey: {
            kicker: '// GARIS WAKTU & PENGALAMAN',
            titleLine1: 'Perjalanan',
            titleLine2: 'sejauh ini.',
            intro: 'Pendidikan formal dan praktik yang saya tekuni untuk sampai di titik ini.',
        },

        contact: {
            kicker: '// HUBUNGI SAYA',
            titleLine1: 'Ayo bikin sesuatu yang luar biasa',
            titleLine2: 'BERSAMA.',
            intro:
                'Punya proyek menarik, tawaran kolaborasi, atau ingin berdiskusi seputar pengembangan web? Pintu saya selalu terbuka untuk Anda.',
            emailLabel: 'EMAIL LANGSUNG',
            locationLabel: 'TEMPAT TINGGAL',
            locationValue: 'TASIKMALAYA, JAWA BARAT, INDONESIA',
            cvLink: 'CV / Resume ↗',
            nameLabel: 'Nama Lengkap',
            namePlaceholder: 'Masukkan nama Anda',
            emailFieldLabel: 'Alamat Email',
            emailPlaceholder: 'nama@email.com',
            messageLabel: 'Pesan',
            messagePlaceholder: 'Tuliskan pesan atau detail proyek Anda...',
            submit: 'Kirim Pesan',
            sending: 'Mengirim…',
            formSubject: 'Pesan baru dari portofolio adprjshdq.vercel.app',
            formFromName: 'Portofolio Adipraja',
            status: {
                sending: 'Mengirim pesan…',
                success: 'Pesan terkirim. Terima kasih sudah menghubungi!',
                error: 'Pesan gagal dikirim. Silakan coba lagi beberapa saat lagi.',
                network: 'Koneksi bermasalah. Periksa jaringan Anda lalu coba lagi.',
            },
            copyright: (year) => `© ${year} Pengembangan oleh adipraja.`,
            builtWith: 'Dibuat dengan Teknologi React + Tailwind CSS',
        },

        assistant: {
            suggestions: [
                'Proyek apa saja yang pernah dibuat?',
                'Teknologi apa yang dikuasai?',
                'Ceritakan proyek Sistem Manajemen Kafe.',
                'Bagaimana cara menghubungi Adipraja?',
            ],
            launcherAria: 'Buka asisten AI portofolio',
            launcher: 'Tanya AI',
            kicker: '// AI Assistant',
            title: 'Tanya seputar portofolio',
            subtitle: 'Dijawab dari isi situs ini',
            newChat: 'Baru',
            close: 'Tutup asisten',
            welcome:
                'Halo! Saya asisten AI di portofolio ini. Saya bisa menjelaskan proyek, keahlian, pendidikan, dan cara menghubungi Adipraja.',
            tryAsking: 'Coba tanya',
            assistantPrefix: 'Asisten: ',
            typing: 'Asisten sedang mengetik…',
            inputLabel: 'Pertanyaan untuk asisten',
            inputPlaceholder: 'Tulis pertanyaan…',
            send: 'Kirim pertanyaan',
            disclaimer:
                'Dijawab AI (Gemini) dari data portofolio dan bisa keliru. Untuk memastikan, gunakan form kontak.',
            errors: {
                notConfigured:
                    'Asisten belum aktif saat ini. Silakan hubungi lewat form kontak atau email.',
                rateLimited: 'Terlalu banyak pertanyaan. Tunggu beberapa menit lalu coba lagi.',
                generic: 'Asisten sedang bermasalah. Silakan coba lagi.',
                empty: 'Asisten tidak mengirim jawaban. Silakan coba lagi.',
                timeout: 'Waktu tunggu habis. Silakan coba lagi.',
            },
        },

        preloader: {
            brand: 'PORTOFOLIO • 2026',
            kicker: '// MEMULAI',
            title: 'MEMUAT SABAR',
            tagline: 'LOGIKA & PENGALAMAN SISTEM',
        },

        backToTop: 'Kembali ke atas',

        cv: {
            back: '← Kembali ke portofolio',
            download: 'Unduh PDF',
            print: 'Cetak / Simpan PDF',
            updated: (date) => `Diperbarui ${date}`,
            sections: {
                profile: 'Profil',
                projects: 'Proyek Pilihan',
                education: 'Pendidikan',
                organizations: 'Organisasi',
                certifications: 'Sertifikasi',
                skills: 'Keahlian',
                contact: 'Kontak',
            },
            pdfFileName: 'Adipraja-Shidqi-CV.pdf',
        },
    },

    en: {
        nav: {
            about: 'ABOUT ME',
            projects: 'PROJECTS',
            expertise: 'SKILLS',
            certificates: 'CERTIFICATES',
            journey: 'MY JOURNEY',
            contact: "LET'S TALK",
            brandSub: 'WEB DEVELOPMENT',
            mainLabel: 'Main navigation',
            mobileLabel: 'Mobile navigation',
            menuLabel: 'Navigation menu',
            menu: '// MENU',
            openMenu: 'Open menu',
            closeMenu: 'Close menu',
            language: 'Select language',
        },

        theme: {
            label: 'Dark mode',
            toDark: 'Switch to dark mode',
            toLight: 'Switch to light mode',
        },

        hero: {
            greeting: 'Hi, I am',
            badge: 'Informatics Engineering Student • Perjuangan University',
            description:
                'Focused on designing and building dynamic, modern, and interactive web applications with solid end-to-end engineering quality.',
            projectsCta: 'PROJECTS',
            contactCta: 'CONTACT ME',
            cvCta: 'DOWNLOAD CV ↓',
            cvAria: 'Download Adipraja Shidqi CV as a PDF',
            photoAlt: 'Photo of Adipraja Shidqi Apriliano',
            stackTitle: 'Fullstack Web Development',
            stackTech: 'React • Tailwind CSS • Laravel • MySQL',
            focusTitle: 'Web & UI Development',
            focusSubtitle: 'End-to-end Architecture & Interactive Apps',
            backdrop: 'PORTOFOLIO',
        },

        about: {
            kicker: '// ABOUT ME',
            titleLine1: 'Adipraja - Informatics',
            titleLine2: 'Student',
            paragraphs: [
                'I am an Informatics Engineering student at Perjuangan University Tasikmalaya with a strong enthusiasm for web development. I focus on designing clean, interactive interfaces and have a deep interest in end-to-end software engineering.',
                'As an Informatics Engineering student currently exploring the full-stack path, I actively explore the web ecosystem. Through academic and independent projects, I am used to designing web applications from the initial concept stage to a working product.',
            ],
            campusLabel: 'CAMPUS',
            campusValue: 'Perjuangan University Tasikmalaya',
            focusLabel: 'FOCUS',
            focusValue: 'Fullstack Dev',
            statusLabel: 'STATUS',
            statusValue: 'Active Student',
        },

        expertise: {
            kicker: '// TECHNICAL SKILLS',
            titleLine1: 'Technical',
            titleLine2: 'Skills.',
            intro:
                'A collection of technical skills I have learned and developed through coursework and independent project exploration.',
            domain: 'DOMAIN',
            technologies: 'TECHNOLOGIES:',
            items: [
                {
                    title: 'Frontend Development',
                    description:
                        'Building interactive, responsive web interfaces with a focus on clean user experience (UI/UX).',
                },
                {
                    title: 'Backend Development',
                    description:
                        'Designing server-side architecture, database management, and secure, structured application logic.',
                },
                {
                    title: 'Tools & Workflow',
                    description:
                        'Using modern supporting tools for collaboration, version control, and application testing.',
                },
            ],
        },

        certificates: {
            kicker: '// LEARNING CREDENTIALS',
            titleLine1: 'Certificates',
            titleLine2: ' & Achievements.',
            intro: 'A collection of certificates and achievements that support my journey in technology and web development.',
            empty: 'Certificates will appear here.',
            emptyHint: 'This page is ready to grow. Each certificate can include its issuer, date, skills, and verification link.',
            back: 'Back to portfolio',
        },

        projects: {
            kicker: '// MY PROJECTS',
            titleLine1: 'These are',
            titleLine2: 'my projects.',
            intro:
                'A selection of projects I built while exploring full-stack web development and academic work.',
            folderTab: (count) => `// ${count} projects`,
            archive: 'Project archive // 2024 — 2026',
            coverLine1: 'Selected',
            coverLine2: 'Work.',
            coverHint: 'CLICK to open the archive: case studies, tech stack, and code links.',
            openFolder: 'Open folder',
            closeFolder: 'Close folder',
            folderCount: (count) => `${count} projects`,
            showing: (shown, total) => `Showing ${shown} of ${total} projects`,
            searchLabel: 'Search projects',
            searchPlaceholder: 'Search projects, tech, category…',
            clearSearch: 'Clear search keyword',
            filterLabel: 'Filter project categories',
            allCategories: 'All',
            cardAria: (title) => `Open case study for ${title}`,
            previewSoon: 'Preview coming soon',
            githubAria: (title) => `Source code for ${title} on GitHub`,
            githubTitle: 'View source code on GitHub',
            readCaseStudy: 'Read case study',
            emptyKicker: '// No results',
            emptyTitle: 'No projects found.',
            emptyBody:
                'Try another keyword, or go back to all categories to see every project.',
            reset: 'Reset search',
        },

        caseStudy: {
            close: 'Close case study',
            previewSoon: 'Preview coming soon',
            role: 'Role',
            year: 'Year',
            stack: 'Stack',
            features: 'Key features',
            live: 'Live demo',
        },

        journey: {
            kicker: '// TIMELINE & EXPERIENCE',
            titleLine1: 'Journey',
            titleLine2: 'so far.',
            intro: 'Formal education and practice I have pursued to reach this point.',
        },

        contact: {
            kicker: '// CONTACT ME',
            titleLine1: "Let's build something amazing",
            titleLine2: 'TOGETHER.',
            intro:
                'Have an interesting project, a collaboration offer, or want to talk about web development? My door is always open.',
            emailLabel: 'DIRECT EMAIL',
            locationLabel: 'LOCATION',
            locationValue: 'TASIKMALAYA, WEST JAVA, INDONESIA',
            cvLink: 'CV / Resume ↗',
            nameLabel: 'Full Name',
            namePlaceholder: 'Enter your name',
            emailFieldLabel: 'Email Address',
            emailPlaceholder: 'name@email.com',
            messageLabel: 'Message',
            messagePlaceholder: 'Write your message or project details...',
            submit: 'Send Message',
            sending: 'Sending…',
            formSubject: 'New message from the adprjshdq.vercel.app portfolio',
            formFromName: 'Adipraja Portfolio',
            status: {
                sending: 'Sending message…',
                success: 'Message sent. Thank you for reaching out!',
                error: 'The message could not be sent. Please try again in a moment.',
                network: 'Connection problem. Check your network and try again.',
            },
            copyright: (year) => `© ${year} Development by adipraja.`,
            builtWith: 'Built with React + Tailwind CSS',
        },

        assistant: {
            suggestions: [
                'What projects have been built?',
                'What technologies are you skilled in?',
                'Tell me about the Cafe Management System.',
                'How can I contact Adipraja?',
            ],
            launcherAria: 'Open portfolio AI assistant',
            launcher: 'Ask AI',
            kicker: '// AI Assistant',
            title: 'Ask about the portfolio',
            subtitle: 'Answered from this site',
            newChat: 'New',
            close: 'Close assistant',
            welcome:
                'Hi! I am the AI assistant on this portfolio. I can explain the projects, skills, education, and how to contact Adipraja.',
            tryAsking: 'Try asking',
            assistantPrefix: 'Assistant: ',
            typing: 'Assistant is typing…',
            inputLabel: 'Question for the assistant',
            inputPlaceholder: 'Type your question…',
            send: 'Send question',
            disclaimer:
                'Answered by AI (Gemini) from portfolio data and may be inaccurate. For certainty, use the contact form.',
            errors: {
                notConfigured:
                    'The assistant is not active right now. Please reach out through the contact form or email.',
                rateLimited: 'Too many questions. Wait a few minutes and try again.',
                generic: 'The assistant is having trouble. Please try again.',
                empty: 'The assistant did not send a reply. Please try again.',
                timeout: 'The request timed out. Please try again.',
            },
        },

        preloader: {
            brand: 'PORTFOLIO • 2026',
            kicker: '// INITIALIZING',
            title: 'LOADING',
            tagline: 'SYSTEM LOGIC & EXPERIENCES',
        },

        backToTop: 'Back to top',

        cv: {
            back: '← Back to portfolio',
            download: 'Download PDF',
            print: 'Print / Save PDF',
            updated: (date) => `Updated ${date}`,
            sections: {
                profile: 'Profile',
                projects: 'Selected Projects',
                education: 'Education',
                organizations: 'Organizations',
                certifications: 'Certifications',
                skills: 'Skills',
                contact: 'Contact',
            },
            pdfFileName: 'Adipraja-Shidqi-CV-EN.pdf',
        },
    },
};
