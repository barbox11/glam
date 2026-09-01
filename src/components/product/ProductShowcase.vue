<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import gsap from 'gsap';
import type { Product } from '@/data/products';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';

const props = defineProps<{ products: Product[] }>();
const sectionRef = ref<HTMLElement | null>(null);

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

onMounted(() => {
  if (!sectionRef.value || reduced()) return;
  const blocks = sectionRef.value.querySelectorAll('.showcase-block');
  blocks.forEach((block) => {
    const img = block.querySelector('.showcase-image');
    const text = block.querySelector('.showcase-text');
    if (img) {
      gsap.fromTo(
        img,
        { y: 80, opacity: 0.4 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          },
        },
      );
    }
    if (text) {
      gsap.from(text.querySelectorAll('.split-line > span'), {
        scrollTrigger: { trigger: block, start: 'top 70%' },
        y: '110%',
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      });
    }
  });
});

const layoutFor = (i: number) => {
  // Vary the composition per product
  const layouts = [
    'image-right', // 0: image right, text left
    'image-left', // 1: image left, text right
    'image-full', // 2: full bleed image, text overlay
    'image-floating', // 3: floating image with text alongside
  ];
  return layouts[i % layouts.length];
};
</script>

<template>
  <section ref="sectionRef" class="bg-glam-paper pt-20 md:pt-28 pb-10 md:pb-14" aria-label="La Colección GLAM">
    <div class="container-editorial mb-20 md:mb-32">
      <div class="grid grid-cols-12 gap-y-6">
        <div class="col-span-12 md:col-span-7">
          <p class="eyebrow mb-4">La Colección GLAM</p>
          <h2 class="display-lg font-display font-light leading-[0.95]">
            Cada producto,<br />
            <span class="italic text-glam-rose-500">una pequeña campaña.</span>
          </h2>
        </div>
        <div class="col-span-12 md:col-span-4 md:col-start-9 md:self-end">
          <p class="text-sm leading-relaxed text-glam-muted">
            Cuatro piezas curadas. Cada una con su composición, su tono, su historia. Descúbrelas una a una.
          </p>
        </div>
      </div>
    </div>

    <div class="space-y-20 md:space-y-28">
      <article
        v-for="(product, i) in props.products"
        :key="product.id"
        class="showcase-block relative"
        :class="{
          'bg-glam-cream': layoutFor(i) === 'image-full',
        }"
      >
        <!-- IMAGE-RIGHT layout -->
        <div
          v-if="layoutFor(i) === 'image-right'"
          class="container-editorial grid grid-cols-12 items-center gap-8 md:gap-12"
        >
          <div class="showcase-text col-span-12 md:col-span-5">
            <p class="eyebrow mb-4">
              {{ product.id.toUpperCase() }}
            </p>
            <h3 class="display-md font-display font-light leading-[1.05]">
              <span class="split-line block overflow-hidden pb-1">
                <span class="block">{{ product.name }}</span>
              </span>
            </h3>
            <p class="mt-6 font-display text-xl italic text-glam-rose-500">
              {{ product.tagline }}
            </p>
            <p class="mt-6 max-w-md text-sm leading-relaxed text-glam-muted">
              {{ product.description }}
            </p>
            <div class="mt-10 flex items-center gap-4">
              <RouterLink
                :to="`/producto/${product.id}`"
                class="btn-secondary"
                data-cursor="ver"
                data-cursor-label="Ver"
              >
                Ver producto
                <ArrowRight class="h-4 w-4" />
              </RouterLink>
              <a
                :href="generateWhatsAppLink(product).url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[11px] uppercase tracking-ultra text-glam-ink/70 transition-colors hover:text-glam-rose-500"
                data-cursor="hablar"
                data-cursor-label="Hablar"
              >
                Consultar
              </a>
            </div>
          </div>
          <div class="showcase-image col-span-12 md:col-span-7">
            <div class="aspect-[4/5] overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-[1400ms] ease-elegant hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        <!-- IMAGE-LEFT layout -->
        <div
          v-else-if="layoutFor(i) === 'image-left'"
          class="container-editorial grid grid-cols-12 items-center gap-8 md:gap-12"
        >
          <div class="showcase-image col-span-12 md:col-span-7 md:order-1">
            <div class="aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <img
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-[1400ms] ease-elegant hover:scale-[1.03]"
              />
            </div>
          </div>
          <div class="showcase-text col-span-12 md:col-span-4 md:col-start-9 md:order-2">
            <h3 class="display-md font-display font-light leading-[1.05]">
              <span class="split-line block overflow-hidden pb-1">
                <span class="block">{{ product.name }}</span>
              </span>
            </h3>
            <p class="mt-6 font-display text-xl italic text-glam-rose-500">
              {{ product.tagline }}
            </p>
            <p class="mt-6 max-w-md text-sm leading-relaxed text-glam-muted">
              {{ product.description }}
            </p>
            <RouterLink
              :to="`/producto/${product.id}`"
              class="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-ultra text-glam-ink transition-colors hover:text-glam-rose-500"
