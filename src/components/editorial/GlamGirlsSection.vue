<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const sectionRef = ref<HTMLElement | null>(null);

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

onMounted(() => {
  if (!sectionRef.value || reduced()) return;
  gsap.from('.girls-card', {
    scrollTrigger: { trigger: sectionRef.value, start: 'top 75%' },
    y: 60,
    opacity: 0,
    duration: 1.1,
    stagger: 0.1,
    ease: 'power3.out',
  });
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative overflow-hidden bg-glam-cream/30 py-24 md:py-40"
    aria-label="Mujeres GLAM"
  >
    <div class="container-editorial">
      <div class="mb-16 grid grid-cols-12 items-end gap-6">
        <div class="col-span-12 md:col-span-7">
          <p class="eyebrow mb-4">Comunidad</p>
          <h2 class="display-lg font-display font-light leading-[0.95]">
            <span class="block">Mujeres</span>
            <span class="block italic text-glam-rose-500">GLAM.</span>
          </h2>
        </div>
        <div class="col-span-12 md:col-span-4 md:col-start-9">
          <p class="max-w-sm text-sm leading-relaxed text-glam-muted">
            La comunidad GLAM. Cada una con su ritual, su tono, su manera de habitar la belleza.
            Bienvenida.
          </p>
        </div>
      </div>

      <!-- Editorial collage: asymmetric -->
      <div class="grid grid-cols-12 gap-4 md:gap-6">
        <div class="girls-card col-span-6 md:col-span-4 md:col-start-1 md:row-span-2">
          <div class="aspect-[3/4] overflow-hidden">
            <img
              src="/products/lumiere-rose-2.svg"
              alt="GLAM Girl 01"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-[10px] uppercase tracking-ultra text-glam-muted">@sofia · Glow ritual</p>
        </div>

        <div class="girls-card col-span-6 md:col-span-4 md:col-start-5 md:mt-16">
          <div class="aspect-square overflow-hidden">
            <img
              src="/products/rose-petal-1.svg"
              alt="GLAM Girl 02"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-[10px] uppercase tracking-ultra text-glam-muted">@valen · Rose mood</p>
        </div>

        <div class="girls-card col-span-12 md:col-span-3 md:col-start-10 md:-mt-8">
          <div class="aspect-[3/4] overflow-hidden">
            <img
              src="/products/rose-petal-1.svg"
              alt="GLAM Girl 03"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-[10px] uppercase tracking-ultra text-glam-muted">@cami · Rosé glow</p>
        </div>

        <div class="girls-card col-span-6 md:col-span-4 md:col-start-2">
          <div class="aspect-[4/5] overflow-hidden">
            <img
              src="/products/midnight-line-1.svg"
              alt="GLAM Girl 04"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-[10px] uppercase tracking-ultra text-glam-muted">@daniela · Midnight</p>
        </div>

        <div class="girls-card col-span-6 md:col-span-3 md:col-start-7 md:mt-20">
          <div class="aspect-square overflow-hidden">
            <img
              src="/products/brow-architecture-1.svg"
              alt="GLAM Girl 05"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-[10px] uppercase tracking-ultra text-glam-muted">@mariana · Defined</p>
        </div>

        <div class="girls-card col-span-12 md:col-span-4 md:col-start-10 md:-mt-12">
          <div class="aspect-[4/5] overflow-hidden">
            <img
              src="/products/volume-noir-1.svg"
              alt="GLAM Girl 06"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-[10px] uppercase tracking-ultra text-glam-muted">@laura · Volume</p>
        </div>
      </div>

<div class="mt-16 text-center">
        <p class="font-display text-2xl italic text-glam-muted">
          ¿Lista para ser la próxima?
        </p>
      </div>
    </div>
  </section>
</template>