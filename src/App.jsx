import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeSkills from './components/MarqueeSkills';
import About from './components/About';
import Projects from './components/Projects';
import Expertise from './components/Expertise';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import useScrollReveal from './hooks/useScrollReveal';

function App() {
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  const handleReveal = useCallback(() => setRevealed(true), []);
  const handleComplete = useCallback(() => setLoading(false), []);

  // Cegah halaman di-scroll di balik preloader
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  // Aktifkan animasi saat di-scroll setelah preloader selesai
  useScrollReveal(revealed);

  return (
    <>
      <div
        className={`bg-[#f4f3ef] text-neutral-900 min-h-screen font-sans selection:bg-neutral-900 selection:text-white ${revealed ? '' : 'is-loading'}`}
      >
        <Navbar />
        <Hero />
        <MarqueeSkills />
        <About />
        <Projects />
        <Expertise />
        <Journey />
        <Contact />
      </div>

      {loading && <Preloader onReveal={handleReveal} onComplete={handleComplete} />}
    </>
  );
}

export default App;
