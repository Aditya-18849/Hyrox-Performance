import { useState } from 'react';
import { useT } from '../content';
import { site } from '../config/site';
import { Media } from '../components/Media';
import { Arrow, FadeUp, Lines, SectionLabel } from '../components/ui';

export function About() {
  const t = useT();
  return (
    <section id="about" data-nav="about" className="section about" aria-labelledby="about-title">
      <div className="about__media">
        <Media slot="about" parallax sizes="(min-width: 900px) 45vw, 100vw" />
        <span className="about__num display" aria-hidden="true">
          01
        </span>
      </div>

      <div className="about__text">
        <SectionLabel index="01">{t.about.label}</SectionLabel>
        <Lines id="about-title" className="h2 display" lines={t.about.heading} />
        <FadeUp>
          <p className="about__role">{t.about.role}</p>
        </FadeUp>
        {t.about.body.map((p, i) => (
          <FadeUp key={i} delay={0.08 * (i + 1)}>
            <p className={i === 0 ? 'lead' : 'body'}>{p}</p>
          </FadeUp>
        ))}
        <FadeUp delay={0.25}>
          <ul className="about__disciplines">
            {t.about.disciplines.map((d, i) => (
              <li key={d}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {d}
              </li>
            ))}
          </ul>
          <a className="text-link" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
            {t.about.instagram} <b>{site.instagram.handle}</b> <Arrow />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

export function Philosophy() {
  const t = useT();
  const [active, setActive] = useState(0);
  return (
    <section data-nav="about" className="section philosophy" aria-labelledby="philosophy-title">
      <header className="section__head">
        <SectionLabel index="02">{t.philosophy.label}</SectionLabel>
        <Lines id="philosophy-title" className="h2 display" lines={t.philosophy.heading} />
      </header>

      <ol className="pillars">
        {t.philosophy.pillars.map((p, i) => (
          <li
            key={p.id}
            className={`pillar ${active === i ? 'is-active' : ''}`}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            tabIndex={0}
          >
            <div className="pillar__media">
              <Media slot={`pillar.${p.id}`} sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
            <span className="pillar__num display" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="pillar__body">
              <h3 className="display">{p.title}</h3>
              <div className="pillar__reveal">
                <p>{p.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
