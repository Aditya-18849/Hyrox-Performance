import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useT } from '../content';
import { site } from '../config/site';
import { useInquiry } from '../hooks/inquiry';
import { Media } from '../components/Media';
import { Arrow, Btn, DraftTag, FadeUp, Lines, SectionLabel } from '../components/ui';

export function Recovery() {
  const t = useT();
  const { setInterest } = useInquiry();
  return (
    <section id="recovery" data-nav="recovery" className="section recovery" aria-labelledby="recovery-title">
      <div className="recovery__intro">
        <SectionLabel index="05">{t.recovery.label}</SectionLabel>
        <Lines id="recovery-title" className="h2 h2--calm" lines={t.recovery.heading} />
        <FadeUp>
          <p className="lead">{t.recovery.body}</p>
          {!site.recoveryConfirmed && <DraftTag>{t.recovery.draftNote}</DraftTag>}
        </FadeUp>
        <div className="recovery__media">
          <Media slot="recovery" parallax sizes="(min-width: 900px) 40vw, 100vw" />
        </div>
      </div>

      <div className="recovery__list">
        <p className="eyebrow">{t.recovery.listLabel}</p>
        <ol>
          {t.recovery.items.map((item, i) => (
            <FadeUp as="li" key={item} delay={i * 0.05}>
              <span className="recovery__idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="recovery__name">{item}</span>
            </FadeUp>
          ))}
        </ol>
        <FadeUp>
          <Btn href="#contact-form" variant="ghost" onClick={() => setInterest(t.recovery.interest)}>
            {t.recovery.cta}
          </Btn>
        </FadeUp>
      </div>
    </section>
  );
}

const TILE_CLASSES = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7'];

export function Gallery() {
  const t = useT();
  return (
    <section data-nav="" className="section gallery" aria-labelledby="gallery-title">
      <header className="section__head section__head--split">
        <div>
          <SectionLabel index="06">{t.gallery.label}</SectionLabel>
          <Lines id="gallery-title" className="h2 display" lines={t.gallery.heading} />
        </div>
        <FadeUp>
          <a className="text-link" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
            <b>{site.instagram.handle}</b> <Arrow />
          </a>
        </FadeUp>
      </header>

      <ul className="gallery__grid">
        {t.gallery.captions.map((caption, i) => (
          <li key={caption} className={TILE_CLASSES[i]}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor={t.gallery.view}
              aria-label={`${caption} — ${site.instagram.handle} on Instagram`}
            >
              <Media slot={`gallery.${i + 1}`} sizes="(min-width: 900px) 40vw, 100vw" />
              <span className="gallery__cap">
                <span>{String(i + 1).padStart(2, '0')}</span>
                {caption}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="gallery__cta">
        <Btn href={site.instagram.url} external magnetic>
          {t.gallery.cta}
        </Btn>
      </div>
    </section>
  );
}

export function Process() {
  const t = useT();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const p = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section data-nav="" className="section process" aria-labelledby="process-title">
      <header className="section__head">
        <SectionLabel index="07">{t.process.label}</SectionLabel>
        <Lines id="process-title" className="h2 display" lines={t.process.heading} />
      </header>

      <motion.ol ref={ref} className="timeline" style={{ '--p': p } as never}>
        {t.process.steps.map((s, i) => (
          <FadeUp as="li" key={s.title} delay={i * 0.1} className="timeline__step">
            <span className="timeline__dot" aria-hidden="true" />
            <span className="timeline__num display">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="display">{s.title}</h3>
            <p>{s.text}</p>
          </FadeUp>
        ))}
      </motion.ol>
    </section>
  );
}

export function Results() {
  const t = useT();
  const verified = t.results.testimonials;
  // Nothing verified yet: show clearly-marked placeholders in draft mode, nothing in production.
  if (verified.length === 0 && !site.draft) return null;

  return (
    <section data-nav="" className="section results" aria-labelledby="results-title">
      <header className="section__head section__head--split">
        <div>
          <SectionLabel index="08">{t.results.label}</SectionLabel>
          <Lines id="results-title" className="h2 display" lines={t.results.heading} />
        </div>
        {verified.length === 0 && (
          <FadeUp>
            <p className="body section__intro">{t.results.intro}</p>
          </FadeUp>
        )}
      </header>

      {verified.length > 0 ? (
        <ul className="results__grid">
          {verified.map((v, i) => (
            <FadeUp as="li" key={i} delay={i * 0.08} className="quote">
              <blockquote>
                <p>“{v.quote}”</p>
                <footer>
                  <strong>{v.name}</strong>
                  <span>{v.context}</span>
                </footer>
              </blockquote>
            </FadeUp>
          ))}
        </ul>
      ) : (
        <ul className="results__grid">
          {t.results.placeholders.map((ph, i) => (
            <FadeUp as="li" key={ph.kind} delay={i * 0.08} className="quote quote--placeholder">
              <span className="draft-tag">{t.results.placeholderTag}</span>
              <h3 className="display">{ph.kind}</h3>
              <div className="quote__lines" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <p>{ph.note}</p>
            </FadeUp>
          ))}
        </ul>
      )}
    </section>
  );
}
