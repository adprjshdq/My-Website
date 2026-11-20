
export default function About() {
    return (
        <section id="about" className="py-16 md:py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-neutral-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

                {/* Kolom Judul Kiri */}
                <div data-reveal>
                    <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
                        // ABOUT ME
                    </span>

                    <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mt-2">
                        <span className="block">
                            Adipraja - Student
                        </span>

                        <span className="block text-lime md:text-4xl font-extrabold uppercase tracking-tight mt-0">
                            Informatics
                        </span>
                    </h2>
                </div>

                {/* Kolom Deskripsi Kanan (2 Kolom di layar besar) */}
                <div className="md:col-span-2 space-y-6 text-neutral-700 text-base md:text-lg font-light leading-relaxed">

                    <p data-reveal style={{ '--reveal-delay': '80ms' }}>
                        Mahasiswa Teknik Informatika Universitas Perjuangan Tasikmalaya yang antusias dalam pengembangan web. Berfokus pada perancangan antarmuka yang bersih dan interaktif, serta memiliki ketertarikan kuat pada rekayasa perangkat lunak end-to-end.
                    </p>

                    <p data-reveal style={{ '--reveal-delay': '160ms' }}>
                        Sebagai mahasiswa Teknik Informatika yang sedang mendalami jalur full-stack, saya aktif mengeksplorasi ekosistem<span className="font-semibold text-neutral-900"></span>. Melalui berbagai proyek akademik maupun mandiri, saya terbiasa merancang aplikasi web dari tahap konsep dasar hingga fungsional.
                    </p>

                    {/* Kartu Info Singkat / Poin Keunggulan */}
                    <div
                        data-reveal
                        style={{ '--reveal-delay': '240ms' }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-300 font-mono text-xs"
                    >

                        <div>
                            <span className="block text-neutral-400">KAMPUS</span>
                            <span className="font-semibold text-neutral-900">Universitas Perjuangan Tasikmalaya</span>
                        </div>

                        <div>
                            <span className="block text-neutral-400">FOKUS</span>
                            <span className="font-semibold text-neutral-900">Fullstack Dev</span>
                        </div>

                        <div>
                            <span className="block text-neutral-400">STATUS</span>
                            <span className="font-semibold text-emerald-600">Active Student</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
