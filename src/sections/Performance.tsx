import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useT } from '../content';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Media } from '../components/Media';
import { Lines, SectionLabel } from '../components/ui';

/**
 * Desktop: the section pins and vertical scroll drives a horizontal track.
 * Touch / small screens / reduced motion: a native swipeable scroll-snap strip.
 */
export function Performance() {
  const t = useT();
  const pinned = useMediaQuery('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distRef = useRef(0);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    if (!pinned || !trackRef.current) {
      distRef.current = 0;
      setDist(0);
      return;
    }
    const el = trackRef.current;
    const measure = () => {
      const d = Math.max(0, el.scrollWidth - window.innerWidth);
      distRef.current = d;
      setDist(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (v) => -v * distRef.current);
  const total = t.performance.items.length;

  return (
    <section id="performance" data-nav="performance" className={`performance ${pinned ? 'is-pinned' : ''}`} aria-labelledby="performance-title">
      <div ref={wrapRef} className="performance__wrap" style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}>
        <div className="performance__sticky">
          <header className="performance__head">
            <div>
              <SectionLabel index="04">{t.performance.label}</SectionLabel>
              <Lines id="performance-title" className="h2 display" lines={t.performance.heading} />
            </div>
            <p className="performance__hint" aria-hidden="true">
              {pinned ? t.performance.hint : t.performance.swipeHint} <span>→</span>
            </p>
          </header>

          <div className="performance__viewport" tabIndex={pinned ? -1 : 0} role="group" aria-label={t.performance.label}>
            <motion.div ref={trackRef} className="performance__track" style={pinned ? { x } : undefined}>
              {t.performance.items.map((item, i) => (
                <article key={item.id} className="perf">
                  <div className="perf__media">
                    <Media slot={`perf.${item.id}`} reveal={false} sizes="(min-width: 900px) 56vw, 84vw" />
                  </div>
                  <div className="perf__meta">
                    <span className="perf__count">
                      {String(i + 1).padStart(2, '0')}
                      <em> / {String(total).padStart(2, '0')}</em>
                    </span>
                    <h3 className="perf__title display">{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          {pinned && (
            <div className="performance__progress" aria-hidden="true">
              <motion.span style={{ scaleX: scrollYProgress }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
