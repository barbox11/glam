<script setup lang="ts">
import { glamConfig } from '@/config/glam.config';
</script>

<template>
  <div class="pt-28 md:pt-36">
    <section class="container-editorial pb-24">
      <p class="eyebrow mb-4">Sobre nosotras</p>
      <h1 class="font-display text-5xl font-light leading-[1.05] md:text-7xl">
        GLAM es<br />
        <span class="italic text-glam-rose-500">una forma de mirar.</span>
      </h1>

      <div class="mt-16 grid gap-12 md:grid-cols-12">
        <div class="md:col-span-5">
          <p class="text-base leading-relaxed text-glam-ink/80 md:text-lg">
            Somos un catálogo digital de maquillaje. No una tienda, no un marketplace. Un lugar donde
            seleccionar, mirar y conversar.
          </p>
        </div>
        <div class="md:col-span-6 md:col-start-7">
          <p class="text-base leading-relaxed text-glam-muted md:text-lg">
            Cada producto que ves aquí fue elegido por su carácter. No se trata de cantidad, sino de
            intención. Belleza con atención.
          </p>
          <p class="mt-6 text-base leading-relaxed text-glam-muted md:text-lg">
            Si algo te enamora, hablamos. Si no, está bien también. Te acompañamos con respeto y sin
            presión.
          </p>

          <dl class="mt-12 grid grid-cols-2 gap-8 border-t border-glam-line pt-8">
            <div>
              <dt class="eyebrow mb-2">Filosofía</dt>
              <dd class="font-display text-xl">Curaduría consciente</dd>
            </div>
            <div>
              <dt class="eyebrow mb-2">Compromiso</dt>
              <dd class="font-display text-xl">Conversación real</dd>
            </div>
            <div>
              <dt class="eyebrow mb-2">Origen</dt>
              <dd class="font-display text-xl">Colombia</dd>
            </div>
            <div>
              <dt class="eyebrow mb-2">Visión</dt>
              <dd class="font-display text-xl">Belleza con intención</dd>
            </div>
          </dl>

          <p class="mt-12 text-sm italic text-glam-muted">— {{ glamConfig.brand.tagline }}</p>
        </div>
      </div>
    </section>
  </div>
</template>