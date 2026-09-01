<script setup lang="ts">
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { trackWhatsAppClick } from '@/utils/analytics';
import { glamConfig } from '@/config/glam.config';
const { url } = generateWhatsAppLink(undefined, { source: 'floating-button' });
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform duration-300 ease-elegant hover:scale-105 hover:bg-[#1DAE53] motion-reduce:transition-none motion-reduce:hover:scale-100 md:bottom-8 md:right-8"
    style="min-width: 56px; min-height: 56px;"
    :aria-label="`Contactar a GLAM por WhatsApp al ${glamConfig.whatsapp.number}`"
    data-testid="floating-whatsapp"
    @click="trackWhatsAppClick({ source: 'floating-button' })"
  >
    <span class="sr-only">Contactar a GLAM por WhatsApp</span>
    <span class="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 opacity-60 motion-reduce:hidden" />
    <WhatsAppIcon class="h-6 w-6" aria-hidden="true" />
  </a>
</template>

<style scoped>
@keyframes ping {
  75%,
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
.animate-ping {
  animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>