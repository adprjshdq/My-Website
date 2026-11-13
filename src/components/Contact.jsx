import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState(""); // Menyimpan status pengiriman

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus("Mengirim pesan...");

        const formData = new FormData(event.target);
        // Masukkan Access Key Web3Forms Anda di sini (dapatkan gratis di https://web3forms.com/)
        formData.append("access_key", "7e2ead95-4f52-4f31-9601-44c1be577467");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus("Pesan berhasil terkirim! Terima kasih telah menghubungi.");
                event.target.reset(); // Mengosongkan form setelah terkirim
            } else {
                setStatus("Gagal mengirim pesan. Silakan coba lagi.");
            }
        } catch {
            setStatus("Terjadi kesalahan jaringan. Periksa koneksi Anda.");
        }
    };

    return (
        <footer id="contact" className="bg-neutral-900 text-neutral-100 pt-16 md:pt-24 pb-12 px-6 md:px-16 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

                {/* Kolom Kiri: Informasi Kontak & Sosial Media */}
                <div data-reveal className="flex flex-col justify-between space-y-10">
                    <div>
                        <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              // 05. GET IN TOUCH
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-3 mb-6">
                            Let's build something amazing <span className='block text-[#bef264] text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-3 mb-6'>together.</span>
                        </h2>
                        <p className="text-neutral-400 text-base font-light max-w-md leading-relaxed">
                            Punya proyek menarik, tawaran kolaborasi, atau ingin berdiskusi seputar pengembangan web? Pintu saya selalu terbuka untuk Anda.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">EMAIL</span>
                            <a
                                href="mailto:shidqiadipraja@gmail.com"
                                className="text-xl md:text-2xl font-semibold hover:text-[#bef264] transition underline underline-offset-4"
                            >
                                shidqiadipraja@gmail.com
                            </a>
                        </div>

                        <div>
                            <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">LOKASI</span>
                            <p className="text-lg font-light text-neutral-300">
                                Tasikmalaya, Jawa Barat, Indonesia
                            </p>
                        </div>

                        {/* Daftar Tautan Sosial Media */}
                        <div className="pt-4 flex flex-wrap gap-6 font-mono text-xs">
                            <a
                                href="https://github.com/adprjshdq/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-[#bef264] transition tracking-wider uppercase"
                            >
                                GitHub ↗
                            </a>
                            <a
                                href="https://www.linkedin.com/in/adiprajashdq/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-[#bef264] transition tracking-wider uppercase"
                            >
                                LinkedIn ↗
                            </a>
                            <a
                                href="https://www.instagram.com/__adprrjj/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-[#bef264] transition tracking-wider uppercase"
                            >
                                Instagram ↗
                            </a>
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan: Form Kirim Pesan */}
                <div data-reveal style={{ '--reveal-delay': '120ms' }} className="bg-neutral-800/50 p-8 rounded-2xl border border-neutral-800">
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Masukkan nama Anda"
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-base md:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#bef264] transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="nama@email.com"
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-base md:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#bef264] transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                                Pesan
                            </label>
                            <textarea
                                name="message"
                                rows="4"
                                required
                                placeholder="Tuliskan pesan atau detail proyek Anda..."
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-base md:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#bef264] transition resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#bef264] text-neutral-900 font-semibold text-xs tracking-wider uppercase py-3.5 rounded-xl hover:bg-[#accb52] transition cursor-pointer"
                        >
                            Kirim Pesan ↗
                        </button>

                        {/* Notifikasi Status Pengiriman */}
                        {status && (
                            <p className="text-xs font-mono text-center text-cyan-400 pt-2">
                                {status}
                            </p>
                        )}
                    </form>
                </div>

            </div>

            {/* Hak Cipta / Copyright Bawah */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
                <p>© {new Date().getFullYear()}. this website is still in development.</p>
                <p>Built with REACT / TAILWIND • Adipraja Shidqi Apriliano</p>
            </div>
        </footer>
    );
}