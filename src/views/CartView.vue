<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useCart } from '@/composables/useCart';
import { generateWhatsAppCartLink } from '@/utils/whatsapp';
import { trackWhatsAppClick } from '@/utils/analytics';
import CartLineItem from '@/components/cart/CartLineItem.vue';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue';
import ArrowRight from '@/components/icons/ArrowRight.vue';

const { lines, count, total, isEmpty, clear } = useCart();

const whatsappLink = computed(() => {
  const items = lines.value.map((l) => ({
    id: l.product.id,
    name: l.product.name,
    quantity: l.quantity,
    toneName: l.tone?.name,
    price: l.product.price,
  }));
  return generateWhatsAppCartLink(items, { source: 'cart-page' });
});

function formatTotal(n: number) {
  return `$${n.toLocaleString('es-CO')} COP`;
}
</script>

<template>
  <div class="pt-28 md:pt-36">
    <section class="container-editorial pb-12">
      <p class="eyebrow mb-4">Carrito</p>
      <h1 class="font-display text-5xl font-light leading-[1.05] md:text-7xl">
        Tu <span class="italic text-glam-rose-500">selección.</span>
      </h1>
      <p class="mt-6 max-w-xl text-base text-glam-muted md:text-lg">
        Revisa tus piezas. El pedido se envía por WhatsApp — sin pagos en la web, conversamos directo.
      </p>
      <p class="mt-4 text-[10px] uppercase tracking-ultra text-glam-muted" data-testid="cart-count">{{ count }} {{ count===1?'pieza':'piezas' }} · Total estimado {{ formatTotal(total) }}</p>
    </section>

    <section v-if="isEmpty" class="container-editorial pb-24 text-center">
      <div class="mx-auto max-w-md rounded-[20px] border border-glam-line bg-white px-8 py-16">
        <p class="font-display text-2xl italic text-glam-muted">Tu carrito está vacío</p>
        <p class="mt-3 text-sm text-glam-muted">Explora el catálogo y añade las piezas que te enamoren.</p>
        <RouterLink to="/catalogo" class="btn-primary mt-8 inline-flex" data-testid="empty-go-catalog">
          Ir al catálogo
          <ArrowRight class="h-4 w-4" />
        </RouterLink>
      </div>
    </section>

    <section v-else class="container-editorial pb-24">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <div class="divide-y divide-glam-line border-y border-glam-line bg-white px-6">
            <CartLineItem v-for="line in lines" :key="`${line.productId}-${line.tone?.name||'default'}`" :line="line" />
          </div>
          <div class="mt-6 flex flex-wrap gap-3">
            <button type="button" class="btn-ghost rounded-full border border-glam-line px-6 py-3" data-testid="cart-clear-page" @click="clear">Vaciar carrito</button>
            <RouterLink to="/catalogo" class="btn-secondary">Seguir comprando</RouterLink>
          </div>
        </div>

        <div class="lg:col-span-4">
          <div class="sticky top-28 rounded-[20px] border border-glam-line bg-glam-paper p-6">
            <h2 class="font-display text-xl">Resumen</h2>
            <div class="mt-6 space-y-3 text-sm">
              <div class="flex justify-between"><span class="text-glam-muted">Piezas</span><span>{{ count }}</span></div>
              <div class="flex justify-between font-medium"><span>Total estimado</span><span data-testid="cart-total-page">{{ formatTotal(total) }}</span></div>
            </div>
            <p class="mt-4 text-xs leading-relaxed text-glam-muted">Precio referencial. Te confirmamos por WhatsApp disponibilidad, envío y forma de pago.</p>
            <a
              :href="whatsappLink.url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-whatsapp mt-6 w-full"
              data-testid="cart-whatsapp-page"
              @click="trackWhatsAppClick({ source: 'cart-page', product: `cart:${count}-items` })"
            >
              <WhatsAppIcon class="h-5 w-5" />
              Enviar pedido por WhatsApp
            </a>
            <p class="mt-3 text-center text-[10px] uppercase tracking-ultra text-glam-muted">Respuesta personal · 24h</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
