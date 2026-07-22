import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { useGsapParallax } from '@/hooks/useGsap';
import { useCountUp } from '@/hooks/useCountUp';
import { STATS, SERVICES } from '@/data/content';
import { Quote } from 'lucide-react';

export default function About() {
  const bgRef = useGsapParallax(0.12);

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div ref={bgRef} className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-brand-500/10 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-brand-400 tracking-widest uppercase mb-3">01 — About</p>
          <h2 className="font-display text-[2.35rem] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-3xl">
            Engineer by craft.{' '}
            <span className="text-gradient-light">Designer by instinct.</span>
          </h2>
        </Reveal>

        <div className="mt-10 sm:mt-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* portrait + quote */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="/rishabh.jpg"
                  alt="Rishabh Jhade working"
                  className="w-full h-[22rem] sm:h-[28rem] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-5">
                  <Quote className="h-5 w-5 text-brand-400 mb-2" />
                  <p className="text-sm text-ink-100 leading-relaxed">
                    "Software is poetry that runs. I write each line with the reader — and the
                    user — in mind."
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* bio + stats + services */}
          <div className="lg:col-span-7 space-y-10">
            <Reveal delay={0.1}>
              <div className="space-y-5 text-base sm:text-lg text-ink-300 leading-relaxed">
                <p>
                  For nearly a decade I've sat at the intersection of engineering and design —
                  shipping products that feel as good as they perform. From real-time analytics
                  platforms to award-winning marketing sites, my work is bound by one principle:
                  <span className="text-white"> respect the user's time and attention.</span>
                </p>
                <p>
                  I lead with empathy, communicate in plain language, and treat code like a
                  long-term relationship — not a one-night stand. Whether I'm the first engineer
                  or plugging into a team of forty, I optimize for trust, momentum, and outcomes
                  you can measure.
                </p>
              </div>
            </Reveal>

            {/* stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.08}>
                  <StatCard {...s} />
                </Reveal>
              ))}
            </div>


          </div>
        </div>

        {/* services */}
        <div className="mt-16 pt-4">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-white mb-5">
              What I do
            </h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((srv, i) => (
              <Reveal key={srv.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group h-full rounded-2xl glass-light p-5 hover:bg-white/6 transition-all border border-white/8 hover:border-brand-400/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-400/10 text-brand-400 group-hover:bg-brand-400 group-hover:text-ink-950 transition-all">
                      <srv.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white leading-snug">{srv.title}</h4>
                      <p className="text-sm text-ink-400 mt-1 leading-relaxed">{srv.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, suffix, label, sub }: { value: number; suffix: string; label: string; sub: string }) {
  const { value: v, ref } = useCountUp(value);
  return (
    <div className="rounded-2xl glass-light p-4 sm:p-5 border border-white/8">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="font-display text-3xl sm:text-4xl font-bold text-white">
        {v}
        <span className="text-brand-400">{suffix}</span>
      </div>
      <div className="mt-1.5 text-sm font-medium text-ink-200">{label}</div>
      <div className="text-xs text-ink-500 mt-0.5">{sub}</div>
    </div>
  );
}
