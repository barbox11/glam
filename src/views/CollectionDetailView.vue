<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { getCollectionBySlug, getProductsByCollection } from '@/data/products';
import ProductCard from '@/components/product/ProductCard.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';

const route = useRoute();
const router = useRouter();

const collection = computed(() => getCollectionBySlug(route.params.slug as string));
const products = computed(() => (collection.value ? getProductsByCollection(collection.value.slug) : []));

watch(
  collection,
  (val) => {
    if (!val) router.replace({ name: 'not-found' });
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="collection" class="pt-28 md:pt-36">
    <section class="container-editorial pb-12">
      <RouterLink to="/colecciones" class="link-underline text-xs text-glam-muted">
        Colecciones
      </RouterLink>
      <p class="eyebrow mt-6 mb-4">{{ collection.name }}</p>
      <h1 class="font-display text-5xl font-light leading-[1.05] md:text-7xl">
        {{ collection.name }}
      </h1>
      <p class="mt-6 max-w-xl text-base leading-relaxed text-glam-muted md:text-lg">
        {{ collection.description }}
      </p>
    </section>

    <section class="container-editorial pb-24">
      <div class="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </section>

    <section v-if="!products.length" class="container-editorial pb-24 text-center">
      <p class="font-display text-2xl italic text-glam-muted">
        Pronto habrá productos en esta colección.
      </p>
      <RouterLink to="/catalogo" class="btn-secondary mt-8 inline-flex">
        Explorar catálogo
        <ArrowRight class="h-4 w-4" />
      </RouterLink>
    </section>
  </div>
</template>