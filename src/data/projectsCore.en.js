/* English version of projectFacts. Struktur dan urutannya harus sama dengan
   projectsCore.js; id dan slug dipakai untuk mencocokkan gambar pratinjau. */
export const projectFactsEn = [
    {
        id: '01',
        slug: 'website-sekolah',
        title: 'School Website',
        categoryKey: 'multi-page',
        category: 'Multi-Page Website',
        year: '2026',
        role: 'Frontend Developer',
        summary:
            'A 10-page school website covering the profile, academics, facilities, alumni, careers, and new student admissions.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        imageAlt:
            'Screenshot of the MAN 2 Kota Tasikmalaya homepage with a student photo hero and main navigation.',
        imageNote: null,
        github: 'https://github.com/adprjshdq/website_sekolah_man2.git',
        live: 'https://adiprajawebsekolah.vercel.app/',
        sections: [
            {
                label: 'Background',
                body: 'School information was scattered and hard for prospective students to access. A single official channel was needed to cover the profile, academics, facilities, alumni, careers, and the new student admission flow.',
            },
            {
                label: 'What I did',
                body: 'Built 10 static pages from scratch without a CSS framework: a homepage with a carousel, profile, academics, facilities, gallery, alumni, careers, contact, and admissions. I kept the header, footer, and typography consistent across every page, then tested them at small screen sizes.',
            },
            {
                label: 'Challenges & solutions',
                body: 'Without a component system, every navigation change had to be applied manually in each file. I consolidated the styles into one stylesheet and reused the same markup snippets, so small changes would not break the layout between pages.',
            },
        ],
        features: [
            'Homepage with carousel',
            '10 content pages',
            'Responsive navigation',
            'Contact form',
            'Student admission form',
        ],
    },
    {
        id: '02',
        slug: 'sistem-kafe',
        title: 'Cafe Management System',
        categoryKey: 'web-app',
        category: 'Web Application',
        year: '2026',
        role: 'Fullstack Developer',
        summary:
            'A cashier and kitchen application: menu, categories, transactions, payments, tables, users, and a Kitchen Display System.',
        tech: ['React', 'Laravel', 'MySQL'],
        imageAlt:
            'Screenshot of the Aroma Cafe Management System dashboard: revenue summary, orders, kitchen queue, and table occupancy.',
        imageNote: null,
        github: 'https://github.com/adprjshdq/System-Cafe-Management.git',
        live: null,
        sections: [
            {
                label: 'Background',
                body: 'The cashier and kitchen worked from different records, so order status was easily mixed up and hard to track during busy hours. A single system was needed to unite the menu, transactions, and order flow.',
            },
            {
                label: 'What I did',
                body: 'Designed the database schema for menus, categories, transactions, order items, tables, and users, then built CRUD modules, the ordering process, payments, and a Kitchen Display System with React on the front end and Laravel for the API and database.',
            },
            {
                label: 'Challenges & solutions',
                body: 'A single order can contain many items, and its status must read the same for both the cashier and the kitchen. I separated the order and order-item tables, then made the order status the single source of truth used by both views.',
            },
        ],
        features: [
            'Menu & category management',
            'Transactions & payments',
            'Kitchen Display System',
            'Table & user management',
            'Order status monitoring',
        ],
    },
    {
        id: '03',
        slug: 'portfolio',
        title: 'Personal Portfolio Website',
        categoryKey: 'frontend-ui',
        category: 'Frontend & UI Design',
        year: '2026',
        role: 'Design & Frontend',
        summary:
            'The minimalist editorial portfolio website you are reading now, complete with case study pages.',
        tech: ['React', 'Tailwind CSS', 'Vite'],
        imageAlt:
            'Screenshot of the Adipraja portfolio homepage with editorial typography and action buttons.',
        featured: false,
        imageNote: null,
        github: 'https://github.com/adprjshdq/My-Website.git',
        live: 'https://adprjshdq.vercel.app/',
        sections: [
            {
                label: 'Background',
                body: 'A portfolio is the first place people judge how I work. I wanted my own visual identity rather than a template, and an honest space to show the process behind every project.',
            },
            {
                label: 'What I did',
                body: 'Designed and built the site from scratch: an editorial layout with lime accents, entrance animations, per-section scroll reveal, active navigation, a preloader, case study modals, a contact form via Web3Forms, and a Vite build.',
            },
            {
                label: 'Challenges & solutions',
                body: 'Animation must not sacrifice accessibility. All motion stops when a visitor prefers reduced motion, the mobile drawer and modal use focus traps, every button is keyboard reachable, and content stays readable without animation.',
            },
        ],
        features: [
            'Responsive editorial design',
            'Scroll reveal & active navigation',
            'Case study modals',
            'Backendless contact form',
            'prefers-reduced-motion support',
        ],
    },
    {
        id: '04',
        slug: 'sistem-spp',
        title: 'School Tuition Payment System',
        categoryKey: 'web-app',
        category: 'Web Application',
        year: '2026',
        role: 'Fullstack Developer',
        summary:
            'Manage academic years, tuition rates, bills, payments, and reports with Midtrans online payments.',
        tech: ['Laravel', 'Tailwind CSS', 'MySQL'],
        imageAlt:
            'Screenshot of the EduPay tuition dashboard: financial summary, active student count, and completion percentage per class.',
        imageNote: null,
        github: 'https://github.com/adprjshdq/sistem-pembayaran-spp-sekolah.git',
        live: null,
        sections: [
            {
                label: 'Background',
                body: 'Manually recorded tuition payments made it hard for the school to track each student\'s arrears and compile reports per academic year. Parents also had to come to school to pay.',
            },
            {
                label: 'What I did',
                body: 'Built a Laravel application to manage academic years, classes, rates, students, bills, payments, and reports. Students can view their arrears, pay through Midtrans, then download or print a receipt.',
            },
            {
                label: 'Challenges & solutions',
                body: 'Bill amounts depend on the rate per academic year and class, while payment status comes from the payment provider. I separated bill and payment data, then updated the bill status only after a payment was confirmed.',
            },
        ],
        features: [
            'Academic years, classes & rates',
            'Automatic bills per student',
            'Midtrans online payments',
            'Downloadable & printable receipts',
            'Payment reports',
        ],
    },
    {
        id: '05',
        slug: 'barbershop-booking',
        title: 'Barbershop Booking',
        categoryKey: 'web-app',
        category: 'Web Application',
        year: '2026',
        role: 'Fullstack Developer',
        summary:
            'A barbershop booking app with real-time slots, a 5-step booking wizard, and an admin dashboard for bookings, barbers, services, schedules, and payments.',
        tech: ['React', 'Laravel', 'MySQL'],
        imageAlt:
            'Screenshot of the BarberBook dashboard with booking summary, barber schedule, and payment status.',
        imageNote: null,
        github: 'https://github.com/adprjshdq/barbershop-booking.git',
        live: null,
        sections: [
            {
                label: 'Background',
                body: 'Barbershop bookings managed through WhatsApp, phone calls, or a notebook are prone to double booking because there is no single source of schedule truth. Different service durations, barber working hours, days off, and transaction history were also recorded separately. BarberBook brings it all together: customers book slots that are genuinely free, while admins run operations from one dashboard.',
            },
            {
                label: 'What I did',
                body: 'As the sole developer, I built the Laravel REST API and the React 19 SPA from scratch. The backend covers 7 domain tables, 30 endpoints under /api/v1, Sanctum authentication, admin/customer RBAC, and a service layer for availability and booking. The frontend has 14 pages: a 5-step booking wizard for customers and an admin dashboard for bookings, barbers, services, schedules, payments, and reports.',
            },
            {
                label: 'Challenges & solutions',
                body: 'The biggest challenge was preventing two customers from taking the same slot. Booking creation is wrapped in a database transaction, the barber row is locked with lockForUpdate(), and schedule conflicts are re-checked before saving. Overlap is calculated from intersecting time intervals, not just the start hour, so a 45-minute service blocks the 10:30 slot. The same availability rules are used by the frontend and backend, with the Asia/Jakarta timezone and server-side revalidation.',
            },
        ],
        features: [
            'Customer registration, login & profile editing',
            'Service catalog with prices & durations',
            'Real-time slots per barber and date',
            '5-step booking wizard',
            'Booking history & cancellation',
            'Admin dashboard: bookings, barbers, services, schedules',
            'Cash payment checkout',
        ],
    },
    {
        id: '06',
        slug: 'ticket-travel',
        title: 'NusaExplore',
        categoryKey: 'web-app',
        category: 'Web Application',
        year: '2026',
        role: 'Fullstack Developer',
        summary:
            'Travel packages are still booked through DMs and WhatsApp: scattered information, unclear pricing, manual payment proofs, and opaque order status. NusaExplore brings it all into one digital flow, from destination discovery to e-ticket.',
        tech: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS'],
        imageAlt:
            'Screenshot of NusaExplore: the "Exploring Nature\'s Beauty, at Labuan Bajo" hero, featured trips, and mobile views with a map and destination list.',
        imageNote: null,
        github: 'https://github.com/adprjshdq/NusaExplore',
        live: null,
        sections: [
            {
                label: 'Background',
                body: 'Island travel packages are still largely booked through Instagram DMs and WhatsApp: information is scattered, the total price only appears after chatting, transfer receipts are sent manually, and order status is opaque. Meanwhile, admins recap orders in spreadsheets and still need a developer to change landing page content. NusaExplore unifies that process into one digital flow: travelers find a package, see transparent pricing, book, upload payment proof, and receive an e-ticket, while admins verify payments, manage destinations, and edit content from a single dashboard. In short: fewer back-and-forth chats and clear booking status for both travelers and admins.',
            },
            {
                label: 'What I did',
                bullets: [
                    'Designed the user flow, data model (User, Destination, Booking, Wishlist, SiteSetting), and booking statuses.',
                    'Built the API and authentication: JWT in an httpOnly cookie, bcrypt, role guards, and ownership checks.',
                    'Developed the landing page, search/filters, Leaflet map, booking modal, and payment proof upload.',
                    'Built the customer dashboard (orders, wishlist, profile, e-ticket) and admin studio (stats, verification, destination CRUD, CMS, users).',
                    'Handled validation, upload security, responsive layout, empty states, and end-to-end flow QA.',
                ],
            },
            {
                label: 'Challenges & solutions',
                bullets: [
                    'Prices can be manipulated from the client → the server recalculates the price from the database.',
                    'Customers could change status themselves → explicit status transitions plus role and ownership checks.',
                    'Uploads without cloud storage → extension/folder allowlist, size limits, and path sanitization.',
                    'Login in the middle of booking → booking context is preserved after authentication.',
                    'Leaflet errors during SSR → the map component is loaded dynamically without SSR.',
                    'Heavy tables and modals on mobile → card lists and bottom sheets.',
                ],
            },
        ],
        features: [
            'Discovery: search, filters, gallery, and interactive map.',
            'Booking: date/pax selection, automatic total, proof upload, booking code.',
            'Customer: order status, wishlist, profile, and PDF e-ticket.',
            'Admin: payment verification, destination CRUD, landing page CMS, and user management.',
        ],
    },
];
