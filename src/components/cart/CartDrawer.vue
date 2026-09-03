<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useCart } from '@/composables/useCart';
import { generateWhatsAppCartLink } from '@/utils/whatsapp';
import { trackWhatsAppClick } from '@/utils/analytics';
import { useLenis } from '@/composables/useLenis';
import CartLineItem from './CartLineItem.vue';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue';

const isOpen = ref(false);
const drawerRef = ref<HTMLElement | null>(null);

const { lines, count, total, isEmpty, clear } = useCart();
const { stop: stopLenis, start: startLenis } = useLenis();

function open() {
  isOpen.value = true;
}
function close() {
  isOpen.value = false;
}

defineExpose({ open, close, isOpen });

const whatsappLink = computed(() => {
  const items = lines.value.map((l) => ({
    id: l.product.id,
    name: l.product.name,
    quantity: l.quantity,
    toneName: l.tone?.name,
    price: l.product.price,
  }));
  return generateWhatsAppCartLink(items, { source: 'cart-drawer' });
});

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close();
}

watch(isOpen, (open) => {
  if (open) {
    stopLenis();
    // solo body, no html — evita reflow doble en PC (html.lenis ya gestiona)
    document.body.style.overflow = 'hidden';
    const main = document.getElementById('main-content');
    if (main) main.setAttribute('inert', '');
    // pausa cursor custom para liberar RAF en PC
    window.dispatchEvent(new CustomEvent('glam:cursor-pause'));
    requestAnimationFrame(() => drawerRef.value?.focus());
  } else {
    document.body.style.overflow = '';
    const main = document.getElementById('main-content');
    if (main) main.removeAttribute('inert');
    window.dispatchEvent(new CustomEvent('glam:cursor-resume'));
    startLenis();
  }
});

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey);
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
});

// global event to open drawer from anywhere
onMounted(() => {
  const handler = () => open();
  window.addEventListener('glam:open-cart', handler);
  onBeforeUnmount(() => window.removeEventListener('glam:open-cart', handler));
});

function formatTotal(n: number) {
  return `$${n.toLocaleString('es-CO')} COP`;
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      leave-active-class="transition-opacity duration-150 ease-out"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[70] bg-glam-ink/50"
        style="overscroll-behavior: contain"
        aria-hidden="true"
        @click="close"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
      leave-active-class="transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="isOpen"
        ref="drawerRef"
        tabindex="-1"
        class="fixed inset-y-0 right-0 z-[71] flex w-full max-w-[420px] flex-col bg-glam-white shadow-2xl outline-none transform-gpu"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        data-testid="cart-drawer"
        data-lenis-prevent
        style="will-change: transform; overscroll-behavior: contain"
      >
        <div class="flex items-center justify-between border-b border-glam-line px-6 py-5">
          <h2 class="font-display text-xl">Carrito <span class="text-glam-muted">· {{ count }} {{ count===1?'pieza':'piezas' }}</span></h2>
          <button
            type="button"
            class="rounded-full p-2 transition-colors hover:bg-glam-line/40 focus-visible:ring-2 focus-visible:ring-glam-rose-400"
            aria-label="Cerrar carrito"
            data-testid="cart-close"
            @click="close"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="isEmpty" class="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
          <p class="font-display text-2xl font-light italic text-glam-muted">Tu carrito está vacío</p>
          <p class="mt-3 max-w-xs text-sm text-glam-muted">Añade piezas desde el catálogo. El pedido se enviará por WhatsApp.</p>
          <RouterLink to="/catalogo" class="btn-primary mt-8" @click="close">Explorar catálogo</RouterLink>
        </div>

        <div v-else class="flex flex-1 flex-col overflow-hidden">
          <div
            class="flex-1 overflow-y-auto px-6"
            style="overscroll-behavior: contain; -webkit-overflow-scrolling: touch; contain: content;"
            aria-live="polite"
          >
            <CartLineItem v-for="line in lines" :key="`${line.productId}-${line.tone?.name||'default'}`" :line="line" />
          </div>

          <div class="border-t border-glam-line bg-glam-paper px-6 py-6">
            <div class="flex items-center justify-between text-sm">
              <span class="uppercase tracking-ultra text-glam-muted">Subtotal estimado</span>
              <span class="font-medium" data-testid="cart-total">{{ formatTotal(total) }}</span>
            </div>
            <p class="mt-2 text-[11px] leading-relaxed text-glam-muted">Precio referencial. Confirmamos disponibilidad y envío por WhatsApp.</p>

            <a
              :href="whatsappLink.url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-whatsapp mt-6 w-full"
              data-testid="cart-whatsapp"
              @click="trackWhatsAppClick({ source: 'cart-drawer', product: `cart:${count}-items` })"
            >
              <WhatsAppIcon class="h-5 w-5" />
              Enviar pedido por WhatsApp
            </a>

            <div class="mt-3 grid grid-cols-2 gap-3">
              <RouterLink to="/carrito" class="btn-secondary w-full text-center" data-testid="cart-go-page" @click="close">Ver carrito</RouterLink>
              <button type="button" class="btn-ghost justify-center rounded-full border border-glam-line py-3" data-testid="cart-clear" @click="clear">Vaciar</button>
            </div>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
