import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader />}
      </AnimatePresence>

      <Cursor />
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Loader() {
  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] bg-ink-950 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl shadow-sky-500/20"
        >
          <img src="/rlogo.png" alt="Rishabh logo" className="h-full w-full object-contain p-1.5" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-sm text-ink-400 tracking-[0.3em] uppercase"
        >
          Rishabh Jhade
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 180 }}
          transition={{ duration: 1.3, ease: 'easeInOut' }}
          className="h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent mx-auto mt-4"
        />
      </div>
    </motion.div>
  );
}
