import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Building2, MessagesSquare, Sparkles } from 'lucide-react';
import { TECH, type TechKey } from '@/data/techIcons';

gsap.registerPlugin(ScrollTrigger);

const ORBIT_TECH: TechKey[] = ['React', 'Node', 'TypeScript', 'Tailwind', 'Docker', 'AWS', 'Nextjs', 'PostgreSQL'];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-line]', {
        yPercent: 120,
        opacity: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power4.out',
        delay: 0.2,
      });
      gsap.from('[data-hero-fade]', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.9,
      });
      gsap.to('[data-hero-orbit]', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to('[data-hero-cta]', {
        y: -40,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: '40% top', scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // parallax for floating badges
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      if (orbitRef.current) {
        gsap.to('[data-parallax]', {
          x: (i: number) => x * (8 + i * 6),
          y: (i: number) => y * (8 + i * 6),
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.02,
        });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={root} id="home" className="relative min-h-svh flex items-center overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16">
      {/* backdrop */}
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-60" />
      <div className="absolute top-1/3 -left-40 h-[34rem] w-[34rem] rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -right-40 h-[30rem] w-[30rem] rounded-full bg-accent-500/10 blur-[120px]" />
      <div className="absolute inset-0 noise pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* left */}
        <div className="lg:col-span-7">
         

          <h1 className="font-display font-bold tracking-tight text-[clamp(2.6rem,15vw,4.5rem)] sm:text-7xl lg:text-[5.5rem] leading-[0.98] sm:leading-[0.95] text-white">
            {['Building digital', 'products with', 'soul &'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-gradient">
                precision.
              </span>
            </span>
          </h1>

         <p data-hero-fade className="mt-6 sm:mt-7 max-w-xl text-base sm:text-lg text-ink-300 leading-relaxed">
  I'm <span className="text-white font-medium">Rishabh Jhade</span> — a Full Stack Web Developer
  passionate about building scalable web applications with React, Next.js, Node.js, and AI
  integrations. I create modern, high-performance digital experiences for startups and businesses.
</p>

          {/* CTAs */}
          <div data-hero-cta className="mt-8 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-400 hover:bg-brand-300 text-ink-950 font-semibold px-6 py-3.5 shadow-xl shadow-brand-500/25 transition-all hover:shadow-brand-400/40 hover:-translate-y-0.5"
            >
              <MessagesSquare className="h-4.5 w-4.5" />
              Get a Quote
            </a>
            <a
              href="https://www.dreamerssoftcon.com"
              className="group inline-flex items-center justify-center gap-2 rounded-full glass-light hover:bg-white/10 text-white font-semibold px-6 py-3.5 transition-all hover:-translate-y-0.5"
            >
              <Building2 className="h-4.5 w-4.5 text-brand-300" />
              Visit Companies
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="/Rishabh-FSD-resume-v01.pdf"
              download
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 hover:border-brand-400/60 text-white font-semibold px-6 py-3.5 transition-all hover:-translate-y-0.5"
            >
              <Download className="h-4.5 w-4.5" />
              Resume
            </a>
          </div>

          {/* quick stats */}
          <div data-hero-fade className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
            {[
              { n: '1+', l: 'Years' },
              { n: '5+', l: 'Projects' },
              { n: '5+', l: 'Clients' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-ink-400 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right — orbit visual */}
        <div className="lg:col-span-5 hidden lg:block" ref={orbitRef}>
          <div className="relative h-[28rem] w-[28rem] mx-auto" data-hero-orbit>
            {/* rings */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-10 rounded-full border border-white/8" />
            <div className="absolute inset-20 rounded-full border border-white/6" />
            {/* center portrait */}
            <div className="absolute inset-0 m-auto h-44 w-44 rounded-full overflow-hidden ring-4 ring-brand-400/30 shadow-2xl shadow-brand-500/30">
              <img
                src="https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Rishabh Jhade"
                className="h-full w-full object-cover"
              />
            </div>
            {/* orbiting tech icons */}
            <div className="absolute inset-0 animate-spin-slow">
              {ORBIT_TECH.map((key, i) => {
                const positions = [
                  'top-0 left-1/2 -translate-x-1/2',
                  'top-[15%] right-0',
                  'bottom-[15%] right-0',
                  'bottom-0 left-1/2 -translate-x-1/2',
                  'bottom-[15%] left-0',
                  'top-[15%] left-0',
                  'top-[42%] right-[-4%]',
                  'top-[42%] left-[-4%]',
                ];
                const Icon = TECH[key];
                return (
                  <div key={key} className={`absolute ${positions[i]}`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl glass border border-white/10 shadow-lg backdrop-blur-md group/icon hover:border-brand-400/50 transition-colors">
                      <Icon className="h-6 w-6 text-ink-100 group-hover/icon:text-brand-400 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* floating cards */}
          <motion.div
            data-parallax
            className="absolute -top-4 right-2 glass rounded-2xl px-4 py-3 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-accent-400" />
              <span className="text-white font-medium">Awwwards SOTD</span>
            </div>
          </motion.div>
          <motion.div
            data-parallax
            className="absolute bottom-2 -left-2 glass rounded-2xl px-4 py-3 shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className="text-2xl font-display font-bold text-white">99<span className="text-brand-400">%</span></div>
            <div className="text-[11px] text-ink-400 uppercase tracking-wide">Lighthouse</div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.25em] text-ink-400">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/20">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-brand-400"
            animate={{ y: [4, 16, 4], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </section>
  );
}

