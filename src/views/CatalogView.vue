<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories, type ProductCategory } from '@/data/products';
import ProductCard from '@/components/product/ProductCard.vue';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const router = useRouter();

const search = ref('');
const activeCategory = ref<ProductCategory | 'all'>('all');
const gridRef = ref<HTMLElement | null>(null);
const heroRef = ref<HTMLElement | null>(null);

// Initialize from query param
const initialCat = route.query.cat as string | undefined;
if (initialCat && categories.some((c) => c.id === initialCat)) {
  activeCategory.value = initialCat as ProductCategory;
}

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase();
  return products.filter((p) => {
    const matchesCategory = activeCategory.value === 'all' || p.category === activeCategory.value;
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.tagline.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
});

const setCategory = (cat: ProductCategory | 'all') => {
  activeCategory.value = cat;
  router.replace({ query: cat === 'all' ? {} : { cat } });
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

watch([search, activeCategory], () => {
  if (!gridRef.value || prefersReducedMotion()) return;
  if (window.matchMedia('(max-width: 767px)').matches) return;
  gsap.fromTo(
    gridRef.value.children,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out' },
  );
});

onMounted(() => {
  if (!heroRef.value) return;
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
  if (!prefersReducedMotion() && !isMobile()) {
    gsap.from('.cat-hero-line', {
      yPercent: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.07,
      ease: 'power3.out',
    });
  }
  if (gridRef.value && !prefersReducedMotion() && !isMobile()) {
    gsap.from(gridRef.value.children, {
      scrollTrigger: { trigger: gridRef.value, start: 'top 85%' },
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power2.out',
    });
  }
});
</script>

<template>
  <div class="bg-glam-paper">
    <!-- Hero -->
    <section ref="heroRef" class="container-editorial pb-12 pt-28 md:pb-16 md:pt-40">
      <p class="eyebrow mb-4">Catálogo</p>
      <h1 class="display-xl font-display font-light leading-[0.92] tracking-[-0.02em]">
        <span class="cat-hero-line block overflow-hidden pb-2">
          <span class="block">Todas</span>
        </span>
        <span class="cat-hero-line block overflow-hidden pb-2 italic text-glam-rose-500">
          <span class="block">las piezas.</span>
        </span>
      </h1>
      <p class="mt-8 max-w-xl text-base text-glam-muted md:text-lg">
        Explora, busca y filtra. Cuando algo te interese, toca el producto para verlo en detalle.
      </p>
    </section>

    <!-- Filters -->
    <section class="container-editorial border-y border-glam-line py-6">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-full px-5 py-2 text-[11px] uppercase tracking-ultra transition-all duration-500 ease-elegant"
            :class="
              activeCategory === 'all'
                ? 'bg-glam-ink text-white'
                : 'border border-glam-line text-glam-ink/70 hover:border-glam-ink hover:text-glam-ink'
            "
            data-testid="filter-all"
            @click="setCategory('all')"
          >
            Todas
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            class="rounded-full border px-5 py-2 text-[11px] uppercase tracking-ultra transition-all duration-500 ease-elegant"
            :class="
              activeCategory === cat.id
                ? 'border-glam-ink bg-glam-ink text-white'
                : 'border-glam-line text-glam-ink/70 hover:border-glam-ink hover:text-glam-ink'
            "
            :data-testid="`filter-${cat.id}`"
            @click="setCategory(cat.id)"
          >
            {{ cat.label }}
          </button>
        </div>

        <label class="relative block w-full md:w-72">
          <span class="sr-only">Buscar productos</span>
          <input
            v-model="search"
            type="search"
            inputmode="search"
            autocomplete="off"
            placeholder="Buscar productos..."
            class="w-full rounded-full border border-glam-line bg-transparent px-5 py-3 pr-10 text-sm transition-colors focus:border-glam-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-glam-rose-400 focus-visible:ring-offset-2"
            data-testid="search-input"
          />
          <svg
            class="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-glam-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path stroke-linecap="round" d="m21 21-3.5-3.5" />
          </svg>
        </label>
      </div>

      <p class="mt-6 text-[10px] uppercase tracking-ultra text-glam-muted" data-testid="results-count">
        {{ filtered.length }} {{ filtered.length === 1 ? 'producto' : 'productos' }}
      </p>
    </section>

    <!-- Grid -->
    <section class="container-editorial py-16 md:py-24">
      <div
        v-if="filtered.length"
        ref="gridRef"
        class="grid gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-testid="product-grid"
      >
        <ProductCard v-for="product in filtered" :key="product.id" :product="product" />
      </div>

      <div v-else class="py-24 text-center" data-testid="empty-state">
        <p class="font-display text-2xl font-light italic text-glam-muted">
          No encontramos nada para "{{ search }}".
        </p>
        <p class="mt-3 text-sm text-glam-muted">Prueba con otra palabra o limpia los filtros.</p>
        <button
          class="btn-secondary mt-6"
          @click="
            () => {
              search = '';
              setCategory('all');
            }
          "
        >
          Limpiar búsqueda
        </button>
      </div>
    </section>
  </div>
</template>