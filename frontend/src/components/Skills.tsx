import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { SKILL_CATEGORIES } from '@/data/content';
import { TECH, type TechKey } from '@/data/techIcons';


export default function Skills() {
  const [active, setActive] = useState(0);

  const current = SKILL_CATEGORIES[active];

  return (
    <section id="skills" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 mask-fade-b" />
      <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-accent-500/8 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-sm text-brand-400 tracking-widest uppercase mb-3">02 - Skills</p>
          <h2 className="font-display text-[2.35rem] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-3xl">
            A toolkit forged over{' '}
            <span className="text-gradient">1 years</span> of shipping.
          </h2>
        </Reveal>

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* category tabs */}
          <div className="lg:col-span-5 space-y-2.5">
            {SKILL_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = i === active;
              return (
                <Reveal key={cat.title} delay={i * 0.05}>
                  <button
                    onClick={() => setActive(i)}
                    className={`w-full text-left rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
                      isActive
                        ? 'glass border-brand-400/40 shadow-xl shadow-brand-500/10'
                        : 'glass-light border-white/8 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${
                          isActive
                            ? 'bg-brand-400 text-ink-950'
                            : 'bg-white/5 text-ink-300'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-ink-200'}`}>
                          {cat.title}
                        </h3>
                        <p className="text-sm text-ink-400 truncate">{cat.blurb}</p>
                      </div>
                      <motion.span
                        animate={{ rotate: isActive ? 90 : 0 }}
                        className={`text-2xl font-light ${isActive ? 'text-brand-400' : 'text-ink-600'}`}
                      >
                        &rsaquo;
                      </motion.span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* skill panel */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass border border-white/10 p-5 sm:p-9 h-full min-h-[20rem] sm:min-h-[24rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <current.icon className="h-6 w-6 text-brand-400" />
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">{current.title}</h3>
                  </div>

                  <SkillTrain items={current.tech} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skill-train-window {
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        .skill-train-track {
          width: max-content;
          animation: skill-train-move 24s linear infinite;
        }

        .skill-train-window:hover .skill-train-track {
          animation-play-state: paused;
        }

        .skill-train-car::after {
          content: '';
          position: absolute;
          left: 100%;
          top: 50%;
          width: 1.25rem;
          height: 0.25rem;
          transform: translateY(-50%);
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(52,211,153,0.65), rgba(59,130,246,0.75));
          box-shadow: 0 0 18px rgba(59,130,246,0.22);
        }

        .skill-train-wheel {
          position: absolute;
          bottom: -0.55rem;
          height: 0.62rem;
          width: 0.62rem;
          border-radius: 999px;
          border: 2px solid rgba(148,163,184,0.75);
          background: #060a14;
          animation: skill-wheel-spin 0.9s linear infinite;
        }

        @media (min-width: 640px) {
          .skill-train-car::after { width: 2rem; }
        }

        @keyframes skill-train-move {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes skill-wheel-spin {
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}

function SkillTrain({ items }: { items: TechKey[] }) {
  const trainItems = [...items, ...items];

  return (
    <div className="relative pt-8 pb-10">
      <div className="absolute left-0 right-0 bottom-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute left-0 right-0 bottom-[1.15rem] h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />

      <div className="skill-train-window overflow-hidden py-5">
        <div className="skill-train-track flex items-center gap-5 sm:gap-8 pr-5 sm:pr-8">
          {trainItems.map((key, index) => {
            const IconComp = TECH[key];
            const isDuplicate = index >= items.length;

            return (
              <div
                key={`${key}-${index}`}
                aria-hidden={isDuplicate}
                className="skill-train-car group relative flex h-20 w-24 sm:h-24 sm:w-28 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-ink-900/80 shadow-xl shadow-black/30 backdrop-blur transition hover:border-brand-400/40 hover:bg-white/8"
                title={key}
              >
                <span className="absolute -top-2 left-4 right-4 h-2 rounded-t-xl border-x border-t border-white/10 bg-white/5" />
                <IconComp className="h-8 w-8 sm:h-9 sm:w-9 text-ink-100 drop-shadow group-hover:text-brand-400" />
                <span className="mt-2 max-w-[5.75rem] truncate text-center text-xs font-medium text-ink-300">
                  {formatTechName(key)}
                </span>
                <span className="skill-train-wheel left-5" />
                <span className="skill-train-wheel right-5" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function formatTechName(key: TechKey) {
  const labels: Partial<Record<TechKey, string>> = {
    ReactNative: 'React Native',
    Nextjs: 'Next.js',
    Threejs: 'Three.js',
  };

  return labels[key] ?? key;
}

export type { TechKey };