<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center px-6 pt-24">
    <div class="max-w-xl text-center">
      <p class="eyebrow mb-6">Error 404</p>
      <h1 class="font-display text-7xl font-light leading-none md:text-9xl">
        4<span class="italic text-glam-rose-500">0</span>4
      </h1>
      <p class="mt-6 font-display text-2xl italic text-glam-muted">
        Esta página se nos perdió entre los productos.
      </p>
      <p class="mt-4 text-sm text-glam-muted">
        Pero el catálogo sigue intacto. ¿Volvemos a empezar?
      </p>
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <RouterLink to="/" class="btn-primary">Volver al inicio</RouterLink>
        <RouterLink to="/catalogo" class="btn-secondary">Ir al catálogo</RouterLink>
      </div>
    </div>
  </div>
</template>