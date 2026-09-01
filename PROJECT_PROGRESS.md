# PROJECT PROGRESS — GLAM

> Catálogo digital premium de maquillaje. NO tienda.
> Conversión = WhatsApp `+57 316 432 4637`.

---

## ✅ COMPLETADO

### Identidad visual
- Paleta rosa + blanco cálido (`#FAF7F5` base, `#E84B8A` acento, `#0F0F12` texto)
- Tipografía editorial: **Cormorant Garamond** + Inter
- Logo cliente integrado en header, footer y favicon
- Favicon SVG custom con la marca

### Sistema de diseño
- Tokens Tailwind (`bg-glam-paper`, `bg-glam-rose-400`, `display-xl`, etc.)
- Utilidades editoriales: `.display-xl`, `.display-lg`, `.split-line`, `.eyebrow`
- Clases botón: `.btn-primary`, `.btn-secondary`, `.btn-whatsapp`, `.btn-ghost`
- `.container-editorial` con max-width 1440px
- Marquee animado (`EditorialMarquee.vue`)
- Cursor personalizado desktop (`CustomCursor.vue`) con estados: DEFAULT / VIEW / EXPLORE / CHAT
- Animación `prefers-reduced-motion` respetada

### Layout & Navigation
- `AppHeader.vue`: header transparente → sólido al scroll, menú fullscreen con reveal stagger
- `AppFooter.vue`: tres bloques (CTA social + marquee oscuro + info)
- `FloatingWhatsApp.vue`: botón flotante con ping sutil
- Mobile-first con menú hamburguesa → fullscreen

### Páginas
- `/` Home — hero de campaña, manifiesto, THE GLAM EDIT (revista), categorías fullscreen, THE GLAM COLLECTION (4 productos con layouts distintos), GLAM GIRLS (collage), CTA WhatsApp
- `/catalogo` Catálogo — hero editorial, filtros, búsqueda, grid 4-col
- `/producto/:id` Detalle — galería, tonos, descripción, CTA WhatsApp, relacionados
- `/colecciones` + `/colecciones/:slug`
- `/nosotros`
- `/contacto`
- `/404`

### WhatsApp
- Centralizado en `src/config/glam.config.ts`
- Helper `generateWhatsAppLink(product)` en `src/utils/whatsapp.ts`
- Mensaje por defecto: `Hola GLAM 👋\n\nEstoy interesada en el producto: [NOMBRE]\n¿Podrían darme más información?`

### Imágenes
- Logo cliente en `/public/brand/logo.png`
- 14 ilustraciones SVG premium en `/public/products/` (una por producto + variaciones + placeholders)
- Colecciones con su propia imagen
- Sin dependencia externa (funciona offline)

### Animaciones & Motion
- GSAP + ScrollTrigger en Home (hero cinemático de 6 fases, parallax)
- Lenis smooth scroll
- Reveal staggered en todas las secciones principales
- Transición entre páginas con `clip-path`
- Hover microinteractions en cards y categorías

### Testing
- **24/24 Vitest** verde (utils WhatsApp, filtros, búsqueda, productos, helpers)
- **34/34 Playwright** verde (desktop + mobile, WhatsApp, navegación, responsive, no-ecommerce)
- TypeScript estricto: 0 errores
- ESLint: 0 errores, 0 warnings
- Build producción OK (`dist/`)

### Performance
- Code splitting por vista (cada vista en su propio chunk)
- Imágenes SVG inline → tamaño mínimo
- Lazy loading en imágenes below-the-fold
- `fetchpriority="high"` en hero
- Bundle inicial: ~140 kB JS + 28 kB CSS (gzip ~52 kB + 5 kB)

