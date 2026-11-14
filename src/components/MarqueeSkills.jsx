
export default function MarqueeSkills() {
    // Daftar keahlian atau teknologi yang ingin ditampilkan
    const skills = [
        "HTML, CSS, JAVASCRIPT",
        "•",
        "REACT.JS",
        "•",
        "TAILWIND CSS",
        "•",
        "NODE.JS",
        "•",
        "LARAVEL",
        "•",
        "MYSQL",
        "•",
    ];

    return (
        <div className="py-6 bg-neutral-900 text-neutral-100 overflow-hidden whitespace-nowrap border-y border-neutral-800">
            {/* pr-8 menutup jarak antar-gilungan agar -33.333% pas satu putaran (tanpa lompatan) */}
            <div className="flex w-max animate-marquee space-x-8 pr-8 text-sm md:text-base font-mono tracking-widest uppercase">
                {/* Kita duplikat array-nya agar efek berjalannya mulus tanpa jeda */}
                {[...skills, ...skills, ...skills].map((skill, index) => (
                    <span key={index} className="inline-block hover:text-[#bef264] transition cursor-default">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}