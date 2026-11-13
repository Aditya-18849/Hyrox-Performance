import { useRef, type ElementType, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { site } from '../config/site';

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

/** Pulls its child slightly towards the pointer. Mouse only; springs back on leave. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span ref={ref} className="magnetic" style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  magnetic?: boolean;
  external?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Btn({ href, children, variant = 'primary', magnetic = false, external = false, onClick, className = '' }: BtnProps) {
  const link = (
    <a
      className={`btn btn--${variant} ${className}`}
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <Arrow />
    </a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

type LinesProps = {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  delay?: number;
  /** When provided, the reveal is driven by this flag instead of scroll position. */
  show?: boolean;
  id?: string;
};

/** Headline that reveals line by line from behind a mask. */
export function Lines({ lines, as: Tag = 'h2', className = '', delay = 0, show, id }: LinesProps) {
  const controlled = show !== undefined;
  return (
    <Tag className={className} id={id}>
      <motion.span
        className="lines"
        initial="hidden"
        {...(controlled ? { animate: show ? 'show' : 'hidden' } : { whileInView: 'show', viewport: { once: true, amount: 0.5 } })}
        transition={{ staggerChildren: 0.1, delayChildren: delay }}
      >
        {lines.map((line, i) => (
          <span className="line" key={i}>
            <motion.span
              className="line__inner"
              variants={{ hidden: { y: '108%' }, show: { y: '0%', transition: { duration: 1, ease: EASE } } }}
            >
              {/[.?]$/.test(line) ? (
                <>
                  {line.slice(0, -1)}
                  <span className="accent">{line.slice(-1)}</span>
                </>
              ) : (
                line
              )}
            </motion.span>{' '}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function FadeUp({ children, delay = 0, className = '', as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'p' }) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="label">
      <span className="label__index">{index}</span>
      <span className="label__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/** Marker for content that still needs client verification. Rendered in draft mode only. */
export function DraftTag({ children }: { children: ReactNode }) {
  if (!site.draft) return null;
  return <span className="draft-tag">{children}</span>;
}
