import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useT } from '../content';
import { site } from '../config/site';
import { Arrow, EASE, Magnetic } from './ui';

/** Tracks which `[data-nav]` section crosses the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.nav ?? '');
      },
      { rootMargin: '-45% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Nav() {
  const t = useT();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__bar">
        <a className="nav__logo" href="#home" aria-label={`${t.brand.name} — ${t.brand.descriptor}`} onClick={() => setOpen(false)}>
          {t.brand.name}
        </a>

        <nav className="nav__links" aria-label="Primary">
          {t.nav.links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <Magnetic strength={0.2}>
            <a className="nav__cta" href="#contact-form">
              {t.nav.cta} <Arrow />
            </a>
          </Magnetic>
          <button
            className="nav__burger"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="menu__links" aria-label="Mobile">
              {t.nav.links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  className={active === l.id ? 'is-active' : ''}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: EASE }}
                >
                  <span className="menu__idx">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="menu__foot">
              <a className="btn btn--primary" href="#contact-form" onClick={() => setOpen(false)}>
                <span>{t.nav.cta}</span>
                <Arrow />
              </a>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                {site.instagram.handle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
