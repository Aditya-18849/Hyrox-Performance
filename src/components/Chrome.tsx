import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useT } from '../content';
import { DraftTag, EASE_IN_OUT } from './ui';

/** Short brand curtain that lifts to reveal the hero. Skipped for reduced motion. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const t = useT();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // The hero entrance starts as the curtain begins to lift.
    const id = window.setTimeout(
      () => {
        setShow(false);
        onDone();
      },
      reduce ? 0 : 950,
    );
    return () => window.clearTimeout(id);
  }, [reduce, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduce ? 0.01 : 0.9, ease: EASE_IN_OUT }}
          aria-hidden="true"
        >
          <span className="preloader__name">{t.brand.name}</span>
          <span className="preloader__bar" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Repeating brand statement between sections. */
export function Marquee({ text }: { text: string }) {
  const group = (hidden: boolean) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i}>
          {text} <i aria-hidden="true">/</i>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee">
      <p className="sr-only">{text}</p>
      <div className="marquee__track" aria-hidden="true">
        {group(true)}
        {group(true)}
      </div>
    </div>
  );
}

export type LegalDoc = 'privacy' | 'terms' | null;

export function LegalDialog({ doc, onClose }: { doc: LegalDoc; onClose: () => void }) {
  const t = useT();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (doc && !el.open) el.showModal();
    if (!doc && el.open) el.close();
  }, [doc]);

  const content = doc ? t.legal[doc] : null;
  return (
    <dialog
      ref={ref}
      className="legal"
      aria-labelledby="legal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {content && (
        <div className="legal__inner">
          <button type="button" className="legal__close" onClick={onClose} aria-label={t.a11y.close}>
            ×
          </button>
          <h2 id="legal-title">{content.title}</h2>
          <DraftTag>{t.legal.draft}</DraftTag>
          {content.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </dialog>
  );
}