### Accessibility
- Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<blockquote>`, `<header>`, `<footer>`)
- ARIA labels en iconos y botones
- `aria-expanded` en toggle menú
- Focus visible (ring rosa)
- `prefers-reduced-motion` respetado en CSS y GSAP
- Contraste texto ≥ 4.5:1

### Responsive
- Breakpoints: sm 640 / md 768 / lg 1024 / xl 1280
- Mobile-first en todos los componentes
- Sin scroll horizontal (test E2E lo valida)
- Menú mobile → fullscreen con teclado (ESC cierra)

---

## 🟡 EN PROGRESO

(nada crítico)

---

## ❌ PENDIENTE / PARA FUTURO

### Posibles mejoras visuales
- Sustituir ilustraciones SVG por fotografía real cuando la cliente provea assets
- Máscaras de imagen con `clip-path` en hero (cuando haya fotos grandes)
- Video background sutil en hero (cuando se tenga footage)
- Sección "Behind GLAM" tipo mini-documental

### Contenido
- Más productos (actualmente 8 demo, estructura soporta N)
- Posts editoriales "The GLAM Edit" adicionales (actualmente 1)
- Testimonios reales cuando haya

### Integración futura
- Conectar `src/data/products.ts` a un CMS (Sanity, Contentful, Strapi)
- Analytics (Plausible / Umami) para medir conversión WhatsApp
- Open Graph image dinámica por producto
- Sitemap.xml + robots.txt (si SEO orgánico es prioridad)

---

## 🐛 PROBLEMAS CONOCIDOS

Ninguno crítico. Notas menores:

- Imágenes son SVG editoriales (no fotografía). Son elegantes pero pueden sentirse "ilustradas". Reemplazar cuando haya fotos.
- Tipografía carga de Google Fonts — si se quiere 100% offline, self-host con `fontsource`.

---

## 🚀 DEPLOYMENT

Cloudflare Pages:

```
build command:    npm run build
output dir:       dist
node version:     20+
```

SPA routing funciona automáticamente en Pages (`_redirects` no necesario para Vue Router con `createWebHistory`).

---

## 📁 ESTRUCTURA

```
src/
├── config/
│   └── glam.config.ts          # WhatsApp, marca, redes (CENTRALIZADO)
├── utils/
│   ├── whatsapp.ts             # generateWhatsAppLink(product)
│   └── __tests__/whatsapp.test.ts
├── data/
│   └── products.ts             # 8 productos + 2 colecciones (CMS-ready)
├── composables/
│   ├── useLenis.ts
│   ├── useMediaQuery.ts
│   ├── useReveal.ts
│   └── useScrollPosition.ts
├── components/
│   ├── icons/                  # WhatsAppIcon, InstagramIcon, TikTokIcon, ArrowRight
│   ├── layout/
│   │   ├── AppHeader.vue       # header + fullscreen menu
│   │   ├── AppFooter.vue
│   │   ├── FloatingWhatsApp.vue
│   │   └── CustomCursor.vue    # cursor personalizado desktop
│   ├── product/
│   │   ├── ProductCard.vue
│   │   └── ProductShowcase.vue # THE GLAM COLLECTION
│   ├── category/
│   │   └── CategoryGrid.vue    # categorías fullscreen
│   ├── editorial/
│   │   ├── GlamEditSection.vue # THE GLAM EDIT (revista)
│   │   └── GlamGirlsSection.vue
│   └── ui/
│       └── EditorialMarquee.vue
├── views/
│   ├── HomeView.vue
│   ├── CatalogView.vue
│   ├── ProductView.vue
│   ├── CollectionsView.vue
│   ├── CollectionDetailView.vue
│   ├── AboutView.vue
│   ├── ContactView.vue
│   ├── NotFoundView.vue
│   └── __tests__/CatalogView.test.ts
├── styles/
│   └── main.css                # tokens + animaciones + cursor
├── router/index.ts
├── App.vue
└── main.ts

public/
├── brand/logo.png              # logo cliente
├── products/                   # 14 ilustraciones SVG
└── favicon.svg

e2e/
└── glam.spec.ts                # 17 tests × 2 proyectos = 34
```

---

## 🎯 MÉTRICAS DE CONVERSIÓN (conceptuales)

1. `view_product` — abrir detalle de un producto
2. `view_detail` — scroll completo en `/producto/:id`
3. `click_whatsapp` — clic en cualquier CTA WhatsApp (header, hero, detalle, footer, flotante)

No se implementa analytics automáticamente. Listo para Plausible o similar.

---

## ✨ NOTAS DE DIRECCIÓN ARTÍSTICA

GLAM no es una tienda. Cada decisión visual refuerza esto:

- **Hero de campaña**, no hero corporativo. Tipografía atraviesa la imagen con `mix-blend-difference`.
- **THE GLAM EDIT** funciona como columna editorial con cita, imágenes asimétricas y folio (`01`).
- **Categorías** son filas full-width que cambian a fondo negro en hover (no cards de filtro).
- **Cada producto en showcase** tiene un layout distinto (image-right / image-left / full-bleed / floating).
- **GLAM GIRLS** es collage con offsets, no grid uniforme.
- **Cursor personalizado** cambia según el contexto (VIEW sobre productos, CHAT sobre WhatsApp).
- **Transiciones entre páginas** usan `clip-path inset` para sensación de revista abriéndose.