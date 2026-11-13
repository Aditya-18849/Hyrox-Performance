/**
 * Media manifest. Every image/video slot on the site is listed here.
 *
 * To use client media: put optimised files in /public/media (AVIF/WebP, ≤ 2400px
 * wide; MP4/WebM for video, muted, ≤ 10s loop) and set `src` (and optionally
 * `video` + `poster`). Slots without a `src` render an art-directed placeholder —
 * no stock or generated photography is used to stand in for Vid.
 *
 * Current `ig-*` files come from Vid's public @vidparadiz reels: the cover image
 * (.webp, used as still/poster) and the reel video (.mp4, muted loop). Some have
 * burned-in captions. Confirm Vid approves their use before launch.
 */
export type MediaItem = {
  src?: string;
  video?: string;
  poster?: string;
  /** Alt text for the final photograph. */
  alt: string;
  /** Shot brief shown on the placeholder in draft mode. */
  brief: string;
  /** Play only this [start, end] range of the video, in seconds, as a loop. */
  clip?: [number, number];
  /** CSS object-position for the final asset. */
  position?: string;
};

export const media: Record<string, MediaItem> = {
  hero: { src: '/media/ig-08.webp', video: '/media/ig-08.mp4', clip: [0, 5.35], position: '50% 60%', alt: 'Vid Paradiž running beside a field under a blue sky', brief: 'Hero — Vid sprinting or running outdoors. Wide, cinematic; slow-motion video preferred' },
  about: { src: '/media/ig-05.webp', position: '50% 62%', alt: 'Vid standing on a leaf-covered forest road', brief: 'Portrait — Vid in a training environment, 4:5' },

  'pillar.strength': { src: '/media/ig-09.webp', position: '50% 72%', alt: 'Vid training on a ski erg in the gym', brief: 'Gym — heavy barbell lift' },
  'pillar.speed': { src: '/media/ig-08.webp', position: '50% 60%', alt: 'Vid Paradiž running beside a field under a blue sky', brief: 'Track or road — acceleration' },
  'pillar.power': { src: '/media/ig-03.webp', position: '50% 42%', alt: 'Vid mid-air during a single-leg jump in the gym', brief: 'Plyometrics — box jump or bound' },
  'pillar.endurance': { src: '/media/ig-10.webp', position: '50% 78%', alt: 'Vid running towards the camera on a country road', brief: 'Mountain run — long effort' },

  'service.personal': { src: '/media/fr-personal.webp', position: '45% 62%', alt: 'Vid doing single-leg balance work in the gym', brief: 'Vid coaching a client one-to-one' },
  'service.online': { src: '/media/fr-online.webp', position: '25% 55%', alt: 'Vid running on a treadmill', brief: 'Training plan / remote athlete' },
  'service.hybrid': { src: '/media/ig-08.webp', position: '50% 60%', alt: 'Vid Paradiž running beside a field under a blue sky', brief: 'Run + lift in one frame' },
  'service.hyrox': { src: '/media/ig-09.webp', position: '50% 74%', alt: 'Vid training on a ski erg in the gym', brief: 'Sled push, wall balls or ski erg' },
  'service.strength': { src: '/media/ig-02.webp', position: '50% 48%', alt: 'Vid doing hurdle hops in the gym', brief: 'Loaded jump or Olympic lift' },
  'service.running': { src: '/media/ig-10.webp', position: '50% 80%', alt: 'Vid running towards the camera on a country road', brief: 'Intervals — track or road' },
  'service.group': { src: '/media/fr-group.webp', position: '50% 58%', alt: 'Vid doing agility work on the gym floor', brief: 'Group conditioning session' },
  'service.sport': { src: '/media/fr-sport.webp', position: '55% 55%', alt: 'Vid mid-air over a box jump, black and white', brief: 'Football conditioning drill' },

  'perf.running': { src: '/media/ig-08.webp', position: '50% 60%', alt: 'Vid Paradiž running beside a field under a blue sky', brief: 'Running — full stride, side-on' },
  'perf.hyrox': { src: '/media/ig-09.webp', position: '50% 74%', alt: 'Vid training on a ski erg in the gym', brief: 'HYROX — sled or burpee broad jump' },
  'perf.strength': { src: '/media/fr-strength.webp', position: '50% 55%', alt: 'Vid setting up for a barbell deadlift, black and white', brief: 'Strength — squat or deadlift' },
  'perf.power': { src: '/media/ig-03.webp', position: '50% 42%', alt: 'Vid mid-air during a single-leg jump in the gym', brief: 'Power — med-ball throw or clean' },
  'perf.plyometrics': { src: '/media/ig-02.webp', position: '50% 48%', alt: 'Vid doing hurdle hops in the gym', brief: 'Plyometrics — mid-air' },
  'perf.conditioning': { src: '/media/ig-07.webp', position: '50% 72%', alt: 'Vid running through a park, black and white', brief: 'Conditioning — rower, bike or carries' },

  recovery: { src: '/media/fr-recovery.webp', position: '85% 65%', alt: 'Vid walking along a quiet road, black and white', brief: 'Recovery — close-up of hands, treatment table' },

  'gallery.1': { src: '/media/ig-07.webp', position: '50% 70%', alt: 'Vid running through a park, black and white', brief: 'Running session' },
  'gallery.2': { src: '/media/ig-09.webp', position: '50% 74%', alt: 'Vid training on a ski erg in the gym', brief: 'Gym training' },
  'gallery.3': { src: '/media/ig-06.webp', position: '50% 55%', alt: 'Vid walking along a forest road, black and white', brief: 'Mountains' },
  'gallery.4': { src: '/media/ig-02.webp', position: '50% 48%', alt: 'Vid doing hurdle hops in the gym', brief: 'HYROX prep' },
  'gallery.5': { src: '/media/ig-03.webp', position: '50% 45%', alt: 'Vid mid-air during a single-leg jump in the gym', brief: 'Plyometrics' },
  'gallery.6': { src: '/media/ig-10.webp', position: '50% 82%', alt: 'Vid running towards the camera on a country road', brief: 'Daily routine' },
  'gallery.7': { src: '/media/ig-11.webp', position: '50% 72%', alt: 'Vid in training kit', brief: 'Early session' },
};

export const mediaSlots = Object.keys(media);
