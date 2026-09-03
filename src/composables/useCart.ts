import { computed, ref, watch } from 'vue';
import { getProductById, type Product, type ProductTone } from '@/data/products';

export interface CartItem {
  productId: string;
  quantity: number;
  tone?: ProductTone;
}

export interface CartLine extends CartItem {
  product: Product;
}

const STORAGE_KEY = 'glam_cart_v1';
const MAX_QTY = 99;
const MIN_QTY = 1;

const cart = ref<CartItem[]>([]);
let hydrated = false;
let persistEnabled = false;

function sameLine(a: CartItem, b: CartItem) {
  return a.productId === b.productId && (a.tone?.name ?? '__default') === (b.tone?.name ?? '__default');
}

function clampQty(n: number) {
  return Math.min(MAX_QTY, Math.max(MIN_QTY, Math.round(n)));
}

function hydrate() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) {
        cart.value = parsed
          .filter((i) => i && typeof i.productId === 'string' && typeof i.quantity === 'number')
          .map((i) => ({ productId: i.productId, quantity: clampQty(i.quantity), tone: i.tone }))
          .filter((i) => !!getProductById(i.productId));
      }
    }
  } catch (_e) {
    void _e;
  }
  // persist after hydrate
  persistEnabled = true;
  watch(
    cart,
    (val) => {
      if (!persistEnabled) return;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
      } catch (_e) {
        void _e;
      }
    },
    { deep: true },
  );
}

export function parsePrice(price?: string): number {
  if (!price) return 0;
  // "Desde $89.000 COP" -> 89000, "$120.000" -> 120000, "$98,000" -> 98000
  const m = price.match(/[\d.,]+/);
  if (!m) return 0;
  const digits = m[0].replace(/[.,]/g, '');
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
}

export function useCart() {
  hydrate();

  const lines = computed<CartLine[]>(() =>
    cart.value
      .map((item) => {
        const product = getProductById(item.productId);
        return product ? { ...item, product } : null;
      })
      .filter(Boolean) as CartLine[],
  );

  const count = computed(() => cart.value.reduce((acc, i) => acc + i.quantity, 0));

  const total = computed(() =>
    lines.value.reduce((acc, l) => acc + parsePrice(l.product.price) * l.quantity, 0),
  );

  const isEmpty = computed(() => cart.value.length === 0);

  function add(productId: string, tone?: ProductTone, quantity = 1) {
    hydrate();
    const product = getProductById(productId);
    if (!product) return;
    // validate tone belongs to product if provided
    let validTone = tone;
    if (tone && product.tones && !product.tones.some((t) => t.name === tone.name && t.hex === tone.hex)) {
      validTone = undefined;
    }
    if (tone && !product.tones?.length) validTone = undefined;
    const item: CartItem = { productId, tone: validTone, quantity: clampQty(quantity) };
    const existing = cart.value.find((c) => sameLine(c, item));
    if (existing) {
      existing.quantity = clampQty(existing.quantity + item.quantity);
    } else {
      cart.value.push(item);
    }
  }

  function remove(productId: string, tone?: ProductTone) {
    hydrate();
    const idx = cart.value.findIndex((c) => sameLine(c, { productId, quantity: 1, tone }));
    if (idx !== -1) cart.value.splice(idx, 1);
  }

  function updateQuantity(productId: string, tone: ProductTone | undefined, quantity: number) {
    hydrate();
    const line = cart.value.find((c) => sameLine(c, { productId, quantity: 1, tone }));
    if (!line) return;
    if (quantity <= 0) {
      remove(productId, tone);
      return;
    }
    line.quantity = clampQty(quantity);
  }

  function clear() {
    hydrate();
    cart.value = [];
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (_e) {
      void _e;
    }
  }

  function getQuantity(productId: string, tone?: ProductTone) {
    const line = cart.value.find((c) => sameLine(c, { productId, quantity: 1, tone }));
    return line?.quantity ?? 0;
  }

  // for tests: reset in-memory without touching storage unless requested
  function _resetForTests() {
    cart.value = [];
    hydrated = false;
    persistEnabled = false;
  }

  return {
    cart,
    lines,
    count,
    total,
    isEmpty,
    add,
    remove,
    updateQuantity,
    clear,
    getQuantity,
    parsePrice,
    _resetForTests,
    MAX_QTY,
    MIN_QTY,
  };
}
