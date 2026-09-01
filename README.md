# GLAM — Premium Beauty Catalog

GLAM es un **catálogo digital premium de maquillaje**. No una tienda. No hay carrito, ni pagos, ni registro.

Las visitantes descubren los productos, se interesan y consultan directamente por **WhatsApp**.

## Stack

- Vue 3 (Composition API + `<script setup lang="ts">`)
- TypeScript estricto
- Vite
- Vue Router 4
- Tailwind CSS (tokens custom: rosa + blanco cálido)
- GSAP + ScrollTrigger (animaciones cinematográficas)
- Lenis (smooth scroll)
- Vitest + Vue Test Utils (tests unitarios)
- Playwright (E2E desktop + mobile)
- ESLint + Prettier

## Estructura

```
src/
  config/glam.config.ts       # WhatsApp, marca, redes (centralizado)
  utils/whatsapp.ts           # generateWhatsAppLink(product)
  data/products.ts            # productos + colecciones (preparado para CMS)
  composables/                # useLenis, useScrollPosition, useReveal
  components/
    layout/                   # AppHeader, AppFooter, FloatingWhatsApp
    product/ProductCard.vue
    icons/                    # WhatsAppIcon, InstagramIcon, TikTokIcon, ArrowRight
  views/
    HomeView.vue              # Hero cinematográfico + featured + CTA WhatsApp
    CatalogView.vue           # Búsqueda + filtros + grid editorial
    ProductView.vue           # Galería, tonos, CTA WhatsApp
    CollectionsView.vue
    CollectionDetailView.vue
    AboutView.vue
    ContactView.vue
    NotFoundView.vue
  styles/main.css             # tokens + componentes Tailwind
  router/index.ts             # /  /catalogo  /producto/:id  /colecciones  /nosotros  /contacto  /404
e2e/glam.spec.ts              # 17 tests × 2 proyectos (desktop + mobile)
```

## Configuración centralizada

Toda referencia al número de WhatsApp vive en `src/config/glam.config.ts`:

```ts
whatsapp: {
  number: '+57 316 432 4637',
  numberRaw: '573164324637',
  defaultMessage: 'Hola GLAM 👋\n\n...',
}
```

`generateWhatsAppLink(product)` en `src/utils/whatsapp.ts` genera el enlace wa.me con el mensaje correcto.

## Comandos

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck    # vue-tsc --noEmit
npm run lint         # ESLint
npm run build        # build producción
npm test             # vitest run
npm run test:e2e     # Playwright (requiere chromium instalado)
```

## Regla principal

GLAM es un **catálogo**, no una tienda. El único CTA hacia conversión es **WhatsApp**.

No existe:

- Carrito / checkout / pagos / pasarela
- Login / registro / cuentas
- Backend / base de datos
- Inventario / envíos
- Favoritos de tienda

Las visitantes descubren → exploran → se interesan → escriben por WhatsApp.