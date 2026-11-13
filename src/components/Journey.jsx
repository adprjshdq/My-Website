
export default function Journey() {
    // Daftar riwayat pendidikan atau pengalaman Anda
    const milestones = [
        {
            period: "2024 - Sekarang",
            role: "Teknik Informatika",
            organization: "Universitas Perjuangan Tasikmalaya",
            description: "Mendalami rekayasa perangkat lunak, struktur data, dan fokus mengeksplorasi pengembangan web full-stack (React.js, Laravel, Tailwind CSS).",
        },
        {
            period: "2021 - 2024",
            role: "Sekolah Menengah Atas",
            organization: "MAN 2 Kota Tasikmalaya",
            description: "Menyelesaikan pendidikan menengah atas serta mulai menumbuhkan minat awal di bidang teknologi informasi, logika pemrograman, dan komputer.",
        },
        {
            period: "2018 - 2021",
            role: "Sekolah Menengah Pertama",
            organization: "SMPN 9 Tasikmalaya",
            description: "Membangun fondasi akademik dasar, kemampuan pemecahan masalah, serta aktif berpartisipasi dalam kegiatan pengembangan diri di sekolah.",
        },
        {
            period: "2012 - 2018",
            role: "Sekolah Dasar",
            organization: "SDN 1 Cieunteung",
            description: "Menempuh pendidikan dasar dan mulai mengenal penggunaan komputer serta teknologi digital untuk pertama kalinya.",
        },
    ];

    return (
        <section id="journey" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-neutral-300">
            {/* Header Journey */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                <div data-reveal>
                    <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
            // 04. TIMELINE & EXPERIENCE
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mt-2">
                        My Journey.
                    </h2>
                </div>
                <p data-reveal style={{ '--reveal-delay': '100ms' }} className="text-neutral-600 text-sm md:text-base max-w-md font-light">
                    Rekam jejak pendidikan dan proses pembelajaran saya di dunia teknologi dan pengembangan web.
                </p>
            </div>

            {/* Daftar Timeline */}
            <div className="space-y-8">
                {milestones.map((item, index) => (
                    <div
                        key={index}
                        data-reveal
                        style={{ '--reveal-delay': `${index * 90}ms` }}
                        className="bg-[#eae8e1] p-6 md:p-8 rounded-2xl border border-neutral-300 grid grid-cols-1 md:grid-cols-4 gap-6 items-start hover:border-neutral-900 transition"
                    >
                        {/* Periode Waktu */}
                        <div className="font-mono text-xs text-neutral-500 md:col-span-1">
                            <span className="bg-neutral-200 px-3 py-1 rounded-full border border-neutral-300">
                                {item.period}
                            </span>
                        </div>

                        {/* Detail Peran & Organisasi */}
                        <div className="md:col-span-3 space-y-2">
                            <h3 className="text-xl font-bold tracking-tight">
                                {item.role} <span className="font-light text-neutral-500">@ {item.organization}</span>
                            </h3>
                            <p className="text-neutral-600 text-sm font-light leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}