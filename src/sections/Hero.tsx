import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useT } from '../content';
import { Media } from '../components/Media';
import { Btn, EASE, Lines } from '../components/ui';

export function Hero({ ready }: { ready: boolean }) {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section id="home" data-nav="home" className="hero" ref={ref} aria-labelledby="hero-title">
      <motion.div className="hero__media" style={reduce ? undefined : { y: mediaY }}>
        <motion.div
          className="hero__media-zoom"
          initial={{ scale: 1.14, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : { scale: 1.14, opacity: 0 }}
          transition={{ duration: 2, ease: EASE }}
        >
          <Media slot="hero" reveal={false} priority />
        </motion.div>
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />

      <motion.div className="hero__content" style={reduce ? undefined : { y: textY, opacity: fade }}>
        <motion.p className="hero__brand" {...enter(0.1)}>
          <strong>{t.brand.name}</strong>
          <span>{t.brand.descriptor}</span>
        </motion.p>

        <Lines as="h1" id="hero-title" className="hero__title display" lines={t.hero.headline} show={ready} delay={0.15} />

        <div className="hero__side">
          <motion.p className="hero__sub" {...enter(0.55)}>
            {t.hero.sub}
          </motion.p>
          <motion.div className="hero__ctas" {...enter(0.7)}>
            <Btn href="#contact-form" magnetic>
              {t.hero.primary}
            </Btn>
            <Btn href="#coaching" variant="ghost">
              {t.hero.secondary}
            </Btn>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="hero__foot" {...enter(0.9)}>
        <ul className="hero__roles">
          {t.hero.roles.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <a className="hero__scroll" href="#about">
          <span>{t.hero.scroll}</span>
          <i aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}
