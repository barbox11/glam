export type ProductCategory =
  | 'labios'
  | 'ojos'
  | 'rostro'
  | 'piel'
  | 'cejias';

export interface ProductTone {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection?: string;
  tagline: string;
  description: string;
  notes?: string;
  ingredients?: string;
  image: string;
  gallery: string[];
  tones?: ProductTone[];
  price?: string;
  featured?: boolean;
  isNew?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export const categories: { id: ProductCategory; label: string }[] = [
  { id: 'labios', label: 'Labios' },
  { id: 'ojos', label: 'Ojos' },
  { id: 'rostro', label: 'Rostro' },
  { id: 'piel', label: 'Piel' },
  { id: 'cejias', label: 'Cejas' },
];

export const products: Product[] = [
  {
    id: 'velvet-kiss',
    slug: 'velvet-kiss',
    name: 'Beso de Terciopelo',
    category: 'labios',
    collection: 'rose-edit',
    tagline: 'El matte que acaricia',
    description:
      'Un líquido mate de textura aterciopelada que se desliza sobre los labios y deja un acabado suave, sin resecar. Color intenso desde la primera capa.',
    notes: 'Aroma sutil a vainilla.',
    ingredients: 'Aceite de jojoba, vitamina E.',
    image: '/hero/labiales.jpg',
    gallery: [
      '/products/velvet-kiss-1.svg',
      '/hero/labiales.jpg',
      '/hero/collection-hero.jpg',
      '/hero/detail-palette.jpg',
      '/hero/flatlay.jpg',
      '/hero/exploded.webp',
    ],
    tones: [
      { name: 'Alma Desnuda', hex: '#C99487' },
      { name: 'Pétalo de Rosa', hex: '#D86A86' },
      { name: 'Ánimo de Baya', hex: '#9A2A4F' },
      { name: 'Susurro de Vino', hex: '#5C1A2E' },
    ],
    price: 'Desde $89.000 COP',
    featured: true,
    isNew: true,
  },
  {
    id: 'lumiere-rose',
    slug: 'lumiere-rose',
    name: 'Luz Rosada',
    category: 'rostro',
    tagline: 'El brillo que se ve natural',
    description:
      'Iluminador cremoso con partículas ultrafinas que reflejan la luz de manera natural. Un brillo saludable, nunca estridente.',
    notes: 'Acabado satinado.',
    image: '/hero/detail-palette.jpg',
    gallery: [
      '/products/lumiere-rose-1.svg',
      '/hero/detail-palette.jpg',
      '/hero/flatlay.jpg',
      '/hero/collection-hero.jpg',
    ],
    tones: [
      { name: 'Champaña', hex: '#E9D7B7' },
      { name: 'Oro Rosado', hex: '#D8A89A' },
      { name: 'Bronce', hex: '#B07A56' },
    ],
    price: 'Desde $120.000 COP',
    featured: true,
  },
  {
    id: 'silk-veil',
    slug: 'silk-veil',
    name: 'Velo de Seda',
    category: 'piel',
    tagline: 'La base invisible',
    description:
      'Base líquida de cobertura modulable con acabado sedoso. Se funde con la piel y deja un cutis luminoso, sin sensación pesada.',
    ingredients: 'Ácido hialurónico, extracto de arroz.',
    image: '/hero/hero-secondary.jpg',
    gallery: [
      '/products/silk-veil-1.svg',
      '/hero/hero-secondary.jpg',
      '/hero/flatlay.jpg',
      '/hero/collection-hero.jpg',
    ],
    tones: [
      { name: 'Porcelana', hex: '#F1D9C3' },
      { name: 'Arena', hex: '#D9B493' },
      { name: 'Miel', hex: '#B98A5F' },
      { name: 'Caramelo', hex: '#8E5A35' },
      { name: 'Cacao', hex: '#5A3621' },
    ],
    price: 'Desde $145.000 COP',
    featured: true,
  },
  {
    id: 'midnight-line',
    slug: 'midnight-line',
    name: 'Línea de Medianoche',
    category: 'ojos',
    collection: 'midnight',
    tagline: 'Línea precisa, mirada profunda',
    description:
      'Delineador líquido con punta de precisión ultrafina. Negro profundo, resistente al agua y de secado rápido.',
    image: '/hero/exploded.webp',
    gallery: [
      '/products/midnight-line-1.svg',
      '/hero/exploded.webp',
      '/hero/collection-hero.jpg',
    ],
    tones: [
      { name: 'Ónix', hex: '#0A0A0A' },
      { name: 'Espresso', hex: '#3A1F14' },
    ],
    price: 'Desde $75.000 COP',
  },
  {
    id: 'rose-petal-powder',
    slug: 'rose-petal-powder',
    name: 'Polvo de Pétalo de Rosa',
    category: 'rostro',
    tagline: 'Rubor en polvo, suspiro en la piel',
    description:
      'Rubor de pigmentación suave que aporta color natural a las mejillas. Textura fina, fácil de difuminar.',
    image: '/hero/flatlay.jpg',
    gallery: [
      '/products/rose-petal-1.svg',
      '/hero/flatlay.jpg',
      '/hero/detail-palette.jpg',
    ],
    tones: [
      { name: 'Rosa Suave', hex: '#EBA9B5' },
      { name: 'Melocotón en Flor', hex: '#E9A585' },
      { name: 'Ciruela', hex: '#A45A7A' },
    ],
    price: 'Desde $95.000 COP',
    isNew: true,
  },
  {
    id: 'mascara-volume-noir',
    slug: 'mascara-volume-noir',
    name: 'Volumen Negro',
    category: 'ojos',
    tagline: 'Pestañas que cuentan una historia',
    description:
      'Máscara de volumen extremo con cepillo de doble cono. Separa, alarga y da intensidad desde la raíz.',
    image: '/hero/collection-hero.jpg',
    gallery: [
      '/products/volume-noir-1.svg',
      '/hero/collection-hero.jpg',
      '/hero/exploded.webp',
    ],
    price: 'Desde $98.000 COP',
  },
  {
    id: 'brow-architecture',
    slug: 'brow-architecture',
    name: 'Arquitectura de Cejas',
    category: 'cejias',
    tagline: 'Cejas definidas, mirada esculpida',
    description:
      'Lápiz de cejas triangular con cera vegetal. Define, rellena y fija sin endurecer.',
    image: '/hero/cejas.jpg',
    gallery: [
      '/hero/cejas.jpg',
      '/products/brow-architecture-1.svg',
      '/hero/hero-secondary.jpg',
      '/hero/editorial-bw.jpg',
    ],
    tones: [
      { name: 'Café Suave', hex: '#7A5340' },
      { name: 'Taupe', hex: '#8E6F5C' },
      { name: 'Ébano', hex: '#3A2418' },
    ],
    price: 'Desde $68.000 COP',
  },
];

export const collections: Collection[] = [
  {
    id: 'rose-edit',
    slug: 'rose-edit',
    name: 'Edición Rosa',
    description:
      'Una colección íntima inspirada en los matices del rosa: desde el pétalo más suave hasta el berry más profundo.',
    image: '/products/collection-rose.svg',
  },
  {
    id: 'midnight',
    slug: 'midnight',
    name: 'Medianoche',
    description: 'La noche como musa. Tonos profundos, líneas afiladas, miradas con carácter.',
    image: '/products/collection-midnight.svg',
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id || p.slug === id);

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  products.filter((p) => p.category === category);

export const getProductsByCollection = (collectionSlug: string): Product[] =>
  products.filter((p) => p.collection === collectionSlug);

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  const sameCategory = products.filter((p) => p.id !== product.id && p.category === product.category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  // fallback: completar con misma colección o random
  const sameCollection = product.collection
    ? products.filter((p) => p.id !== product.id && p.collection === product.collection && p.category !== product.category)
    : [];
  const combined = [...sameCategory, ...sameCollection];
  if (combined.length >= limit) return combined.slice(0, limit);
  const rest = products.filter((p) => p.id !== product.id && !combined.some((c) => c.id === p.id));
  return [...combined, ...rest].slice(0, limit);
};