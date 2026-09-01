import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'GLAM — Belleza que se siente' },
    },
    {
      path: '/catalogo',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue'),
      meta: { title: 'Catálogo — GLAM' },
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
      meta: { title: 'Colecciones — GLAM' },
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
      meta: { title: 'Nosotros — GLAM' },
    },
    {
      path: '/contacto',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: 'Contacto — GLAM' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '404 — GLAM' },
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
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', desc);
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', desc);
});