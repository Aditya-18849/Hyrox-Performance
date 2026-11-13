import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useT } from '../content';
import { useInquiry } from '../hooks/inquiry';
import { Media } from '../components/Media';
import { Btn, EASE, FadeUp, Lines, SectionLabel } from '../components/ui';

export function Services() {
  const t = useT();
  const { setInterest } = useInquiry();
  const [open, setOpen] = useState<string | null>(t.services.items[0].id);

  return (
    <section id="coaching" data-nav="coaching" className="section services" aria-labelledby="services-title">
      <header className="section__head section__head--split">
        <div>
          <SectionLabel index="03">{t.services.label}</SectionLabel>
          <Lines id="services-title" className="h2 display" lines={t.services.heading} />
        </div>
        <FadeUp>
          <p className="body section__intro">{t.services.intro}</p>
        </FadeUp>
      </header>

      <ul className="svc-list">
        {t.services.items.map((s, i) => {
          const isOpen = open === s.id;
          return (
            <li key={s.id} className={`svc ${isOpen ? 'is-open' : ''}`}>
              <h3 className="svc__head">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`svc-${s.id}`}
                  id={`svc-btn-${s.id}`}
                  onClick={() => setOpen(isOpen ? null : s.id)}
                >
                  <span className="svc__idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="svc__title display">{s.title}</span>
                  <span className="svc__toggle">
                    <span>{isOpen ? t.services.close : t.services.learnMore}</span>
                    <i aria-hidden="true" />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`svc-${s.id}`}
                    role="region"
                    aria-labelledby={`svc-btn-${s.id}`}
                    className="svc__panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <div className="svc__body">
                      <div className="svc__media">
                        <Media slot={`service.${s.id}`} sizes="(min-width: 900px) 50vw, 100vw" />
                      </div>
                      <div className="svc__copy">
                        <p className="lead">{s.text}</p>
                        <div className="svc__focus">
                          <span className="eyebrow">{t.services.focus}</span>
                          <ul>
                            {s.focus.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        </div>
                        <Btn href="#contact-form" onClick={() => setInterest(s.title)}>
                          {t.services.inquire} {s.title}
                        </Btn>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
