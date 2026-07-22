import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/data/content';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || !window.matchMedia('(min-width: 1024px)').matches) return;

    const track = section.querySelector('[data-horizontal-track]') as HTMLElement | null;
    if (!track) return;

    const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="relative bg-ink-950 py-20 sm:py-28 lg:py-0">
      <div className="lg:hidden max-w-7xl mx-auto px-5 sm:px-8">
        <ProjectHeading />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          <EndCard />
        </div>
      </div>

      <div className="hidden lg:block h-screen overflow-hidden">
        <div className="absolute top-0 inset-x-0 z-20 pt-20 xl:pt-24 pb-8 px-8 pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <ProjectHeading />
          </div>
        </div>

        <div
          data-horizontal-track
          className="flex h-full items-center pl-8 pr-32 gap-6 will-change-transform"
          style={{ paddingTop: '16rem' }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} desktop />
          ))}
          <EndCard desktop />
        </div>
      </div>
    </section>
  );
}

function ProjectHeading() {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs sm:text-sm text-brand-400 tracking-widest uppercase mb-3">03 - Selected Work</p>
      <h2 className="font-display text-[2.35rem] sm:text-5xl lg:text-[4rem] xl:text-6xl font-bold text-white leading-[1.05]">
        Projects that <span className="text-gradient">moved the needle.</span>
      </h2>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  desktop = false,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  desktop?: boolean;
}) {
  const projectUrl = project.url || '#contact';
  const isExternal = /^https?:\/\//.test(projectUrl);

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-white/10 ${
        desktop ? 'shrink-0 w-[34rem] h-[27rem] xl:h-[30rem]' : 'min-h-[27rem] sm:min-h-[30rem]'
      }`}
    >
      <img
        src={project.image}
        alt={project.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 to-brand-500/0 group-hover:from-brand-500/10 transition-all duration-500" />

      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex flex-wrap items-center gap-2 pr-16">
        <span className="text-xs font-mono text-ink-300 glass-light rounded-full px-3 py-1">
          0{index + 1}
        </span>
        <span className="text-xs font-mono text-brand-300 glass-light rounded-full px-3 py-1">
          {project.year}
        </span>
        <span className="text-xs font-mono text-accent-300 glass-light rounded-full px-3 py-1">
          {project.metric}
        </span>
      </div>

      <a
        href={projectUrl}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
        aria-label={`Open ${project.name}`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-400 text-ink-950 shadow-lg shadow-brand-500/25">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </a>

      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7">
        <p className="text-xs uppercase tracking-wider text-brand-400 mb-1.5">{project.category}</p>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">{project.name}</h3>
        <p className="text-sm text-ink-300 leading-relaxed max-w-md mb-4">{project.blurb}</p>
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-[11px] font-mono text-ink-200 rounded-md bg-white/8 px-2 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function EndCard({ desktop = false }: { desktop?: boolean }) {
  return (
    <div
      className={`rounded-3xl border-gradient p-6 sm:p-8 flex flex-col justify-between ${
        desktop ? 'shrink-0 w-[20rem] h-[27rem] xl:h-[30rem]' : 'min-h-[18rem]'
      }`}
    >
      <div>
        <p className="font-mono text-sm text-brand-400 mb-2">Want to see more?</p>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
          Let's build the next case study together.
        </h3>
      </div>
      <a
        href="#contact"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-400 hover:bg-brand-300 text-ink-950 font-semibold px-5 py-3 transition w-fit"
      >
        Start a project <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}