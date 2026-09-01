export const glamConfig = {
  brand: {
    name: 'GLAM',
    tagline: 'Belleza que se siente',
    description:
      'Catálogo digital premium de maquillaje. Descubre, explora y conecta con nosotras por WhatsApp.',
  },
  whatsapp: {
    number: '+57 316 432 4637',
    numberRaw: '573164324637',
    defaultMessage:
      'Hola, GLAM.\n\nEstoy interesada en conocer más sobre sus productos.\n¿Podrían darme más información?',
  },
  contact: {
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
  },
} as const;

export type GlamConfig = typeof glamConfig;