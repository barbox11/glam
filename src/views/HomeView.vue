<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories } from '@/data/products';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';
import EditorialMarquee from '@/components/ui/EditorialMarquee.vue';
import ProductShowcase from '@/components/product/ProductShowcase.vue';
import CategoryGrid from '@/components/category/CategoryGrid.vue';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { trackWhatsAppClick } from '@/utils/analytics';

gsap.registerPlugin(ScrollTrigger);

const heroRef = ref<HTMLElement | null>(null);
const introRef = ref<HTMLElement | null>(null);

const collectionProducts = products.slice(0, 2);
const productSilkVeil = products.find((p) => p.id === 'silk-veil')!;
const { url: ctaUrl } = generateWhatsAppLink(undefined, { source: 'home-cta' });

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

onMounted(() => {
  const reduced = prefersReducedMotion();

  const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;

  if (heroRef.value && !reduced) {
    gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { y: 16, opacity: 0, duration: 0.6 }, 0.1)
        .from('.hero-meta', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(
          '.hero-title .split-line > span',
          { y: '110%', duration: 0.9, stagger: 0.08, ease: 'power4.out' },
          '-=0.3',
        )
        .from('.hero-cta', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4');
      // clipPath y scale solo en desktop para fluidez
      if (isDesktop()) {
        tl.from('.hero-image-mask', { clipPath: 'inset(100% 0 0 0)', duration: 1.1, ease: 'power4.out' }, '-=0.7')
          .from('.hero-image-inner', { scale: 1.15, duration: 1.4, ease: 'power2.out' }, '-=1.0');
      }
    }, heroRef.value);

    // parallax solo en desktop — en mobile se pega y consume GPU
    if (isDesktop()) {
      gsap.to('.hero-image-inner', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
      gsap.to('.hero-title', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }
  }

  if (introRef.value && !reduced && isDesktop()) {
    gsap.from('.intro-line', {
      scrollTrigger: { trigger: introRef.value, start: 'top 80%' },
      yPercent: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
    });
  }

  // (video removido — ahora es imagen estática powder-burst)
});

const marqueeItems = [
  'Eres hermosa',
  'GLAM',
  'Brilla sin miedo',
  'Tu luz es única',
  'Poderosa',
];
</script>

<template>
  <div>
    <!-- HERO — LIGHT EDITORIAL (según skill ui-ux-pro-max: warm white + soft pink, minimal, whitespace) -->
    <section
      ref="heroRef"
      class="relative overflow-hidden bg-[#FFFBF8] pt-20 md:pt-24"
      aria-label="Bienvenida a GLAM"
    >
      <!-- fondo editorial sutil: rosa muy suave como velo, no protagonista -->
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-glam-rose-50/60 via-transparent to-transparent" aria-hidden="true" />
      <div class="pointer-events-none absolute -top-32 right-[-15%] h-[520px] w-[520px] rounded-full bg-glam-rose-100/40 blur-[90px]" aria-hidden="true" />

      <div class="container-editorial relative flex items-center justify-between pt-4 text-[10px] uppercase tracking-ultra text-glam-muted md:text-xs">
        <span class="hero-eyebrow">Catálogo digital · 2026</span>
        <span class="hero-meta hidden md:inline">Belleza sin límites</span>
        <span class="hero-meta">{{ products.length }} piezas curadas</span>
      </div>

      <div class="container-editorial relative mt-8 grid grid-cols-12 gap-4 pb-14 md:mt-10 md:pb-28">
        <div
          class="hero-float absolute right-4 top-2 z-30 hidden rounded-full border border-glam-line/60 bg-white/70 px-4 py-2 text-[10px] uppercase tracking-ultra text-glam-muted backdrop-blur md:right-12 md:top-6 md:block"
        >
          Editorial
        </div>

        <h1 class="hero-title col-span-12 z-20 text-center md:text-left">
          <span class="block overflow-hidden pb-2">
            <span class="split-line block font-display text-[clamp(3rem,11vw,10rem)] font-light leading-[0.9] tracking-[-0.02em] text-glam-ink">
              Belleza
            </span>
          </span>
          <span class="block overflow-hidden pb-2">
            <span class="split-line block font-display text-[clamp(3rem,11vw,10rem)] font-light italic leading-[0.9] tracking-[-0.02em] text-glam-rose-500">
              sin
            </span>
          </span>
          <span class="block overflow-hidden pb-2">
            <span class="split-line block font-display text-[clamp(3rem,11vw,10rem)] font-light leading-[0.9] tracking-[-0.02em] text-glam-ink">
              límites.
            </span>
          </span>
        </h1>

        <div
          class="hero-image-mask col-span-12 relative z-10 -mx-5 mt-6 aspect-[4/5] w-[calc(100%+2.5rem)] overflow-hidden border-y border-glam-line/30 bg-white md:mx-0 md:mt-8 md:aspect-[4/5] md:w-full md:rounded-[20px] md:border md:shadow-[0_24px_64px_-32px_rgba(15,15,18,0.18)] lg:absolute lg:right-[5%] lg:top-1/2 lg:mt-0 lg:h-[66vh] lg:w-[50vw] lg:max-w-[620px] lg:-translate-y-1/2"
          style="clip-path: inset(0 0 0 0)"
        >
          <div class="hero-image-inner relative h-full w-full">
            <img
              src="/hero/hero-main.jpg"
              alt="GLAM — Belleza sin límites"
              class="h-full w-full object-cover object-[center_20%]"
              fetchpriority="high"
              decoding="async"
            />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent lg:hidden" />
          </div>
        </div>

        <div class="hero-cta col-span-12 z-30 mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start lg:absolute lg:bottom-8 lg:left-8 lg:mt-0">
          <RouterLink
            to="/catalogo"
            class="btn-primary"
            data-cursor="explorar"
          >
            Explorar GLAM
            <ArrowRight class="h-4 w-4" />
          </RouterLink>
          <a
            :href="ctaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-whatsapp"
            data-cursor="hablar"
            data-cursor-label="Hablar"
            data-testid="hero-whatsapp"
            @click="trackWhatsAppClick({ source: 'hero' })"
          >
            <WhatsAppIcon class="h-4 w-4" />
            Hablar por WhatsApp
          </a>
        </div>

        <div
          class="hero-float absolute bottom-8 right-4 z-30 hidden items-center gap-2 text-[10px] uppercase tracking-ultra text-glam-muted md:right-10 md:flex"
        >
          <span class="h-px w-8 bg-glam-line" aria-hidden="true" />
          Desliza
        </div>


      </div>

      <div class="border-y border-glam-line/40 bg-white/60 py-2 backdrop-blur">
        <EditorialMarquee :items="marqueeItems" :speed="35" variant="light" />
      </div>
    </section>

    <!-- MANIFIESTO — con imagen real 2 -->
    <section ref="introRef" class="relative bg-glam-white py-20 md:py-28">
      <div class="container-editorial grid grid-cols-12 items-center gap-8 md:gap-12">
        <div class="col-span-12 md:col-span-6">
          <div class="aspect-[4/5] overflow-hidden rounded-[20px] border border-glam-line/50">
            <img src="/hero/hero-secondary.jpg" alt="Ritual GLAM — maquillaje con intención" class="h-full w-full object-cover" loading="lazy" decoding="async" />
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <p class="eyebrow mb-4">Manifiesto</p>
          <h2 class="display-lg font-display font-light leading-[0.95]">
            <span class="intro-line block overflow-hidden pb-2">
              <span class="block">GLAM no es una tienda.</span>
            </span>
            <span class="intro-line block overflow-hidden pb-2">
              <span class="block italic text-glam-rose-500">Es una conversación.</span>
            </span>
          </h2>
          <p class="mt-6 max-w-md text-sm leading-relaxed text-glam-muted md:text-base">
            Cada producto que ves aquí fue elegido por su carácter. No se trata de cantidad, sino de intención.
            Belleza con atención. Si algo te enamora, hablamos. Si no, está bien también.
          </p>
        </div>
      </div>
    </section>

    <!-- RITUAL — imagen 8 (polvo rosa) reemplaza video pesado -->
    <section class="relative overflow-hidden bg-black" aria-label="Ritual GLAM">
      <img src="/hero/powder-burst.jpg" alt="Ritual GLAM — polvo rosa en explosión" class="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" decoding="async" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:from-black/50 md:via-black/15" aria-hidden="true" />
      <div class="container-editorial relative flex min-h-[60vh] items-center justify-center pb-10 text-center md:min-h-[68vh] md:items-end md:justify-start md:pb-14 md:text-left">
        <div class="max-w-xl text-white">
          <p class="eyebrow !text-white/70 mb-3">El ritual</p>
          <h2 class="font-display text-3xl font-light leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] md:text-5xl">
            Presencia,<br /><span class="italic text-glam-rose-200">antes que producto.</span>
          </h2>
        </div>
      </div>
    </section>

    <CategoryGrid :categories="categories" />
    <ProductShowcase :products="collectionProducts" />

    <!-- EDITORIAL BW — reemplaza collage saturado por imagen elegante minimal -->
    <section class="bg-glam-white pt-8 md:pt-12 pb-20 md:pb-28" aria-label="Detrás del ritual">
      <div class="container-editorial">
        <div class="relative overflow-hidden rounded-[24px] border border-glam-line/40">
          <img src="/hero/editorial-bw.jpg" alt="Detrás del ritual — editorial en blanco y negro" class="h-[52vh] w-full object-cover object-[center_20%] md:h-[56vh] md:object-[center_28%] grayscale" loading="lazy" decoding="async" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" aria-hidden="true" />
          <div class="absolute inset-0 flex items-end p-6 md:p-10">
            <div class="max-w-md text-white">
              <p class="eyebrow !text-white/70 mb-3">Detrás del ritual</p>
              <h3 class="font-display text-3xl font-light leading-tight md:text-5xl">
                Cada trazo,<br /><span class="italic text-glam-rose-200">una intención.</span>
              </h3>
              <p class="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
                El espejo, las brochas, la luz. El momento antes del color es parte del color.
              </p>
              <div class="mt-6 flex flex-wrap items-center gap-3">
                <RouterLink
                  :to="`/producto/${productSilkVeil.id}`"
                  class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-ultra text-glam-ink transition-colors hover:bg-glam-rose-50"
                  data-cursor="ver"
                  data-cursor-label="Ver"
                >
                  Ver producto
                  <ArrowRight class="h-4 w-4" />
                </RouterLink>
                <a
                  :href="generateWhatsAppLink(productSilkVeil).url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[11px] font-medium uppercase tracking-ultra text-white transition-colors hover:bg-[#1DAE53]"
                  data-cursor="hablar"
                  data-cursor-label="Hablar"
                  @click="trackWhatsAppClick({ source: 'home-editorial', product: productSilkVeil.name })"
                >
                  <WhatsAppIcon class="h-4 w-4" />
                  Consultar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA WHATSAPP — compacto -->
    <section class="relative overflow-hidden bg-glam-ink py-20 text-white md:py-28">
      <div class="container-editorial relative z-10 text-center">
        <p class="eyebrow !text-glam-rose-300 mb-6">Conversemos</p>
        <h2 class="display-lg font-display font-light leading-[0.95]">
          ¿Encontraste algo<br />
          <span class="italic text-glam-rose-300">que te gustó?</span>
        </h2>
        <p class="mx-auto mt-8 max-w-md text-base text-white/70 md:text-lg">
          Estamos a un mensaje de distancia. Cuéntanos qué producto te interesa y te respondemos
          personalmente.
        </p>
        <a
          :href="ctaUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-whatsapp mx-auto mt-12 !bg-white !text-glam-ink hover:!bg-glam-rose-100"
          data-cursor="hablar"
          data-cursor-label="Hablar"
          data-testid="home-cta-whatsapp"
          @click="trackWhatsAppClick({ source: 'home-cta' })"
        >
          <WhatsAppIcon class="h-5 w-5" />
          Hablar por WhatsApp
        </a>
        <p class="mt-6 text-[10px] uppercase tracking-ultra text-white/50">
          Respuesta personal · 24h
        </p>
      </div>
    </section>
  </div>
</template>