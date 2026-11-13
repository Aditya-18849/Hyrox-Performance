import { useEffect, useState, type FormEvent } from 'react';
import { useT } from '../content';
import { site } from '../config/site';
import { useInquiry } from '../hooks/inquiry';
import { Arrow, Btn, DraftTag, FadeUp, Lines, SectionLabel } from '../components/ui';
import { LegalDialog, type LegalDoc } from '../components/Chrome';

type Values = { name: string; email: string; goals: string; interest: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = 'idle' | 'sending' | 'success' | 'failure' | 'mailto';

const EMPTY: Values = { name: '', email: '', goals: '', interest: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactForm() {
  const t = useT();
  const f = t.contact.form;
  const { interest } = useInquiry();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [trap, setTrap] = useState(''); // honeypot — humans never fill this

  // A service panel's "Enquire" button pre-selects the interest.
  useEffect(() => {
    if (interest) setValues((v) => ({ ...v, interest }));
  }, [interest]);

  const options = [...t.services.items.map((s) => s.title), t.recovery.interest, f.interestOther];

  const validate = (v: Values): Errors => {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = f.errors.name;
    if (!EMAIL_RE.test(v.email.trim())) e.email = f.errors.email;
    if (v.goals.trim().length < 3) e.goals = f.errors.goals;
    if (!v.interest) e.interest = f.errors.interest;
    if (v.message.trim().length < 10) e.message = f.errors.message;
    return e;
  };

  const set = (key: keyof Values) => (ev: { target: { value: string } }) => {
    const next = { ...values, [key]: ev.target.value };
    setValues(next);
    if (errors[key]) setErrors((e) => ({ ...e, [key]: validate(next)[key] }));
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Values)[])[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    if (trap) return;

    const subject = `${f.subject} — ${values.name.trim()}`;

    if (!site.form.endpoint) {
      // No backend configured: hand the enquiry to the visitor's own email app.
      const body = [
        `${f.name}: ${values.name.trim()}`,
        `${f.email}: ${values.email.trim()}`,
        `${f.goals}: ${values.goals.trim()}`,
        `${f.interest}: ${values.interest}`,
        '',
        values.message.trim(),
      ].join('\n');
      window.location.href = `mailto:${site.email.address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(site.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...(site.form.accessKey ? { access_key: site.form.accessKey } : {}),
          subject,
          name: values.name.trim(),
          email: values.email.trim(),
          goals: values.goals.trim(),
          interest: values.interest,
          message: values.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('failure');
    }
  };

  const field = (key: keyof Values) => ({
    id: `f-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `f-${key}-err` : undefined,
  });
  const err = (key: keyof Values) =>
    errors[key] ? (
      <span className="field__error" id={`f-${key}-err`}>
        {errors[key]}
      </span>
    ) : null;

  return (
    <form id="contact-form" className="form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <h3 id="form-title" className="eyebrow">
        {f.title}
      </h3>

      <div className="form__row">
        <div className={`field ${errors.name ? 'has-error' : ''}`}>
          <label htmlFor="f-name">{f.name}</label>
          <input type="text" autoComplete="name" required {...field('name')} />
          {err('name')}
        </div>
        <div className={`field ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="f-email">{f.email}</label>
          <input type="email" autoComplete="email" inputMode="email" required {...field('email')} />
          {err('email')}
        </div>
      </div>

      <div className="form__row">
        <div className={`field ${errors.goals ? 'has-error' : ''}`}>
          <label htmlFor="f-goals">{f.goals}</label>
          <input type="text" placeholder={f.goalsHint} required {...field('goals')} />
          {err('goals')}
        </div>
        <div className={`field ${errors.interest ? 'has-error' : ''}`}>
          <label htmlFor="f-interest">{f.interest}</label>
          <select required {...field('interest')}>
            <option value="" disabled>
              {f.interestPlaceholder}
            </option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {err('interest')}
        </div>
      </div>

      <div className={`field ${errors.message ? 'has-error' : ''}`}>
        <label htmlFor="f-message">{f.message}</label>
        <textarea rows={4} required {...field('message')} />
        {err('message')}
      </div>

      <div className="form__trap" aria-hidden="true">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>

      <div className="form__foot">
        <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
          <span>{status === 'sending' ? f.sending : f.submit}</span>
          <Arrow />
        </button>
        {!site.form.endpoint && status === 'idle' && <p className="form__note">{f.mailtoNote}</p>}
      </div>

      <p className={`form__status form__status--${status}`} role="status" aria-live="polite">
        {Object.keys(errors).some((k) => errors[k as keyof Values]) && f.errors.summary}
        {status === 'success' && f.success}
        {status === 'failure' && f.failure}
        {status === 'mailto' && f.mailto}
      </p>
    </form>
  );
}

export function Contact() {
  const t = useT();
  const c = t.contact;
  return (
    <section id="contact" data-nav="contact" className="section contact" aria-labelledby="contact-title">
      <header className="contact__head">
        <SectionLabel index="09">{c.label}</SectionLabel>
        <Lines id="contact-title" className="h1 display" lines={c.heading} />
      </header>

      <div className="contact__intro">
        <FadeUp>
          <p className="lead">{c.body}</p>
          <div className="contact__ctas">
            <Btn href="#contact-form" magnetic>
              {c.primary}
            </Btn>
            <Btn href={`mailto:${site.email.address}`} variant="ghost">
              {c.secondary}
            </Btn>
          </div>
        </FadeUp>

        <FadeUp>
          <dl className="channels">
            <div>
              <dt>{c.channels.instagram}</dt>
              <dd>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                  {site.instagram.handle}
                </a>
              </dd>
            </div>
            <div>
              <dt>{c.channels.email}</dt>
              <dd>
                <a href={`mailto:${site.email.address}`}>{site.email.address}</a>
                {!site.email.verified && <DraftTag>{c.pending}</DraftTag>}
              </dd>
            </div>
            <div>
              <dt>{c.channels.phone}</dt>
              <dd>
                <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
                {!site.phone.verified && <DraftTag>{c.pending}</DraftTag>}
              </dd>
            </div>
          </dl>
        </FadeUp>
      </div>

      <FadeUp className="contact__form">
        <ContactForm />
      </FadeUp>
    </section>
  );
}

export function Footer() {
  const t = useT();
  const fl = t.footer.links;
  const [doc, setDoc] = useState<LegalDoc>(null);

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <p className="footer__name display">
            {t.brand.name} <span>— {t.brand.descriptor}</span>
          </p>
          <p className="footer__core">{t.brand.core}</p>
        </div>

        <nav aria-label={t.footer.explore}>
          <p className="eyebrow">{t.footer.explore}</p>
          <ul>
            <li>
              <a href="#coaching">{fl.coaching}</a>
            </li>
            <li>
              <a href="#recovery">{fl.recovery}</a>
            </li>
            <li>
              <a href="#contact">{fl.contact}</a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                {fl.instagram}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow">{t.footer.legalTitle}</p>
          <ul>
            <li>
              <button type="button" onClick={() => setDoc('privacy')}>
                {fl.privacy}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setDoc('terms')}>
                {fl.terms}
              </button>
            </li>
          </ul>
        </div>

        <address className="footer__legal">
          <p className="eyebrow">{t.footer.business}</p>
          <p>{site.legal.businessName}</p>
          <p>{site.legal.address}</p>
          <p>
            {t.footer.registration} {site.legal.registrationNumber}
          </p>
          {!site.legal.verified && <DraftTag>{t.contact.pending}</DraftTag>}
        </address>
      </div>

      <p className="footer__wordmark display" aria-hidden="true">
        {t.brand.name}
      </p>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} {t.brand.name}. {t.footer.rights}
        </p>
        <a href="#home">
          {t.footer.top} <span aria-hidden="true">↑</span>
        </a>
      </div>

      <LegalDialog doc={doc} onClose={() => setDoc(null)} />
    </footer>
  );
}
