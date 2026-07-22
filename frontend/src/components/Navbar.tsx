import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '@/data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as HTMLElement[];
      const cur = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= 120 && r.bottom >= 120;
      });
      if (cur) setActive(`#${cur.id}`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-2xl shadow-black/40' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group" aria-label="Rishabh home">
            <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black shadow-lg shadow-sky-500/20 ring-1 ring-white/10 group-hover:ring-sky-400/60 transition">
              <img src="/rlogo.png" alt="Rishabh logo" className="h-full w-full object-contain p-1" />
            </span>
            <span className="font-display font-semibold text-base sm:text-lg tracking-tight text-white">
              Rishabh<span className="text-sky-400">.</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    active === link.href ? 'text-white' : 'text-ink-300 hover:text-white'
                  }`}
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/8 border border-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-brand-400 hover:bg-brand-300 text-ink-950 font-semibold text-sm px-5 py-2.5 transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-400/40"
            >
              Get a Quote
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl glass-light text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        <motion.div
          style={{ scaleX: progress }}
          className="h-0.5 origin-left bg-gradient-to-r from-brand-400 via-brand-300 to-accent-400"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-ink-900 border-l border-white/10 p-6 pt-24"
            >
              <ul className="space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 px-4 rounded-xl text-lg font-medium text-ink-200 hover:bg-white/5 hover:text-white transition"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-brand-400 text-ink-950 font-semibold py-3"
              >
                Get a Quote <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
