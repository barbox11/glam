<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProductById, getRelatedProducts, categories } from '@/data/products';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { trackWhatsAppClick } from '@/utils/analytics';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';
import ProductCard from '@/components/product/ProductCard.vue';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const router = useRouter();

const product = computed(() => getProductById(route.params.id as string));
const activeImage = ref(0);
const detailsRef = ref<HTMLElement | null>(null);

watch(
  () => route.params.id,
  () => {
    activeImage.value = 0;
    window.scrollTo({ top: 0, behavior: 'auto' });
  },
);

const related = computed(() => (product.value ? getRelatedProducts(product.value, 3) : []));
const categoryLabel = computed(() =>
  product.value ? categories.find((c) => c.id === product.value!.category)?.label : '',
);

const whatsappLink = computed(() =>
  product.value ? generateWhatsAppLink(product.value) : generateWhatsAppLink(),
);

const updateSeo = () => {
  if (!product.value) return;
  const title = `${product.value.name} — GLAM`;
  document.title = title;
  const desc = `${product.value.tagline} — ${product.value.description.slice(0, 140)}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', product.value.image);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://glam-3in.pages.dev/producto/${product.value.id}`);
};

watch(product, updateSeo, { immediate: true });

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

onMounted(() => {
  if (!product.value) {
    router.replace({ name: 'not-found' });
    return;
  }
  if (!detailsRef.value) return;
  if (prefersReducedMotion()) return;
  if (window.matchMedia('(max-width: 767px)').matches) return;
  gsap.from('.product-hero-img', {
    scale: 1.08,
    duration: 1,
    ease: 'power2.out',
  });
  gsap.from('.product-hero-line', {
    yPercent: 100,
    opacity: 0,
    duration: 0.7,
    stagger: 0.07,
    ease: 'power3.out',
    delay: 0.15,
  });
  gsap.from('.reveal', {
    scrollTrigger: { trigger: detailsRef.value, start: 'top 85%' },
    opacity: 0,
    y: 16,
    duration: 0.6,
    stagger: 0.06,
    ease: 'power3.out',
  });
});
</script>

<template>
  <div v-if="product" class="bg-glam-paper pt-24 md:pt-32">
    <!-- Breadcrumb -->
    <div class="container-editorial pb-8">
      <nav class="flex items-center gap-2 text-[10px] uppercase tracking-ultra text-glam-muted" aria-label="Migas">
        <RouterLink to="/" class="hover:text-glam-ink">Inicio</RouterLink>
        <span>/</span>
        <RouterLink to="/catalogo" class="hover:text-glam-ink">Catálogo</RouterLink>
        <span>/</span>
        <span class="text-glam-ink">{{ product.name }}</span>
      </nav>
    </div>

    <!-- Product hero -->
    <section ref="detailsRef" class="container-editorial pb-20">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <!-- Gallery -->
        <div class="lg:col-span-7">
          <div class="product-hero-img aspect-[4/5] overflow-hidden">
            <Transition
              mode="out-in"
              enter-active-class="transition-opacity duration-500"
              enter-from-class="opacity-0"
              leave-active-class="transition-opacity duration-300"
              leave-to-class="opacity-0"
            >
              <img
                :key="activeImage"
                :src="product.gallery[activeImage]"
                :alt="product.name"
                class="h-full w-full object-cover"
              />
            </Transition>
          </div>
          <div v-if="product.gallery.length > 1" class="mt-4 grid grid-cols-4 gap-3">
            <button
              v-for="(img, idx) in product.gallery"
              :key="idx"
              type="button"
              class="aspect-square overflow-hidden bg-glam-cream transition-opacity"
              :class="
                activeImage === idx
                  ? 'ring-2 ring-glam-rose-400 ring-offset-2 ring-offset-glam-white'
                  : 'opacity-60 hover:opacity-100'
              "
              :aria-label="`Imagen ${idx + 1} de ${product.name}`"
              @click="activeImage = idx"
            >
              <img :src="img" alt="" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Details -->
        <div class="flex flex-col lg:col-span-5">
          <p class="eyebrow mb-4">
            {{ categoryLabel }}<span v-if="product.collection"> · {{ product.collection }}</span>
          </p>
          <h1 class="display-md font-display font-light leading-[0.95] tracking-[-0.01em]">
            <span class="product-hero-line block overflow-hidden pb-1">
              <span class="block">{{ product.name }}</span>
            </span>
          </h1>
          <p class="mt-6 font-display text-2xl italic text-glam-rose-500">
            {{ product.tagline }}
          </p>
          <p v-if="product.price" class="mt-6 text-[11px] uppercase tracking-ultra text-glam-muted">
            {{ product.price }}
          </p>

          <div class="hairline my-10" />

          <p class="text-base leading-relaxed text-glam-ink/80">
            {{ product.description }}
          </p>

          <p v-if="product.notes" class="mt-6 text-sm text-glam-muted">
            <span class="text-[10px] uppercase tracking-ultra text-glam-ink">Notas · </span>{{ product.notes }}
          </p>
          <p v-if="product.ingredients" class="mt-2 text-sm text-glam-muted">
            <span class="text-[10px] uppercase tracking-ultra text-glam-ink">Ingredientes · </span>{{ product.ingredients }}
          </p>

          <div v-if="product.tones && product.tones.length" class="mt-10">
            <p class="eyebrow mb-4">Tonos disponibles</p>
            <div class="flex flex-wrap gap-4">
              <div
                v-for="tone in product.tones"
                :key="tone.name"
                class="flex flex-col items-center gap-2"
              >
                <span
                  class="h-10 w-10 rounded-full border border-glam-line"
                  :style="{ backgroundColor: tone.hex }"
                  :aria-label="`Tono ${tone.name}`"
                />
                <span class="text-[10px] uppercase tracking-ultra text-glam-muted">{{ tone.name }}</span>
              </div>
            </div>
          </div>

          <div class="mt-12 flex flex-col gap-3 sm:flex-row">
            <a
              :href="whatsappLink.url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-whatsapp flex-1"
              data-cursor="hablar"
              data-cursor-label="Hablar"
              data-testid="product-whatsapp"
              @click="trackWhatsAppClick({ source: 'product-detail', product: product?.name })"
            >
              <WhatsAppIcon class="h-5 w-5" />
              Consultar por WhatsApp
            </a>
            <RouterLink to="/catalogo" class="btn-secondary">
              <ArrowRight class="h-4 w-4 rotate-180" />
              Volver
            </RouterLink>
          </div>

          <p class="mt-6 text-[10px] uppercase tracking-ultra italic text-glam-muted">
            {{ whatsappLink.message.split('\n')[0] }} — responderemos personalmente.
          </p>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section v-if="related.length" class="border-t border-glam-line py-20">
      <div class="container-editorial">
        <p class="eyebrow mb-8">También te podría interesar</p>
        <div class="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard v-for="rp in related" :key="rp.id" :product="rp" />
        </div>
      </div>
    </section>
  </div>
</template>