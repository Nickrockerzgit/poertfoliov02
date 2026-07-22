import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
};

/**
 * Reveal children matching the selector when the container enters the viewport.
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  selector: string,
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    opacity = 0,
    duration = 0.9,
    stagger = 0.12,
    start = 'top 85%',
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.set(targets, { y, opacity });
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          once,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [selector, y, opacity, duration, stagger, start, once]);

  return ref;
}

/**
 * Parallax — moves the element on the Y axis relative to scroll progress.
 */
export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Pin + scrub a horizontal strip of children through the viewport.
 */
export function useGsapHorizontalPin<T extends HTMLElement = HTMLDivElement>(
  panelSelector: string
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const track = section.querySelector('[data-horizontal-track]') as HTMLElement | null;
    const panels = section.querySelectorAll(panelSelector);
    if (!track || !panels.length) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [panelSelector]);

  return ref;
}
