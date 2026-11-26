import { useState } from 'react';
import { useLang } from '../i18n/useLang.js';

const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
// Access key Web3Forms untuk portofolio ini. Batasi domain pengirim di dashboard Web3Forms.
const ACCESS_KEY = '7e2ead95-4f52-4f31-9601-44c1be577467';

const FIELD_CLASS =
    'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-base md:text-sm text-night-fg placeholder-white/40 transition focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30';

const LINK_CLASS =
    'rounded transition hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-night';

export default function Contact() {
    const { t } = useLang();
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState('idle');

    const onSubmit = async (event) => {
        event.preventDefault();
        if (sending) return;

        const form = event.currentTarget;
        const formData = new FormData(form);
        formData.append('access_key', ACCESS_KEY);
        formData.append('subject', t.contact.formSubject);
        formData.append('from_name', t.contact.formFromName);

        setSending(true);
        setStatus('sending');

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('network');
        } finally {
            setSending(false);
        }
    };

    const statusColor =
        status === 'success'
            ? 'text-accent-text'
            : status === 'error' || status === 'network'
                ? 'text-red-300'
                : 'text-night-muted';

    return (
        <footer id="contact" className="bg-night text-night-fg pt-16 md:pt-24 pb-12 px-6 md:px-16 border-t border-night-line">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

                {/* Kolom Kiri: Informasi Kontak & Sosial Media */}
                <div data-reveal className="flex flex-col justify-between space-y-10">
                    <div>
                        <span className="text-xs font-mono tracking-widest text-night-muted uppercase">
                            {t.contact.kicker}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-3 mb-6">
                            {t.contact.titleLine1} <span className='block text-accent-text text-4xl md:text-5xl font-extrabold uppercase tracking-tight mt-3 mb-6'>{t.contact.titleLine2}</span>
                        </h2>
                        <p className="text-night-muted text-base font-light max-w-md leading-relaxed">
                            {t.contact.intro}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <span className="text-xs font-mono text-night-muted uppercase block mb-1">{t.contact.emailLabel}</span>
                            <a
                                href="mailto:shidqiadipraja@gmail.com"
                                className={`${LINK_CLASS} text-xl md:text-2xl font-semibold underline underline-offset-4`}
                            >
                                shidqiadipraja@gmail.com
                            </a>
                        </div>

                        <div>
                            <span className="text-xs font-mono text-night-muted uppercase block mb-1">{t.contact.locationLabel}</span>
                            <p className="text-lg font-light text-night-muted">
                                {t.contact.locationValue}
                            </p>
                        </div>

                        {/* Daftar Tautan Sosial Media */}
                        <div className="pt-4 flex flex-wrap gap-6 font-mono text-xs">
                            <a
                                href="https://github.com/adprjshdq/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${LINK_CLASS} tracking-wider uppercase`}
                            >
                                GitHub ↗
                            </a>
                            <a
                                href="https://www.linkedin.com/in/adiprajashdq/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${LINK_CLASS} tracking-wider uppercase`}
                            >
                                LinkedIn ↗
                            </a>
                            <a
                                href="https://www.instagram.com/__adprrjj/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${LINK_CLASS} tracking-wider uppercase`}
                            >
                                Instagram ↗
                            </a>
                            <a
                                href="/cv/"
                                className={`${LINK_CLASS} tracking-wider uppercase`}
                            >
                                {t.contact.cvLink}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan: Form Kirim Pesan */}
                <div data-reveal style={{ '--reveal-delay': '120ms' }} className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <form onSubmit={onSubmit} aria-busy={sending} className="space-y-5">
                        <div>
                            <label htmlFor="contact-name" className="block text-xs font-mono text-night-muted uppercase mb-2">
                                {t.contact.nameLabel}
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                required
                                autoComplete="name"
                                placeholder={t.contact.namePlaceholder}
                                className={FIELD_CLASS}
                            />
                        </div>

                        <div>
                            <label htmlFor="contact-email" className="block text-xs font-mono text-night-muted uppercase mb-2">
                                {t.contact.emailFieldLabel}
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
                                placeholder={t.contact.emailPlaceholder}
                                className={FIELD_CLASS}
                            />
                        </div>

                        <div>
                            <label htmlFor="contact-message" className="block text-xs font-mono text-night-muted uppercase mb-2">
                                {t.contact.messageLabel}
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows="4"
                                required
                                placeholder={t.contact.messagePlaceholder}
                                className={`${FIELD_CLASS} resize-none`}
                            ></textarea>
                        </div>

                        {/* Honeypot anti-bot: disembunyikan dari pengguna & pembaca layar */}
                        <input
                            type="checkbox"
                            name="botcheck"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="hidden"
                        />

                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full bg-accent text-accent-ink font-semibold text-xs tracking-wider uppercase py-3.5 rounded-xl transition hover:bg-accent-strong cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {sending ? (
                                t.contact.sending
                            ) : (
                                <>
                                    {t.contact.submit}
                                    <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1.5 inline-block h-3 w-3 -translate-y-px" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </>
                            )}
                        </button>

                        {/* Notifikasi status: area tetap ada agar pembaca layar mengumumkan perubahannya */}
                        <p
                            role="status"
                            aria-live="polite"
                            className={`min-h-5 pt-2 text-center font-mono text-xs ${statusColor}`}
                        >
                            {status === 'idle' ? '' : t.contact.status[status]}
                        </p>
                    </form>
                </div>

            </div>

            {/* Hak Cipta / Copyright Bawah */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-night-line flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-night-muted gap-4">
                <p>{t.contact.copyright(new Date().getFullYear())}</p>
                <p>{t.contact.builtWith}</p>
            </div>
        </footer>
    );
}
