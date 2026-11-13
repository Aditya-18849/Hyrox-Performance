/**
 * Site configuration — business facts, contact channels and integrations.
 * Everything here must be verified with the client before launch.
 * Translatable copy lives in src/content/, not here.
 */
const env = import.meta.env;

export const site = {
  /** Draft mode shows media-slot labels, "pending verification" tags and placeholder testimonials. */
  draft: env.VITE_DRAFT !== 'false',

  instagram: {
    handle: '@vidparadiz',
    url: 'https://www.instagram.com/vidparadiz/',
  },

  email: { address: 'vid.paradiz@gmail.com', verified: false },
  phone: { display: '041 588 872', tel: '+38641588872', verified: false },

  legal: {
    businessName: 'Masaže in osebno trenerstvo, Vid Paradiž s.p.',
    address: 'Pod gonjami 42, 2391 Prevalje, Slovenia',
    registrationNumber: '9769099000',
    verified: false,
  },

  /** Recovery services: availability, qualifications and scope still to be confirmed by Vid. */
  recoveryConfirmed: false,

  form: {
    /** JSON form endpoint (Formspree, Web3Forms, own API…). Empty → mailto fallback. */
    endpoint: ((env.VITE_FORM_ENDPOINT as string | undefined) ?? '').trim(),
    accessKey: ((env.VITE_FORM_ACCESS_KEY as string | undefined) ?? '').trim(),
  },
} as const;
