import { memo, useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { media, mediaSlots } from '../content/media';
import { site } from '../config/site';
import { EASE_IN_OUT } from './ui';

/** Topographic contour lines — the brand's placeholder texture (mountains, terrain, effort). */
const Contours = memo(function Contours({ seed }: { seed: number }) {
  const paths = useMemo(() => {
    const cx = 200 + Math.sin(seed * 2.1) * 90;
    const cy = 200 + Math.cos(seed * 1.3) * 80;
    const out: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const r = 10 + i * 24;
      let d = '';
      for (let s = 0; s <= 72; s++) {
        const a = (s / 72) * Math.PI * 2;
        const k =
          1 +
          0.1 * Math.sin(3 * a + seed * 1.7 + i * 0.22) +
          0.06 * Math.sin(5 * a + seed * 0.9 - i * 0.35) +
          0.04 * Math.sin(2 * a + seed);
        d += `${s ? 'L' : 'M'}${(cx + Math.cos(a) * r * k).toFixed(1)} ${(cy + Math.sin(a) * r * k * 0.82).toFixed(1)}`;
      }
      out.push(d + 'Z');
    }
    return out;
  }, [seed]);

  return (
    <svg className="ph__contours" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
});

type Props = {
  slot: string;
  className?: string;
  /** Scroll-linked vertical drift of the image inside its frame. */
  parallax?: boolean;
  /** Wipe the frame open when it enters the viewport. */
  reveal?: boolean;
  /** Above-the-fold media: load eagerly. */
  priority?: boolean;
  sizes?: string;
};

export function Media({ slot, className = '', parallax = false, reveal = true, priority = false, sizes = '100vw' }: Props) {
  const item = media[slot];
  const index = mediaSlots.indexOf(slot) + 1;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const drift = parallax && !reduce;
  const wipe = reveal && !reduce;
  const inView = useInView(ref, { once: true, amount: 0.15 });

  // Videos play only while on screen, and never for visitors who prefer reduced motion
  // (they see the poster frame instead).
  const videoRef = useRef<HTMLVideoElement>(null);
  const visible = useInView(ref, { amount: 0.1 });
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible && !reduce) {
      v.muted = true;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [visible, reduce]);

  // Optional `clip: [start, end]` — loop only that part of the file, checked every
  // frame so nothing past `end` is ever shown.
  const clipStart = item.clip?.[0];
  const clipEnd = item.clip?.[1];
  useEffect(() => {
    const v = videoRef.current;
    if (!v || clipStart === undefined || clipEnd === undefined || !visible || reduce) return;
    let raf = 0;
    const tick = () => {
      if (v.currentTime >= clipEnd || v.currentTime < clipStart) v.currentTime = clipStart;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, reduce, clipStart, clipEnd]);

  let content;
  if (item.video) {
    content = (
      <video
        className="media__asset"
        src={item.video}
        ref={videoRef}
        poster={item.poster ?? item.src}
        muted
        loop
        playsInline
        disablePictureInPicture
        // Nothing is fetched until the frame scrolls into view (see effect above).
        preload={priority ? 'auto' : 'none'}
        aria-label={item.alt}
        style={{ objectPosition: item.position }}
      />
    );
  } else if (item.src) {
    content = (
      <img
        className="media__asset"
        src={item.src}
        alt={item.alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        // Slow "Ken Burns" drift; timing and direction vary per slot so photos never move in sync.
        style={
          {
            objectPosition: item.position,
            '--kb-dur': `${14 + (index % 5) * 2.5}s`,
            '--kb-delay': `${-(index % 7) * 2}s`,
            '--kb-x': `${index % 2 ? -1.8 : 1.8}%`,
            '--kb-y': `${index % 3 ? -1.4 : 1.4}%`,
            animationDirection: index % 2 ? 'alternate' : 'alternate-reverse',
          } as CSSProperties
        }
      />
    );
  } else {
    content = (
      <div className="ph" role="img" aria-label={`${item.alt} (photograph to be supplied)`}>
        <Contours seed={index} />
        {site.draft && (
          <>
            <span className="ph__slot">Media slot {String(index).padStart(2, '0')}</span>
            <span className="ph__brief">{item.brief}</span>
          </>
        )}
        <i className="ph__mark ph__mark--tl" />
        <i className="ph__mark ph__mark--tr" />
        <i className="ph__mark ph__mark--bl" />
        <i className="ph__mark ph__mark--br" />
      </div>
    );
  }

  return (
    // The frame itself is observed (a clipped element never reports as "in view"),
    // and the wipe is applied one level down.
    <div ref={ref} className={`media ${className}`}>
      <motion.div
        className="media__clip"
        initial={wipe ? { clipPath: 'inset(0% 0% 100% 0%)' } : false}
        animate={wipe ? { clipPath: inView ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' } : undefined}
        transition={{ duration: 1.2, ease: EASE_IN_OUT }}
      >
        <motion.div className="media__inner" style={drift ? { y, scale: 1.16 } : undefined}>
          {content}
        </motion.div>
      </motion.div>
    </div>
  );
}
