import { Reveal } from '@/components/Reveal';
import { PROCESS, FAQS } from '@/data/content';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function Process() {
  return (
    <section id="process" className="relative py-20 sm:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-brand-400 tracking-widest uppercase mb-3">05 — How we work</p>
          <h2 className="font-display text-[2.35rem] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-3xl">
            A process built for{' '}
            <span className="text-gradient">momentum</span>, not meetings.
          </h2>
        </Reveal>

        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1}>
              <div className="group relative rounded-2xl glass-light border border-white/8 p-5 sm:p-6 h-full hover:border-brand-400/30 transition-all">
                <span className="font-display text-5xl font-bold text-white/10 group-hover:text-brand-400/30 transition-colors">
                  {p.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-400 leading-relaxed">{p.desc}</p>
                {i < PROCESS.length - 1 && (
                  <span className="hidden lg:block absolute top-9 -right-3 text-white/15 text-2xl">→</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 sm:mt-24 grid gap-8 lg:gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-sm text-brand-400 tracking-widest uppercase mb-3">FAQ</p>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                Common questions, <span className="text-gradient-light">answered straight.</span>
              </h3>
              <p className="mt-4 text-ink-400 leading-relaxed">
                Still curious about something? The contact form below goes straight to my inbox.
              </p>
            </div>
          </Reveal>

          <div className="min-w-0 space-y-3 lg:col-span-7">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06} className="min-w-0">
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-w-0 rounded-2xl glass-light border border-white/8 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-4 sm:p-5 text-left sm:items-center"
      >
        <span className="min-w-0 flex-1 font-medium text-white text-base leading-snug">{q}</span>
        <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-brand-400">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
              <p className="max-w-3xl text-ink-300 leading-relaxed text-sm sm:text-base whitespace-normal">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