data-cursor="ver"
                data-cursor-label="Ver"
            >
              Explorar producto
              <ArrowRight class="h-4 w-4" />
            </RouterLink>
          </div>
        </div>

        <!-- IMAGE-FULL layout -->
        <div v-else-if="layoutFor(i) === 'image-full'" class="relative h-[62vh] w-full overflow-hidden md:h-[68vh]">
          <img
            :src="product.image"
            :alt="product.name"
            loading="lazy"
            class="showcase-image absolute inset-0 h-full w-full object-cover object-[center_30%]"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/5" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent hidden md:block" aria-hidden="true" />
          <!-- ghost typo detrás -->
          <div class="pointer-events-none absolute inset-0 hidden items-center justify-center overflow-hidden opacity-[0.045] md:flex" aria-hidden="true">
            <span class="font-display text-[22vw] font-light leading-none tracking-tighter text-white select-none">{{ product.name.split(' ')[0] }}</span>
          </div>
          <div class="showcase-text container-editorial absolute inset-0 flex flex-col justify-center py-12">
            <p class="eyebrow !text-glam-rose-200 mb-3 tracking-[0.18em]">
              {{ product.id.toUpperCase() }}
            </p>
            <h3 class="display-lg font-display font-light leading-[0.9] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
              <span class="split-line block overflow-hidden pb-1">
                <span class="block">{{ product.name }}</span>
              </span>
            </h3>
            <p class="mt-3 font-display text-lg italic text-white/80 md:text-xl">{{ product.tagline }}</p>
            <div class="mt-8 flex flex-wrap items-center gap-4">
              <RouterLink
                :to="`/producto/${product.id}`"
                class="btn-primary !bg-white !text-glam-ink hover:!bg-glam-rose-100"
                data-cursor="ver"
                data-cursor-label="Ver"
              >
                Ver producto
                <ArrowRight class="h-4 w-4" />
              </RouterLink>
              <a
                :href="generateWhatsAppLink(product).url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-whatsapp"
                data-cursor="hablar"
                data-cursor-label="Hablar"
              >
                <WhatsAppIcon class="h-4 w-4" />
                Consultar
              </a>
            </div>
          </div>
        </div>

        <!-- IMAGE-FLOATING layout -->
        <div
          v-else
          class="container-editorial relative grid grid-cols-12 items-center gap-8 py-12"
        >
          <div class="col-span-12 md:col-span-6">
            <h3 class="display-xl font-display font-light leading-[0.92] tracking-[-0.02em]">
              <span class="split-line block overflow-hidden pb-2">
                <span class="block">{{ product.name }}</span>
              </span>
            </h3>
            <p class="mt-6 max-w-md font-display text-2xl italic text-glam-rose-500">
              {{ product.tagline }}
            </p>
            <p class="mt-6 max-w-md text-sm leading-relaxed text-glam-muted">
              {{ product.description }}
            </p>
          </div>
          <div class="showcase-image col-span-12 md:col-span-6">
            <div
              class="ml-auto aspect-square w-full max-w-md overflow-hidden shadow-2xl shadow-glam-rose-200/50 md:-translate-y-12"
            >
              <img
                :src="product.image"
                :alt="product.name"
                loading="lazy"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>