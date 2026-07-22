import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { TESTIMONIALS } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-tst-card]', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const track = marqueeRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: 'none',
      });
    }, track);
    return () => ctx.revert();
  }, []);

  const go = (dir: number) => {
    setActive((a) => (a + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section ref={root} id="testimonials" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-brand-500/8 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
          <Reveal>
            <div>
              <p className="font-mono text-sm text-brand-400 tracking-widest uppercase mb-3">04 — Voices</p>
              <h2 className="font-display text-[2.35rem] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-2xl">
                Trusted by founders &{' '}
                <span className="text-gradient-light">teams who ship.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                ))}
              </div>
              <span className="text-sm text-ink-300">
                <span className="text-white font-semibold">5.0</span> from 4 reviews
              </span>
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => go(-1)}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full glass-light hover:bg-white/10 flex items-center justify-center text-white transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full glass-light hover:bg-white/10 flex items-center justify-center text-white transition"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* featured testimonial */}
        <Reveal>
          <div data-tst-card className="rounded-3xl glass border border-white/10 p-5 sm:p-8 lg:p-12 mb-10 sm:mb-12 relative overflow-hidden">
            <Quote className="absolute top-6 right-6 h-16 w-16 sm:h-24 sm:w-24 text-white/5" />
            <div className="relative max-w-3xl">
              <p className="font-display text-xl sm:text-2xl lg:text-3xl text-white leading-snug font-medium">
                "{TESTIMONIALS[active].quote}"
              </p>
              <div className="mt-7 flex items-center gap-4 min-w-0">
                <img
                  src={TESTIMONIALS[active].avatar}
                  alt={TESTIMONIALS[active].name}
                  className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full object-cover ring-2 ring-brand-400/30"
                />
                <div>
                  <div className="font-semibold text-white">{TESTIMONIALS[active].name}</div>
                  <div className="text-sm text-brand-400">{TESTIMONIALS[active].role}</div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-1.5">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? 'w-8 bg-brand-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
          </div>
        </Reveal>

        {/* marquee of mini cards */}
        <div className="relative overflow-hidden mask-fade-x">
          <div ref={marqueeRef} className="flex gap-4 w-max">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={i}
                className="shrink-0 w-[17rem] sm:w-72 rounded-2xl glass-light border border-white/8 p-5"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-3 w-3 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-sm text-ink-200 leading-relaxed line-clamp-3">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-ink-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
