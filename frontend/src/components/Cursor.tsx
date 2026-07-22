import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, restDelta: 0.1 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, restDelta: 0.1 });
  const ringX = useSpring(x, { stiffness: 120, damping: 18, restDelta: 0.1 });
  const ringY = useSpring(y, { stiffness: 120, damping: 18, restDelta: 0.1 });
  const [hover, setHover] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      const interactive = !!target.closest('a, button, input, textarea, [data-cursor]');
      if (interactive !== hover) {
        setHover(interactive);
        if (ringRef.current) {
          ringRef.current.style.transform = interactive ? 'scale(2.2)' : 'scale(1)';
          ringRef.current.style.borderColor = interactive ? 'rgba(52,211,153,0.8)' : 'rgba(255,255,255,0.25)';
        }
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y, hover]);

  return (
    <>
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-brand-400" />
      </motion.div>
      <motion.div
        ref={ringRef}
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:block h-9 w-9 rounded-full border border-white/25 -translate-x-1/2 -translate-y-1/2 transition-[transform,border-color] duration-200 ease-out"
      />
    </>
  );
}
