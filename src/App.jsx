import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeSkills from './components/MarqueeSkills';
import About from './components/About';
import Projects from './components/Projects';
import Expertise from './components/Expertise';
import Journey from './components/Journey';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import Assistant from './components/Assistant';
import Preloader from './components/Preloader';
import MouseFollower from './components/MouseFollower';
import useScrollReveal from './hooks/useScrollReveal';

const INTRO_KEY = 'portfolio:intro-shown';

/* Preloader hanya layak ditampilkan sekali per sesi */

function shouldPlayIntro() {
    if (typeof window === 'undefined') return false;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;

    try {
        return window.sessionStorage.getItem(INTRO_KEY) !== '1';
    } catch {
        // Mode privat / storage diblokir: tampilkan intro seperti biasa.
        return true;
    }
}

function App() {
    const [intro] = useState(shouldPlayIntro);
    const [loading, setLoading] = useState(intro);
    const [revealed, setRevealed] = useState(!intro);

    const handleReveal = useCallback(() => setRevealed(true), []);
    const handleComplete = useCallback(() => {
        setLoading(false);

        try {
            window.sessionStorage.setItem(INTRO_KEY, '1');
        } catch {
            // Tidak masalah bila storage tidak tersedia.
        }
    }, []);

    // Cegah halaman di-scroll di balik preloader
    useEffect(() => {
        document.body.style.overflow = loading ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [loading]);

    // animasi saat di-scroll
    useScrollReveal(revealed);

    return (
        <>
            <div
                className={`bg-cream text-neutral-900 min-h-screen font-sans selection:bg-neutral-900 selection:text-white ${revealed ? '' : 'is-loading'}`}
            >
                <Navbar />
                <Hero />
                <MarqueeSkills />
                <About />
                <Projects />
                <Expertise />
                <Journey />
                <Contact />
                <BackToTop />
                <Assistant />
            </div>
            <MouseFollower enabled={!loading} />
            {loading && <Preloader onReveal={handleReveal} onComplete={handleComplete} />}
        </>
    );
}

export default App;
