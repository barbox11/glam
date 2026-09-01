import { createRouter, createWebHistory } from 'vue-router';

const SITE_URL = 'https://glam-3in.pages.dev';

function setMeta(selector: string, content: string) {
  const el = document.querySelector(selector) as HTMLMetaElement | null;
  if (el) el.setAttribute('content', content);
}

function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'GLAM — Belleza que se siente', description: 'Catálogo digital premium de maquillaje. Belleza con intención. Descubre y consulta por WhatsApp.' },
    },
    {
      path: '/catalogo',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue'),
      meta: { title: 'Catálogo — GLAM', description: 'Explora todas las piezas GLAM. Filtra por categoría y encuentra tu próximo favorito.' },
    },
    {
      path: '/producto/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
      meta: { title: 'Producto — GLAM' },
    },
    {
      path: '/colecciones',
      name: 'collections',
      component: () => import('@/views/CollectionsView.vue'),
      meta: { title: 'Colecciones — GLAM', description: 'Cada colección es una pequeña historia. Descubre los mundos curados de GLAM.' },
    },
    {
      path: '/colecciones/:slug',
      name: 'collection-detail',
      component: () => import('@/views/CollectionDetailView.vue'),
      meta: { title: 'Colección — GLAM' },
    },
    {
      path: '/nosotros',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'Nosotros — GLAM', description: 'GLAM es una forma de mirar. Belleza con intención, curaduría consciente.' },
    },
    {
      path: '/contacto',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: 'Contacto — GLAM', description: 'Conversemos por WhatsApp. Respuesta personal en 24h.' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '404 — GLAM', description: 'Página no encontrada. Vuelve al catálogo GLAM.' },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0, behavior: 'smooth' };
  },
});

router.afterEach((to) => {
  const title = (to.meta?.title as string | undefined) ?? 'GLAM';
  document.title = title;
  const desc = (to.meta?.description as string | undefined) ?? 'Catálogo digital premium de maquillaje. Descubre, explora y consulta por WhatsApp.';
  setMeta('meta[name="description"]', desc);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', desc);
  setMeta('meta[property="og:url"]', `${SITE_URL}${to.fullPath}`);
  // og:image dinámico por producto/colección
  const ogImage = (to.meta?.ogImage as string | undefined) ?? '/hero/hero-main.jpg';
  setMeta('meta[property="og:image"]', toAbsoluteUrl(ogImage));
});