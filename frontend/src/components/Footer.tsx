import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart, Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import { NAV_LINKS, SOCIALS } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Instagram,
  Twitter,
};

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-footer-line] span', {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative border-t border-white/10 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-brand-500/10 blur-[120px]" />

      {/* big CTA line */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="overflow-hidden">
          <h2 data-footer-line className="font-display text-[2.75rem] sm:text-7xl lg:text-8xl font-bold text-white leading-[0.98] sm:leading-[0.95] tracking-tight">
            <span className="block">Let's make</span>
            <span className="block text-gradient">something great.</span>
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 grid md:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          {/* brand */}
          <div className="md:col-span-5">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black"><img src="/rlogo.png" alt="Rishabh logo" className="h-full w-full object-contain p-1" /></span><span className="font-display font-semibold text-lg text-white">Rishabh<span className="text-brand-400">.</span></span>
            </a>
            <p className="text-ink-400 max-w-sm leading-relaxed">
              Full Stack Web Developer building responsive, high-performance web applications for startups and businesses.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl glass-light hover:bg-brand-400 hover:text-ink-950 text-ink-300 transition"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* nav */}
          <div className="md:col-span-3">
            <h4 className="font-display font-semibold text-white mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-ink-400 hover:text-brand-400 transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="md:col-span-4">
            <h4 className="font-display font-semibold text-white mb-4">Get in touch</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:rishabhcodz@gmail.com" className="text-ink-400 hover:text-brand-400 transition">
                  rishabhcodz@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="text-ink-400 hover:text-brand-400 transition">
                  +91 6267414545
                </a>
              </li>
              <li className="text-ink-400">Indore, India - IST (UTC+5:30)</li>
            </ul>
            <a
              href="/Rishabh-FSD-resume-v01.pdf"
              download
              className="mt-5 inline-flex items-center gap-2 rounded-full glass-light hover:bg-white/10 text-white text-sm font-medium px-4 py-2 transition"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-ink-500 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
            &copy; {new Date().getFullYear()} Rishabh Jhade. Crafted with
            <Heart className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
            and a lot of coffee.
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white transition"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full glass-light group-hover:bg-brand-400 group-hover:text-ink-950 transition">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}