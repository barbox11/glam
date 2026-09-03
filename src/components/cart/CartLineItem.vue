<script setup lang="ts">
import type { CartLine } from '@/composables/useCart';
import { useCart } from '@/composables/useCart';

defineProps<{ line: CartLine }>();

const { updateQuantity, remove } = useCart();

function dec(line: CartLine) {
  updateQuantity(line.productId, line.tone, line.quantity - 1);
}
function inc(line: CartLine) {
  updateQuantity(line.productId, line.tone, line.quantity + 1);
}
</script>

<template>
  <div class="flex gap-4 py-5" data-testid="cart-line">
    <div class="h-20 w-20 shrink-0 overflow-hidden bg-glam-cream">
      <img
        :src="line.product.image"
        :alt="line.product.name"
        class="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        width="80"
        height="80"
        fetchpriority="low"
      />
    </div>
    <div class="flex flex-1 flex-col">
      <div class="flex items-start justify-between gap-2">
        <div>
          <p class="font-display text-[15px] leading-tight">{{ line.product.name }}</p>
          <p v-if="line.tone" class="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-ultra text-glam-muted">
            <span class="inline-block h-3 w-3 rounded-full border border-glam-line" :style="{ backgroundColor: line.tone.hex }" aria-hidden="true" />
            {{ line.tone.name }}
          </p>
          <p v-if="line.product.price" class="mt-1 text-xs text-glam-muted">{{ line.product.price }} c/u</p>
        </div>
        <button
          type="button"
          class="rounded-full p-2 text-glam-muted transition-colors hover:bg-glam-line/40 hover:text-glam-ink focus-visible:ring-2 focus-visible:ring-glam-rose-400"
          :aria-label="`Eliminar ${line.product.name}${line.tone ? ' tono ' + line.tone.name : ''} del carrito`"
          data-testid="cart-remove"
          @click="remove(line.productId, line.tone)"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M6 7h12M9 7V5h6v2M8 7l1 10h6l1-10" />
          </svg>
        </button>
      </div>
      <div class="mt-3 flex items-center gap-3">
        <div class="flex items-center gap-1 rounded-full border border-glam-line p-1">
          <button
            type="button"
            class="flex h-7 w-7 items-center justify-center rounded-full text-glam-ink transition-colors hover:bg-glam-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-glam-ink"
            :disabled="line.quantity <= 1"
            :aria-label="`Reducir cantidad de ${line.product.name}`"
            data-testid="cart-dec"
            @click="dec(line)"
          >
            <span aria-hidden="true">−</span>
          </button>
          <span class="min-w-[36px] text-center text-sm font-medium" :aria-label="`Cantidad ${line.quantity}`" data-testid="cart-qty">{{ line.quantity }}</span>
          <button
            type="button"
            class="flex h-7 w-7 items-center justify-center rounded-full text-glam-ink transition-colors hover:bg-glam-ink hover:text-white disabled:opacity-30"
            :disabled="line.quantity >= 99"
            :aria-label="`Aumentar cantidad de ${line.product.name}`"
            data-testid="cart-inc"
            @click="inc(line)"
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
        <span class="text-xs uppercase tracking-ultra text-glam-muted">máx 99</span>
      </div>
    </div>
  </div>
</template>
