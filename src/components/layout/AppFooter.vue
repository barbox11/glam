<script setup lang="ts">
import { RouterLink } from 'vue-router';
import InstagramIcon from '@/components/icons/InstagramIcon.vue';
import TikTokIcon from '@/components/icons/TikTokIcon.vue';
import { glamConfig } from '@/config/glam.config';
import EditorialMarquee from '@/components/ui/EditorialMarquee.vue';

const year = new Date().getFullYear();

const marqueeItems = ['Eres hermosa tal como eres', 'Tu brillo es único', 'Brilla sin miedo', 'Poderosa', 'GLAM', 'Belleza sin límites']; // motivadoras
</script>

<template>
  <footer>
    <!-- Big CTA strip — con foto circular humanizada -->
    <div class="bg-glam-paper py-16 md:py-20">
      <div class="container-editorial grid grid-cols-12 items-center gap-8 text-center md:gap-12 md:text-left">
        <div class="col-span-12 md:col-span-7">
          <p class="eyebrow mb-4">Síguenos</p>
          <h2 class="display-lg font-display font-light leading-[0.95]">
            <span class="block">Únete a</span>
            <span class="block italic text-glam-rose-500">Mujeres GLAM.</span>
          </h2>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              :href="glamConfig.contact.instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="flex items-center gap-3 text-[11px] uppercase tracking-ultra text-glam-ink transition-colors hover:text-glam-rose-500"
            >
              <InstagramIcon class="h-5 w-5" />
              Instagram
            </a>
            <a
              :href="glamConfig.contact.tiktok"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              class="flex items-center gap-3 text-[11px] uppercase tracking-ultra text-glam-ink transition-colors hover:text-glam-rose-500"
            >
              <TikTokIcon class="h-5 w-5" />
              TikTok
            </a>
          </div>
        </div>
        <div class="col-span-12 flex justify-center md:col-span-5 md:justify-end">
          <div class="relative h-44 w-44 overflow-hidden rounded-full border border-glam-line/40 md:h-44 md:w-44">
            <img src="/hero/hero-secondary.jpg" alt="Mujeres GLAM — comunidad" class="h-full w-full object-cover" loading="lazy" decoding="async" />
            <div class="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/60" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>

    <!-- Marquee — editorial black con puntos rosa creativo -->
    <div class="relative overflow-hidden bg-glam-ink py-2 text-white md:py-3">
      <!-- sutil ruido editorial -->
      <div class="pointer-events-none absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(white 1px, transparent 1px); background-size: 22px 22px;" aria-hidden="true" />
      <EditorialMarquee :items="marqueeItems" :speed="22" variant="dark" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
    </div>

    <!-- Bottom info -->
    <div class="bg-glam-cream/50 py-16">
      <div class="container-editorial grid grid-cols-1 gap-12 md:grid-cols-12">
        <div class="md:col-span-4">
          <img src="/brand/logo.png" alt="GLAM" class="mb-6 h-12 w-auto" />
          <p class="max-w-xs text-sm text-glam-muted">
            Catálogo digital de maquillaje premium. Belleza con intención.
          </p>
        </div>

        <div class="md:col-span-3">
          <p class="eyebrow mb-4">Explora</p>
          <ul class="space-y-3 text-sm">
            <li><RouterLink to="/catalogo" class="link-underline">Catálogo</RouterLink></li>
            <li><RouterLink to="/colecciones" class="link-underline">Colecciones</RouterLink></li>
            <li><RouterLink to="/nosotros" class="link-underline">Nosotros</RouterLink></li>
            <li><RouterLink to="/contacto" class="link-underline">Contacto</RouterLink></li>
          </ul>
        </div>

        <div class="md:col-span-5">
          <p class="eyebrow mb-4">Conversemos</p>
          <a
            :href="`https://wa.me/${glamConfig.whatsapp.numberRaw}`"
            target="_blank"
            rel="noopener noreferrer"
            class="font-display text-3xl text-glam-ink transition-colors hover:text-glam-rose-500 md:text-4xl"
            data-cursor="hablar"
            data-cursor-label="Hablar"
            data-testid="footer-whatsapp"
          >
            {{ glamConfig.whatsapp.number }}
          </a>
          <p class="mt-3 text-[10px] uppercase tracking-ultra text-glam-muted">
            Respuesta personal · 24h
          </p>
        </div>
      </div>

      <div
        class="container-editorial mt-12 flex flex-col gap-2 border-t border-glam-line pt-8 text-[10px] uppercase tracking-ultra text-glam-muted md:flex-row md:items-center md:justify-between"
      >
        <p>© {{ year }} GLAM. Todos los derechos reservados.</p>
        <p>Belleza con intención.</p>
      </div>
    </div>
  </footer>
</template>