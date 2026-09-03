<script setup lang="ts">
import { onMounted } from 'vue';
import { useLenis } from '@/composables/useLenis';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp.vue';
import CustomCursor from '@/components/layout/CustomCursor.vue';
import CartDrawer from '@/components/cart/CartDrawer.vue';

const { init } = useLenis();

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  // En móvil desactivar Lenis — scroll nativo es más fluido y no se pega
  if (prefersReduced || isCoarse) return;
  init();
});
</script>

<template>
  <div class="min-h-screen bg-glam-white">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-glam-ink focus:px-5 focus:py-2.5 focus:text-[11px] focus:uppercase focus:tracking-ultra focus:text-white focus:outline-none"
    >
      Saltar al contenido principal
    </a>
    <CustomCursor />
    <AppHeader />
    <main id="main-content" tabindex="-1">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <FloatingWhatsApp />
    <CartDrawer />
  </div>
</template>