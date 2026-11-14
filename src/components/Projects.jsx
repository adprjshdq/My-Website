
export default function Projects() {
    const projects = [
        {
            id: "01",
            title: "Web Sekolah",
            category: "Landing Page",
            description: "Website sekolah sederhana dan interaktif",
            tech: ["Html", "Css", "JavaScript"],
            githubLink: "https://github.com/adprjshdq/website_sekolah_man2.git",
            liveLink: "#",
        },
        {
            id: "02",
            title: "Sistem manajemen cafe berbasis web app",
            category: "Web Application",
            description: "Sistem ini di buat untuk mempermudah pengeloaan menu, kategori, transaksi penjualan, pemesanan, pembayaran, meja, pengguna, serta pemantauan pesanan melalui Kitchen Display Sistem.",
            tech: ["React", "Laravel", "MySQL"],
            githubLink: "https://github.com/adprjshdq/System-Cafe-Management.git",
            liveLink: "#",
        },
        {
            id: "03",
            title: "Personal Portfolio Website",
            category: "Frontend & UI Design",
            description: "Website portofolio interaktif bergaya editorial minimalis untuk menampilkan profil, keahlian teknis, dan rekam jejak proyek pengembangan web.",
            tech: ["React.js", "Tailwind CSS", "Vite"],
            githubLink: "https://github.com/adprjshdq/My-Website.git",
            liveLink: "#",
        },
        {
            id: "04",
            title: "Sistem pemabayran spp sekolah",
            category: "Productivity Tool",
            description: "AAplikasi pembayaran SPP sekolah berbasis Laravel. Admin mengelola tahun ajaran, kelas, tarif, siswa, tagihan, pembayaran, dan laporan. Siswa dapat melihat tunggakan, membayar tagihan secara online melalui Midtrans, serta mengunduh/mencetak kwitansi.",
            tech: ["Laravel", "Tailwind CSS", "MySql"],
            githubLink: "https://github.com/adprjshdq/sistem-pembayaran-spp-sekolah.git",
            liveLink: "#",
        }
    ];

    return (
        <section id="projects" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-neutral-300">
            {/* Header Bagian Projects */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                <div data-reveal>
                    <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
            // 02. SELECTED WORK
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">
                        This Is My <span className='block text-[#bef264] text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2'>Projects.</span>
                    </h2>
                </div>
                <p data-reveal style={{ '--reveal-delay': '100ms' }} className="text-neutral-600 text-sm md:text-base max-w-md font-light">
                    Kumpulan proyek pilihan yang saya bangun selama mendalami pengembangan web full-stack maupun proyek akademik.
                </p>
            </div>

            {/* Grid Kartu Proyek */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        data-reveal
                        style={{ '--reveal-delay': `${index * 90}ms` }}
                        className="group bg-[#eae8e1] hover:bg-neutral-900 text-neutral-900 hover:text-neutral-100 p-6 md:p-8 rounded-2xl border border-neutral-300 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            {/* Nomor Urut & Kategori */}
                            <div className="flex items-center justify-between text-xs font-mono mb-6">
                                <span className="text-neutral-500 group-hover:text-neutral-400">
                                    {project.id} / {project.category}
                                </span>

                                {/* Tombol Link dengan SVG Bawaan */}
                                <div className="flex items-center gap-3">
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Source Code"
                                        className="p-2.5 rounded-full border border-neutral-300 group-hover:border-neutral-700 hover:bg-neutral-200 group-hover:hover:bg-neutral-800 transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    </a>
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Live Demo"
                                        className="p-2.5 rounded-full bg-neutral-900 text-white group-hover:bg-[#bef264] group-hover:text-neutral-900 transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Judul & Deskripsi Proyek */}
                            <h3 className="text-2xl font-bold tracking-tight mb-3">
                                {project.title}
                            </h3>
                            <p className="text-neutral-600 group-hover:text-neutral-300 text-sm font-light leading-relaxed mb-8">
                                {project.description}
                            </p>
                        </div>

                        {/* Badge Tech Stack */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-300/70 group-hover:border-neutral-800">
                            {project.tech.map((item, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#bef264] text-neutral-800 group-hover:bg-neutral-800 group-hover:text-neutral-200 transition"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}