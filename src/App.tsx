import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { LocaleProvider, useT } from './content';
import { InquiryProvider } from './hooks/inquiry';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Marquee, Preloader } from './components/Chrome';
import { Hero } from './sections/Hero';
import { About, Philosophy } from './sections/About';
import { Services } from './sections/Services';
import { Performance } from './sections/Performance';
import { Gallery, Process, Recovery, Results } from './sections/Recovery';
import { Contact, Footer } from './sections/Contact';

function Page() {
  const t = useT();
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <a className="skip" href="#main">
        {t.a11y.skip}
      </a>
      <Preloader onDone={onDone} />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Marquee text={t.brand.core} />
        <About />
        <Philosophy />
        <Services />
        <Performance />
        <Recovery />
        <Gallery />
        <Process />
        <Results />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LocaleProvider>
        <InquiryProvider>
          <Page />
        </InquiryProvider>
      </LocaleProvider>
    </MotionConfig>
  );
}
