<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useScrollPosition } from '@/composables/useScrollPosition';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue';
import { glamConfig } from '@/config/glam.config';
import { trackWhatsAppClick } from '@/utils/analytics';

const route = useRoute();
const { scrolled } = useScrollPosition(40);
const isOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false;
  },
);

watch(isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    // inert main para a11y focus trap simple
    const main = document.getElementById('main-content');
    if (main) main.setAttribute('inert', '');
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    const main = document.getElementById('main-content');
    if (main) main.removeAttribute('inert');
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  const main = document.getElementById('main-content');
  if (main) main.removeAttribute('inert');
});

const navLinks = [
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/colecciones', label: 'Colecciones' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') isOpen.value = false;
};
onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-elegant"
    :class="scrolled || isOpen ? 'bg-glam-white border-b border-glam-line/40' : 'bg-transparent'"
  >
    <div class="container-editorial flex h-16 items-center justify-between md:h-20">
      <!-- Left: menu trigger -->
      <button
        class="group flex h-11 items-center gap-3 rounded-full px-3 text-[11px] uppercase tracking-ultra text-glam-ink outline-none transition-colors hover:bg-glam-line/30 focus-visible:ring-2 focus-visible:ring-glam-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-glam-white"
        :aria-expanded="isOpen"
        aria-controls="fullscreen-menu"
        :aria-label="isOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="isOpen = !isOpen"
      >
        <span class="relative block h-3 w-6">
          <span
            class="absolute left-0 top-0 h-px w-full bg-glam-ink transition-transform duration-500 ease-elegant"
            :class="isOpen ? 'translate-y-1.5 rotate-45' : ''"
          />
          <span
            class="absolute bottom-0 left-0 h-px w-full bg-glam-ink transition-transform duration-500 ease-elegant"
            :class="isOpen ? '-translate-y-0 -rotate-45' : ''"
          />
        </span>
        <span class="hidden md:inline">{{ isOpen ? 'Cerrar' : 'Menú' }}</span>
      </button>

      <!-- Center: logo -->
      <RouterLink
        to="/"
        class="block transition-opacity hover:opacity-80"
        aria-label="GLAM — Inicio"
      >
        <img src="/brand/logo.png" alt="GLAM" class="h-12 w-auto md:h-20 lg:h-[84px]" />
      </RouterLink>

      <!-- Right: WhatsApp — 44px touch target en mobile -->
      <a
        :href="`https://wa.me/${glamConfig.whatsapp.numberRaw}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 text-[11px] uppercase tracking-ultra text-glam-ink transition-colors hover:text-glam-rose-500 md:min-h-0 md:min-w-0"
        data-testid="header-whatsapp"
        @click="trackWhatsAppClick({ source: 'header' })"
      >
        <span class="hidden md:inline">WhatsApp</span>
        <WhatsAppIcon class="h-5 w-5 md:h-4 md:w-4" />
      </a>
    </div>
  </header>

  <!-- Fullscreen menu overlay -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-500 ease-elegant"
      leave-active-class="transition-opacity duration-300 ease-elegant"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        id="fullscreen-menu"
        class="fixed inset-0 z-40 overflow-hidden bg-glam-paper"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div class="container-editorial flex h-full flex-col pt-24 pb-12 md:pt-32">
          <div class="flex flex-1 flex-col justify-center">
            <p class="eyebrow mb-8">Navega</p>
            <nav class="space-y-4 md:space-y-6" aria-label="Menú principal">
              <RouterLink
                v-for="link in navLinks"
                :key="link.to"
                :to="link.to"
                class="group block"
                data-testid="fullscreen-nav-link"
              >
                <div class="flex items-baseline gap-6 overflow-hidden">
                  <span
                    class="display-lg font-display font-light leading-none tracking-tight transition-colors duration-500 ease-elegant group-hover:italic group-hover:text-glam-rose-500"
                  >
                    {{ link.label }}
                  </span>
                </div>
              </RouterLink>
            </nav>
          </div>

          <div class="grid grid-cols-1 gap-8 border-t border-glam-line pt-8 md:grid-cols-2">
            <div>
              <p class="eyebrow mb-3">Conversemos</p>
              <a
                :href="`https://wa.me/${glamConfig.whatsapp.numberRaw}`"
                target="_blank"
                rel="noopener noreferrer"
                class="font-display text-2xl text-glam-ink transition-colors hover:text-glam-rose-500"
                @click="trackWhatsAppClick({ source: 'menu' })"
              >
                {{ glamConfig.whatsapp.number }}
              </a>
            </div>
            <div class="md:text-right">
              <p class="eyebrow mb-3">Síguenos</p>
              <div class="flex gap-4 md:justify-end">
                <a
                  :href="glamConfig.contact.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[11px] uppercase tracking-ultra text-glam-ink/70 transition-colors hover:text-glam-rose-500"
                  >Instagram</a
                >
                <a
                  :href="glamConfig.contact.tiktok"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[11px] uppercase tracking-ultra text-glam-ink/70 transition-colors hover:text-glam-rose-500"
                  >TikTok</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>