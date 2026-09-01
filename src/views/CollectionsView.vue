<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { collections, products } from '@/data/products';
import ArrowRight from '@/components/icons/ArrowRight.vue';

const collectionProductsCount = (slug: string) =>
  products.filter((p) => p.collection === slug).length;
</script>

<template>
  <div class="pt-28 md:pt-36">
    <section class="container-editorial pb-16">
      <p class="eyebrow mb-4">Colecciones</p>
      <h1 class="font-display text-5xl font-light leading-[1.05] md:text-7xl">
        Mundos<br />
        <span class="italic text-glam-rose-500">curados.</span>
      </h1>
      <p class="mt-6 max-w-xl text-base text-glam-muted md:text-lg">
        Cada colección es una pequeña historia. Una paleta, un estado de ánimo, un capítulo de GLAM.
      </p>
    </section>

    <section class="container-editorial pb-24">
      <div class="space-y-24">
        <RouterLink
          v-for="(collection, idx) in collections"
          :key="collection.id"
          :to="`/colecciones/${collection.slug}`"
          class="group block"
        >
          <div
            class="grid items-center gap-10 md:grid-cols-12"
            :class="idx % 2 === 1 ? 'md:[direction:rtl]' : ''"
          >
            <div
              class="aspect-[4/5] overflow-hidden bg-glam-cream md:col-span-6 md:[direction:ltr]"
            >
              <img
                :src="collection.image"
                :alt="collection.name"
                class="h-full w-full object-cover transition-transform duration-[1200ms] ease-elegant group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div class="md:col-span-6 md:[direction:ltr]">
              <p class="eyebrow mb-3">Colección</p>
              <h2 class="font-display text-4xl font-light leading-tight md:text-6xl">
                {{ collection.name }}
              </h2>
              <p class="mt-6 max-w-md text-base leading-relaxed text-glam-muted">
                {{ collection.description }}
              </p>
              <p class="mt-6 text-sm text-glam-muted">
                {{ collectionProductsCount(collection.slug) }} productos en esta colección
              </p>
              <span class="link-underline mt-6 inline-flex items-center gap-2 text-sm text-glam-ink">
                Explorar colección
                <ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>