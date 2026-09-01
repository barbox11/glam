import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.SITE_URL || 'https://glam-3in.pages.dev';

// Import sin TS - leemos el archivo y parseamos manualmente o importamos via jiti
// Simplificado: definimos rutas base y productos hardcode pero leídos del source
import { readFileSync } from 'node:fs';
const productsFile = readFileSync(join(__dirname, '../src/data/products.ts'), 'utf-8');

// Extrae solo productos del array `products` (evita categorías/colecciones)
const productsBlock = productsFile.slice(productsFile.indexOf('export const products'), productsFile.indexOf('export const collections'));
const productIds = [...productsBlock.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]).filter((id,i,arr) => arr.indexOf(id)===i);
const collectionsBlock = productsFile.slice(productsFile.indexOf('export const collections'));
const collectionSlugs = [...collectionsBlock.matchAll(/slug:\s*'([^']+)'/g)].map(m=>m[1]);

const urls = [
  { loc: `${SITE_URL}/`, priority: '1.0' },
  { loc: `${SITE_URL}/catalogo`, priority: '0.9' },
  { loc: `${SITE_URL}/colecciones`, priority: '0.8' },
  ...collectionSlugs.map(s => ({ loc: `${SITE_URL}/colecciones/${s}`, priority: '0.7' })),
  { loc: `${SITE_URL}/nosotros`, priority: '0.6' },
  { loc: `${SITE_URL}/contacto`, priority: '0.6' },
  ...productIds.map(id => ({ loc: `${SITE_URL}/producto/${id}`, priority: '0.7' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;

writeFileSync(join(__dirname, '../public/sitemap.xml'), xml);
console.log(`sitemap.xml generado con ${urls.length} URLs`);
