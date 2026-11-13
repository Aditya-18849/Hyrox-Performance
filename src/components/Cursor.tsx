import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Desktop-only cursor companion. A small dot follows the pointer; over elements
 * marked with `data-cursor="Label"` it grows into a labelled disc. The native
 * cursor stays visible, so nothing depends on this.
 */
export function Cursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as Element | null)?.closest?.('[data-cursor]') as HTMLElement | null;
      setLabel(target?.dataset.cursor ?? '');
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div className="cursor" style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }} aria-hidden="true">
      <motion.span
        className="cursor__disc"
        animate={{ width: label ? 88 : 10, height: label ? 88 : 10 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <span className="cursor__label" style={{ opacity: label ? 1 : 0 }}>
          {label}
        </span>
      </motion.span>
    </motion.div>
  );
}
