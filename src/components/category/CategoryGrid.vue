<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { RouterLink } from 'vue-router';
import { products } from '@/data/products';
import ArrowRight from '@/components/icons/ArrowRight.vue';

interface Category {
  id: string;
  label: string;
}

const props = defineProps<{ categories: Category[] }>();
const sectionRef = ref<HTMLElement | null>(null);

const enriched = props.categories.map((c) => {
  const product = products.find((p) => p.category === c.id);
  return {
    ...c,
    image: product?.image || '/products/placeholder.svg',
    count: products.filter((p) => p.category === c.id).length,
  };
});

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

onMounted(() => {
  if (!sectionRef.value || prefersReducedMotion()) return;
  gsap.from('.cat-row', {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' },
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out',
  });
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative bg-glam-paper py-20 md:py-28"
    aria-label="Categorías"
  >
    <div class="container-editorial">
      <div class="mb-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p class="eyebrow mb-4">Universo</p>
          <h2 class="display-lg font-display font-light leading-[0.95]">
            Por <span class="italic text-glam-rose-500">categoría.</span>
          </h2>
        </div>
        <p class="max-w-sm text-sm text-glam-muted">
          Toca una categoría para explorar. Pasa el cursor sobre cada una para ver el detalle.
        </p>
      </div>
    </div>

    <div class="border-y border-glam-line">
      <RouterLink
        v-for="cat in enriched"
        :key="cat.id"
        :to="`/catalogo?cat=${cat.id}`"
        class="cat-row group relative block overflow-hidden border-b border-glam-line last:border-b-0 transition-colors duration-700 ease-elegant hover:bg-glam-ink active:bg-glam-ink"
        data-cursor="ver"
        data-cursor-label="Ver"
      >
        <div class="container-editorial flex items-center justify-between py-8 md:py-14">


          <!-- Label (huge) -->
          <span
            class="display-lg font-display font-light tracking-[-0.02em] text-glam-ink transition-all duration-700 ease-elegant group-hover:translate-x-4 group-hover:italic group-hover:text-white"
          >
            {{ cat.label }}
          </span>

          <!-- Image (hidden, reveals on hover) -->
          <div
            class="pointer-events-none absolute right-[8%] top-1/2 hidden h-32 w-44 -translate-y-1/2 overflow-hidden opacity-0 transition-all duration-700 ease-elegant group-hover:translate-x-0 group-hover:opacity-100 md:block"
          >
            <img :src="cat.image" :alt="cat.label" class="h-full w-full object-cover" />
          </div>

          <!-- Right: count + arrow -->
          <div class="flex items-center gap-6">
            <span class="hidden text-[10px] uppercase tracking-ultra text-glam-muted group-hover:text-white/60 md:inline">
              {{ cat.count }} {{ cat.count === 1 ? 'pieza' : 'piezas' }}
            </span>
            <ArrowRight
              class="h-5 w-5 text-glam-ink transition-all duration-700 group-hover:translate-x-2 group-hover:text-white md:h-7 md:w-7"
            />
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>