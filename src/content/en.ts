/**
 * English copy. All visible text lives here so a Slovenian version only needs
 * a sibling `sl.ts` exporting the same shape (see src/content/index.tsx).
 */
export const en = {
  brand: {
    name: 'Vid Paradiž',
    descriptor: 'Sports Performance',
    core: 'Helping athletes become stronger & faster.',
  },

  a11y: { skip: 'Skip to content', openMenu: 'Open menu', closeMenu: 'Close menu', close: 'Close' },

  nav: {
    links: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'coaching', label: 'Coaching' },
      { id: 'performance', label: 'Performance' },
      { id: 'recovery', label: 'Recovery' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: 'Start training',
  },

  hero: {
    headline: ['Built to', 'Perform.'],
    sub: 'Helping athletes become stronger, faster, and more capable.',
    roles: ['Hybrid Athlete', 'Performance Coach', 'Slovenia'],
    primary: 'Start your journey',
    secondary: 'Explore coaching',
    scroll: 'Scroll',
  },

  about: {
    label: 'The athlete',
    heading: ['More than', 'just training.'],
    role: 'Hybrid Athlete & Performance Coach',
    body: [
      'Performance is built through consistency, intelligent training, and the willingness to push beyond your limits.',
      'I combine running, strength, power, and conditioning to help athletes develop the physical capabilities required to perform at their best.',
    ],
    disciplines: ['Running', 'Strength', 'Power', 'Conditioning'],
    instagram: 'Follow on Instagram',
  },

  philosophy: {
    label: 'Training philosophy',
    heading: ['Train with purpose.', 'Perform with intent.'],
    pillars: [
      { id: 'strength', title: 'Strength', text: 'Develop foundational strength and improve your ability to generate force.' },
      { id: 'speed', title: 'Speed', text: 'Improve running performance, acceleration, and movement efficiency.' },
      { id: 'power', title: 'Power', text: 'Develop explosiveness through appropriate plyometric and athletic movement training.' },
      { id: 'endurance', title: 'Endurance', text: 'Build conditioning and the ability to sustain performance under fatigue.' },
    ],
  },

  services: {
    label: 'Coaching',
    heading: ['Coaching built', 'around the athlete.'],
    intro: 'Eight ways to work together. Every enquiry starts with a conversation about where you are and where you want to go.',
    learnMore: 'Learn more',
    close: 'Close',
    focus: 'Focus',
    inquire: 'Enquire about',
    items: [
      { id: 'personal', title: 'Personal Training', text: 'Individualized one-to-one coaching focused on strength, conditioning, fitness, and athletic development.', focus: ['One-to-one', 'Strength', 'Conditioning', 'Athletic development'] },
      { id: 'online', title: 'Online Coaching', text: 'Remote training guidance and structured coaching for athletes who want to improve wherever they train.', focus: ['Remote', 'Structured training', 'Guidance'] },
      { id: 'hybrid', title: 'Hybrid Athlete Training', text: 'Combining running, strength, endurance, and conditioning to develop a more complete athlete.', focus: ['Running', 'Strength', 'Endurance', 'Conditioning'] },
      { id: 'hyrox', title: 'HYROX Preparation', text: 'Functional fitness preparation involving running, strength, and conditioning.', focus: ['Running', 'Functional strength', 'Conditioning'] },
      { id: 'strength', title: 'Strength & Power', text: 'Build strength, explosiveness, plyometric ability, and athletic movement quality.', focus: ['Strength', 'Explosiveness', 'Plyometrics', 'Movement quality'] },
      { id: 'running', title: 'Running & Conditioning', text: 'Develop endurance, speed, and conditioning.', focus: ['Endurance', 'Speed', 'Conditioning'] },
      { id: 'group', title: 'Group Training', text: 'Structured group fitness and athletic conditioning sessions.', focus: ['Group sessions', 'Fitness', 'Conditioning'] },
      { id: 'sport', title: 'Sports-Specific Conditioning', text: 'Training focused on athletic development and sport-specific physical preparation, including football conditioning.', focus: ['Athletic development', 'Physical preparation', 'Football'] },
    ],
  },

  performance: {
    label: 'Performance',
    heading: ['Every dimension', 'of the work.'],
    hint: 'Keep scrolling',
    swipeHint: 'Swipe',
    items: [
      { id: 'running', title: 'Running', text: 'Speed, efficiency, and the capacity to cover ground.' },
      { id: 'hyrox', title: 'HYROX', text: 'Running and functional work, back to back, under fatigue.' },
      { id: 'strength', title: 'Strength', text: 'Force production built on sound fundamentals.' },
      { id: 'power', title: 'Power', text: 'Strength, expressed fast.' },
      { id: 'plyometrics', title: 'Plyometrics', text: 'Jumps, bounds, and landings for reactive movement.' },
      { id: 'conditioning', title: 'Conditioning', text: 'Holding your output when the session gets hard.' },
    ],
  },

  recovery: {
    label: 'Recovery & sports massage',
    heading: ['Performance doesn’t end', 'when training stops.'],
    body: 'Recovery is an important part of maintaining training consistency and supporting athletic performance.',
    listLabel: 'Offerings',
    items: [
      'Classic Massage',
      'Sports Massage',
      'Trigger-Point Therapy',
      'Kinesiology Taping',
      'Vacuum Therapy',
      'Electrotherapy',
      'Normatec Recovery Boots',
    ],
    cta: 'Ask about recovery',
    interest: 'Recovery & sports massage',
    draftNote: 'Draft — availability, qualifications and scope of each service to be confirmed by Vid before publication.',
  },

  gallery: {
    label: 'Athlete lifestyle',
    heading: ['The work behind', 'the performance.'],
    captions: ['Running', 'Gym', 'Outdoors', 'Plyometrics', 'Power', 'Road miles', 'Daily routine'],
    cta: 'Follow the journey on Instagram',
    view: 'View',
  },

  process: {
    label: 'How it works',
    heading: ['Four steps', 'to the start line.'],
    steps: [
      { title: 'Connect', text: 'Get in touch and explain your goals.' },
      { title: 'Assess', text: 'Discuss your current training level, experience, and objectives.' },
      { title: 'Plan', text: 'Determine an appropriate coaching approach.' },
      { title: 'Perform', text: 'Begin your training journey and work towards your goals.' },
    ],
  },

  results: {
    label: 'Client results',
    heading: ['Real work.', 'Real progress.'],
    intro: 'Client stories, progress and milestones will be published here once they are verified and shared with permission.',
    placeholderTag: 'Placeholder',
    placeholders: [
      { kind: 'Testimonial', note: 'Awaiting a verified client quote and written permission to publish.' },
      { kind: 'Training progress', note: 'Awaiting verified performance data supplied by Vid and the client.' },
      { kind: 'Athletic milestone', note: 'Awaiting a confirmed result, client photograph and permission.' },
    ],
    /** Verified testimonials go here: { quote, name, context }. Never add unverified entries. */
    testimonials: [] as { quote: string; name: string; context: string }[],
  },

  contact: {
    label: 'Contact',
    heading: ['Ready to elevate', 'your performance?'],
    body: 'Whether you’re looking to build strength, improve your running, prepare for HYROX, or become a more complete athlete, let’s start working towards your goals.',
    primary: 'Start your journey',
    secondary: 'Contact Vid',
    channels: { instagram: 'Instagram', email: 'Email', phone: 'Phone' },
    pending: 'Pending verification',
    form: {
      title: 'Training enquiry',
      name: 'Full name',
      email: 'Email',
      goals: 'Training goals',
      goalsHint: 'e.g. first HYROX, faster 10K, build strength',
      interest: 'Coaching interest',
      interestPlaceholder: 'Select an option',
      interestOther: 'Not sure yet',
      message: 'Message',
      submit: 'Send enquiry',
      sending: 'Sending…',
      errors: {
        name: 'Please enter your full name.',
        email: 'Please enter a valid email address.',
        goals: 'Tell us briefly what you want to achieve.',
        interest: 'Please choose a coaching interest.',
        message: 'Please add a short message (at least 10 characters).',
        summary: 'Please correct the highlighted fields.',
      },
      success: 'Thank you — your enquiry has been sent. Vid will be in touch.',
      failure: 'Something went wrong and your enquiry was not sent. Please try again or use one of the direct channels.',
      mailto: 'Your email app should now open with your enquiry ready to send. If nothing happens, please email directly.',
      mailtoNote: 'Sending opens your email app with the enquiry pre-filled.',
      subject: 'Training enquiry',
    },
  },

  footer: {
    links: { instagram: 'Instagram', contact: 'Contact', coaching: 'Coaching', recovery: 'Recovery', privacy: 'Privacy Policy', terms: 'Terms and Conditions' },
    explore: 'Explore',
    legalTitle: 'Legal',
    business: 'Registered business',
    address: 'Registered address',
    registration: 'Registration no.',
    rights: 'All rights reserved.',
    top: 'Back to top',
  },

  legal: {
    draft: 'Draft text — to be reviewed and approved before launch.',
    privacy: {
      title: 'Privacy Policy',
      body: [
        'This website is operated by the registered business named in the footer.',
        'When you send an enquiry, the details you enter (name, email address, training goals, coaching interest and message) are used only to respond to your enquiry. They are not sold or shared for marketing.',
        'This website does not use advertising or tracking cookies.',
        'To ask what information is held about you, or to have it corrected or deleted, use the contact details on this page.',
      ],
    },
    terms: {
      title: 'Terms and Conditions',
      body: [
        'The content on this website is general information about coaching and recovery services. It is not medical advice.',
        'Coaching and recovery services are agreed individually. Scope, scheduling and fees are confirmed directly with Vid before any work begins.',
        'Consult a qualified health professional before starting a new training programme if you have a medical condition or injury.',
        'All text, photography and video on this website belong to their respective owners and may not be reused without permission.',
      ],
    },
  },
};

export type Content = typeof en;
