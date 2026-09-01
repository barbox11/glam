<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { RouterLink } from 'vue-router';

const sectionRef = ref<HTMLElement | null>(null);

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

onMounted(() => {
  if (!sectionRef.value || reduced()) return;
  gsap.from('.edit-line', {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 70%' },
    yPercent: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: 'power4.out',
  });
  gsap.from('.edit-img-1', {
    scrollTrigger: { trigger: '.edit-img-1', start: 'top 80%' },
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
  });
  gsap.from('.edit-img-2', {
    scrollTrigger: { trigger: '.edit-img-2', start: 'top 85%' },
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
  });
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden bg-glam-paper py-24 md:py-40"
    aria-label="El Editorial GLAM"
  >
    <div class="container-editorial">
      <!-- Header: magazine style -->
      <div class="mb-16 grid grid-cols-12 items-end gap-6">
        <div class="col-span-12 md:col-span-8">
          <p class="eyebrow mb-4">El Editorial GLAM</p>
          <h2 class="display-xl font-display font-light leading-[0.92] tracking-[-0.02em]">
            <span class="edit-line block overflow-hidden pb-2">
              <span class="block">El brillo</span>
            </span>
            <span class="edit-line block overflow-hidden pb-2 italic text-glam-rose-500">
              <span class="block">es un estado</span>
            </span>
            <span class="edit-line block overflow-hidden pb-2">
              <span class="block">de ánimo.</span>
            </span>
          </h2>
        </div>
        <div class="col-span-12 md:col-span-4">
          <p class="font-display text-lg italic text-glam-muted">
            Una columna editorial donde GLAM reflexiona sobre belleza,ritual y presencia.
          </p>
        </div>
      </div>

      <!-- Editorial body: asymmetric grid -->
      <div class="grid grid-cols-12 gap-y-12 md:gap-x-8 md:gap-y-0">
        <!-- Pull quote -->
        <blockquote class="col-span-12 md:col-span-7 md:col-start-1">
          <p class="font-display text-3xl font-light italic leading-tight md:text-5xl">
            “No es lo que te pones.<br />
            Es <span class="text-glam-rose-500">cómo habitas</span> cuando te lo pones.”
          </p>
          <footer class="mt-6 text-[10px] uppercase tracking-ultra text-glam-muted">
            — GLAM
          </footer>
        </blockquote>

        <!-- Image 1 -->
        <div class="edit-img-1 col-span-12 md:col-span-5 md:col-start-8 md:-mt-12">
          <div class="aspect-[4/5] overflow-hidden">
            <img
              src="/products/velvet-kiss-2.svg"
              alt="Editorial GLAM"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <p class="mt-4 text-[10px] uppercase tracking-ultra text-glam-muted">
            Look 01 · Velvet
          </p>
        </div>

        <!-- Image 2: floating offset -->
        <div class="edit-img-2 col-span-12 md:col-span-5 md:col-start-2 md:mt-24">
          <div class="aspect-[3/4] overflow-hidden">
            <img
              src="/products/silk-veil-2.svg"
              alt="Editorial GLAM"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <p class="mt-4 text-[10px] uppercase tracking-ultra text-glam-muted">
            Look 02 · Silk
          </p>
        </div>

        <!-- Body text -->
        <div class="col-span-12 mt-12 md:col-span-5 md:col-start-8 md:mt-32">
          <p class="font-display text-xl font-light italic text-glam-rose-500">
            Belleza con intención.
          </p>
          <p class="mt-6 text-sm leading-relaxed text-glam-muted md:text-base">
            En GLAM creemos en el ritual antes que en el resultado. Cada gesto es una pausa.
            Cada producto, una declaración silenciosa de cómo quieres habitar el día.
          </p>
          <p class="mt-4 text-sm leading-relaxed text-glam-muted md:text-base">
            Por eso elegimos. Por eso curamos. Por eso escribimos personalmente cuando nos
            escribes.
          </p>
          <RouterLink
            to="/colecciones"
            class="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-ultra text-glam-ink transition-colors hover:text-glam-rose-500"
          >
            Explorar colecciones
          </RouterLink>
        </div>
      </div>

      <!-- Bottom marker -->
      <div class="mt-24 flex items-end justify-between border-t border-glam-line pt-6 md:mt-32">
        <p class="font-display text-6xl italic text-glam-rose-200 md:text-8xl" aria-hidden="true"></p>
        <p class="text-[10px] uppercase tracking-ultra text-glam-muted">
          Editorial · Primavera 2026
        </p>
      </div>
    </div>
  </section>
</template>