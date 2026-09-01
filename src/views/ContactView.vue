<script setup lang="ts">
import { glamConfig } from '@/config/glam.config';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { trackWhatsAppClick } from '@/utils/analytics';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue';

const { url, message } = generateWhatsAppLink(undefined, { source: 'contact-page' });
</script>

<template>
  <div class="pt-28 md:pt-36">
    <section class="container-editorial pb-24">
      <p class="eyebrow mb-4">Contacto</p>
      <h1 class="font-display text-5xl font-light leading-[1.05] md:text-7xl">
        Conversemos<br />
        <span class="italic text-glam-rose-500">directamente.</span>
      </h1>

      <div class="mt-16 grid gap-12 md:grid-cols-12">
        <div class="md:col-span-5">
          <p class="text-base leading-relaxed text-glam-ink/80 md:text-lg">
            La forma más rápida de hablar con nosotras es por WhatsApp. Respondemos personalmente —
            sin bots, sin esperas largas.
          </p>

          <div class="mt-10 space-y-6">
            <div>
              <p class="eyebrow mb-2">WhatsApp</p>
              <a
                :href="url"
                target="_blank"
                rel="noopener noreferrer"
                class="font-display text-2xl text-glam-ink hover:text-glam-rose-500 md:text-3xl"
                data-testid="contact-whatsapp"
                @click="trackWhatsAppClick({ source: 'contact-page' })"
              >
                {{ glamConfig.whatsapp.number }}
              </a>
            </div>
            <div>
              <p class="eyebrow mb-2">Mensaje</p>
              <p class="text-sm italic text-glam-muted">{{ message.split('\n')[0] }}</p>
            </div>
          </div>

          <a
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-whatsapp mt-10"
            @click="trackWhatsAppClick({ source: 'contact-page-cta' })"
          >
            <WhatsAppIcon class="h-5 w-5" />
            Abrir WhatsApp
          </a>
        </div>

        <div class="md:col-span-6 md:col-start-7">
          <div class="aspect-[4/5] overflow-hidden bg-glam-cream">
            <img
              src="/products/lumiere-rose-2.svg"
              alt="Editorial GLAM"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>