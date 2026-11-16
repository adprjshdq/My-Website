import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_INPUT = 500;
const MAX_HISTORY = 10;
const REQUEST_TIMEOUT_MS = 30000;

const SUGGESTIONS = [
    'Proyek apa saja yang pernah dibuat?',
    'Teknologi apa yang dikuasai?',
    'Ceritakan proyek Sistem Manajemen Kafe.',
    'Bagaimana cara menghubungi Adipraja?',
];

const FOCUS_RING =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

function prefersReducedMotion() {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Asisten AI portofolio.
 *
 * Panel hanya mengirim riwayat percakapan singkat ke `/api/chat`; API key dan
 * seluruh data mentah tetap di server. Bila asisten belum dikonfigurasi,
 * pengunjung mendapat pesan yang jelas dan diarahkan ke form kontak.
 */
export default function Assistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const [nearFooter, setNearFooter] = useState(false);

    const launcherRef = useRef(null);
    const panelRef = useRef(null);
    const inputRef = useRef(null);
    const endRef = useRef(null);
    const abortRef = useRef(null);

    // Sembunyikan tombol saat form kontak terlihat, sama seperti BackToTop,
    // supaya tidak menutupi input di layar kecil.
    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            const footer = document.getElementById('contact');
            const next = !!footer && footer.getBoundingClientRect().top <= window.innerHeight - 120;

            setNearFooter((current) => (current === next ? current : next));
        };

        const schedule = () => {
            if (frame) return;
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    // Beri tahu BackToTop agar tidak tertimbun panel dan tidak bisa di-Tab.
    useEffect(() => {
        window.dispatchEvent(new CustomEvent('assistant:visibility', { detail: open }));
    }, [open]);

    useEffect(() => {
        if (!open) return undefined;

        const timer = window.setTimeout(() => {
            inputRef.current?.focus({ preventScroll: true });
        }, 80);

        return () => window.clearTimeout(timer);
    }, [open]);

    // Gulir ke pesan terbaru tanpa menggeser halaman di belakangnya.
    useEffect(() => {
        if (!open || (!messages.length && !pending && !error)) return;

        endRef.current?.scrollIntoView({
            block: 'nearest',
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        });
    }, [open, messages, pending, error]);

    // Hentikan permintaan yang masih berjalan saat komponen dilepas.
    useEffect(
        () => () => {
            abortRef.current?.abort();
            abortRef.current = null;
        },
        [],
    );

    const closePanel = useCallback(() => {
        abortRef.current?.abort();
        abortRef.current = null;
        setPending(false);
        setOpen(false);

        window.requestAnimationFrame(() => {
            launcherRef.current?.focus({ preventScroll: true });
        });
    }, []);

    const resetConversation = () => {
        abortRef.current?.abort();
        abortRef.current = null;
        setMessages([]);
        setInput('');
        setError('');
        setPending(false);
    };

    const sendMessage = async (rawText) => {
        const text = rawText.trim();
        if (!text || pending) return;

        const nextMessages = [...messages, { role: 'user', content: text }];

        setMessages(nextMessages);
        setInput('');
        setError('');
        setPending(true);
        inputRef.current?.focus({ preventScroll: true });

        const controller = new AbortController();
        abortRef.current = controller;
        const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: nextMessages.slice(-MAX_HISTORY),
                }),
                signal: controller.signal,
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                if (response.status === 503) {
                    throw new Error('Asisten belum aktif saat ini. Silakan hubungi lewat form kontak atau email.');
                }
                if (response.status === 429) {
                    throw new Error('Terlalu banyak pertanyaan. Tunggu beberapa menit lalu coba lagi.');
                }
                throw new Error(data?.error || 'Asisten sedang bermasalah. Silakan coba lagi.');
            }

            if (!data?.reply) {
                throw new Error('Asisten tidak mengirim jawaban. Silakan coba lagi.');
            }

            setMessages((current) => [...current, { role: 'assistant', content: data.reply }]);
        } catch (caught) {
            // Panel ditutup / percakapan direset: jangan tampilkan error dari
            // permintaan yang memang sengaja dibatalkan.
            const canceled = controller.signal.aborted && abortRef.current !== controller;

            if (!canceled) {
                if (caught.name === 'AbortError') {
                    setError('Waktu tunggu habis. Silakan coba lagi.');
                } else {
                    setError(caught.message || 'Asisten sedang bermasalah. Silakan coba lagi.');
                }
            }
        } finally {
            window.clearTimeout(timer);
            abortRef.current = null;
            setPending(false);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        sendMessage(input);
    };

    const onPanelKeyDown = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            closePanel();
        }
    };

    const launcherHidden = open || nearFooter;

    return (
        <>
            <button
                ref={launcherRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="assistant-panel"
                aria-label="Buka asisten AI portofolio"
                inert={launcherHidden}
                className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-neutral-900 text-cream shadow-lg ring-1 ring-cream/25 transition-all duration-300 hover:bg-lime hover:text-neutral-900 motion-reduce:transition-none sm:w-auto sm:px-4 md:bottom-8 md:right-8 ${FOCUS_RING} ${launcherHidden ? 'pointer-events-none translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
                    }`}
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" />
                    <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
                </svg>
                <span className="hidden font-mono text-[11px] uppercase tracking-widest sm:inline">
                    Tanya AI
                </span>
            </button>

            {open && (
                <section
                    id="assistant-panel"
                    ref={panelRef}
                    role="dialog"
                    aria-labelledby="assistant-title"
                    onKeyDown={onPanelKeyDown}
                    className="fixed bottom-4 right-4 z-50 flex h-[min(78dvh,620px)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-cream shadow-[0_24px_60px_-20px_rgba(20,20,20,0.45)] sm:right-6 md:bottom-8 md:right-8"
                >
                    <div className="flex items-start justify-between gap-3 bg-neutral-900 px-4 py-3.5 text-neutral-100">
                        <div className="min-w-0">
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">
                                // AI Assistant
                            </p>
                            <h2 id="assistant-title" className="mt-0.5 text-sm font-semibold tracking-tight">
                                Tanya seputar portofolio
                            </h2>
                            <p className="mt-0.5 text-[11px] text-neutral-400">
                                Dijawab dari isi situs ini
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5">
                            {messages.length > 0 && (
                                <button
                                    type="button"
                                    onClick={resetConversation}
                                    className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-400 transition hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                                >
                                    Baru
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={closePanel}
                                aria-label="Tutup asisten"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-800 hover:text-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                            >
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div
                        role="log"
                        aria-live="polite"
                        aria-relevant="additions text"
                        aria-busy={pending}
                        className="flex-1 space-y-3 overflow-y-auto bg-cream px-4 py-4"
                    >
                        {messages.length === 0 && (
                            <div className="space-y-3">
                                <p className="text-sm leading-relaxed text-neutral-700">
                                    Halo! Saya asisten AI di portofolio ini. Saya bisa menjelaskan
                                    proyek, keahlian, pendidikan, dan cara menghubungi Adipraja.
                                </p>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                                    Coba tanya
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {SUGGESTIONS.map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            onClick={() => sendMessage(suggestion)}
                                            disabled={pending}
                                            className="rounded-full border border-neutral-300 bg-sand px-3 py-1.5 text-left text-xs leading-snug text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {messages.map((message, index) => {
                            const isUser = message.role === 'user';

                            return (
                                <div
                                    key={`${message.role}-${index}`}
                                    className={isUser ? 'flex justify-end' : 'flex justify-start'}
                                >
                                    <p
                                        className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${isUser
                                            ? 'rounded-br-md bg-neutral-900 text-cream'
                                            : 'rounded-bl-md border border-neutral-300 bg-white text-neutral-800'
                                            }`}
                                    >
                                        {!isUser && <span className="sr-only">Asisten: </span>}
                                        {message.content}
                                    </p>
                                </div>
                            );
                        })}

                        {pending && (
                            <div className="flex justify-start">
                                <span className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-neutral-300 bg-white px-3.5 py-2.5">
                                    <span className="sr-only">Asisten sedang mengetik…</span>
                                    {[0, 1, 2].map((dot) => (
                                        <span
                                            key={dot}
                                            aria-hidden="true"
                                            className="h-1.5 w-1.5 rounded-full bg-neutral-400 motion-safe:animate-pulse"
                                            style={{ animationDelay: `${dot * 150}ms` }}
                                        />
                                    ))}
                                </span>
                            </div>
                        )}

                        {error && (
                            <p
                                role="alert"
                                className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-800"
                            >
                                {error}
                            </p>
                        )}

                        <div ref={endRef} />
                    </div>

                    <form onSubmit={onSubmit} className="border-t border-neutral-300 bg-sand p-3">
                        <div className="flex items-center gap-2">
                            <label htmlFor="assistant-input" className="sr-only">
                                Pertanyaan untuk asisten
                            </label>
                            <input
                                id="assistant-input"
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                maxLength={MAX_INPUT}
                                autoComplete="off"
                                placeholder="Tulis pertanyaan…"
                                className="min-w-0 flex-1 rounded-xl border border-neutral-300 bg-cream px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-500 transition focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || pending}
                                aria-label="Kirim pertanyaan"
                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-cream transition hover:bg-lime hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sand disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 12h15M13 6l6 6-6 6" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-2 text-[10px] leading-relaxed text-neutral-500">
                            Dijawab AI (Gemini) dari data portofolio dan bisa keliru. Untuk
                            memastikan, gunakan form kontak.
                        </p>
                    </form>
                </section>
            )}
        </>
    );
}
