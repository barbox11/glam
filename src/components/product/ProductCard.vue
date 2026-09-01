<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Product } from '@/data/products';
import { categories } from '@/data/products';

defineProps<{ product: Product }>();

const getCategoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? id;
</script>

<template>
  <RouterLink
    :to="`/producto/${product.id}`"
    class="group block"
    :aria-label="`Ver producto ${product.name}`"
    data-testid="product-card"
  >
    <div class="relative aspect-[4/5] overflow-hidden bg-glam-cream">
      <img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-[1200ms] ease-elegant group-hover:scale-105"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-glam-ink/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        v-if="product.isNew"
        class="absolute left-4 top-4 rounded-full bg-glam-white/90 px-3 py-1 text-[10px] uppercase tracking-ultra text-glam-rose-500 backdrop-blur"
      >
        Nuevo
      </span>
    </div>

    <div class="mt-5 flex items-start justify-between gap-4">
      <div class="flex-1">
        <p class="eyebrow">{{ getCategoryLabel(product.category) }}</p>
        <h3 class="mt-1 font-display text-xl font-light leading-tight transition-colors group-hover:text-glam-rose-500">
          {{ product.name }}
        </h3>
        <p class="mt-1 text-sm italic text-glam-muted">{{ product.tagline }}</p>
        <p v-if="product.price" class="mt-2 text-sm font-medium text-glam-ink">{{ product.price }}</p>
      </div>
    </div>
  </RouterLink>
</template>