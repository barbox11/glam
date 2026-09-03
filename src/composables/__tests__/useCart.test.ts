import { describe, it, expect, beforeEach } from 'vitest';
import { useCart, parsePrice } from '@/composables/useCart';
import { products } from '@/data/products';

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
    const { _resetForTests } = useCart();
    _resetForTests();
  });

  it('inicia vacío', () => {
    const { isEmpty, count, total } = useCart();
    expect(isEmpty.value).toBe(true);
    expect(count.value).toBe(0);
    expect(total.value).toBe(0);
  });

  it('añade producto sin tono', () => {
    const { add, lines, count } = useCart();
    add(products[0].id, undefined, 2);
    expect(lines.value.length).toBe(1);
    expect(count.value).toBe(2);
    expect(lines.value[0].productId).toBe(products[0].id);
  });

  it('añade mismo producto con mismo tono suma cantidad (máx 99)', () => {
    const { add, lines } = useCart();
    const tone = products[0].tones![0];
    add(products[0].id, tone, 2);
    add(products[0].id, tone, 3);
    expect(lines.value.length).toBe(1);
    expect(lines.value[0].quantity).toBe(5);
    // clamp 99
    add(products[0].id, tone, 200);
    expect(lines.value[0].quantity).toBe(99);
  });

  it('mismo producto con distinto tono son líneas separadas', () => {
    const { add, lines } = useCart();
    const t1 = products[0].tones![0];
    const t2 = products[0].tones![1];
    add(products[0].id, t1, 1);
    add(products[0].id, t2, 1);
    expect(lines.value.length).toBe(2);
  });

  it('producto sin tonos ignora tono', () => {
    const p = products.find((pr) => !pr.tones)!; // volumen negro
    const { add, lines } = useCart();
    add(p.id, { name: 'Fake', hex: '#fff' } as never, 1);
    expect(lines.value[0].tone).toBeUndefined();
  });

  it('updateQuantity y remove', () => {
    const { add, updateQuantity, remove, lines } = useCart();
    add(products[1].id, undefined, 3);
    updateQuantity(products[1].id, undefined, 5);
    expect(lines.value[0].quantity).toBe(5);
    updateQuantity(products[1].id, undefined, 0);
    expect(lines.value.length).toBe(0);
    add(products[1].id, undefined, 2);
    remove(products[1].id, undefined);
    expect(lines.value.length).toBe(0);
  });

  it('clear vacía carrito', () => {
    const { add, clear, isEmpty } = useCart();
    add(products[0].id, undefined, 1);
    add(products[1].id, undefined, 1);
    clear();
    expect(isEmpty.value).toBe(true);
  });

  it('clamp cantidad 1..99', () => {
    const { add, lines } = useCart();
    add(products[0].id, undefined, 0);
    expect(lines.value[0].quantity).toBe(1);
    const { _resetForTests } = useCart();
    _resetForTests();
    localStorage.clear();
    add(products[0].id, undefined, 150);
    expect(useCart().lines.value[0].quantity).toBe(99);
  });

  it('total suma precios', () => {
    const { add, total } = useCart();
    // Beso 89k, Luz 120k
    add(products[0].id, undefined, 2); // 178k
    add(products[1].id, undefined, 1); // +120k = 298k
    expect(total.value).toBe(298000);
  });

  it('persiste en localStorage', async () => {
    const { add } = useCart();
    add(products[0].id, undefined, 4);
    await new Promise((r) => setTimeout(r, 0));
    const raw = localStorage.getItem('glam_cart_v1');
    expect(raw).not.toBeNull();
    expect(raw as string).toContain(products[0].id);
    // simular reload: reset sin borrar storage y re-hidratar
    const { _resetForTests } = useCart();
    // no clear storage, reset flag only by manually setting hydrated false via _reset then not clearing
    // workaround: create fresh instance should hydrate from storage
    _resetForTests();
    // after reset, localStorage still has data, next useCart() hydrates
    const { lines } = useCart();
    expect(lines.value.length).toBe(1);
    expect(lines.value[0].quantity).toBe(4);
  });
});

describe('parsePrice', () => {
  it('parsea formatos comunes', () => {
    expect(parsePrice('Desde $89.000 COP')).toBe(89000);
    expect(parsePrice('$120.000')).toBe(120000);
    expect(parsePrice('Desde $145.000 COP')).toBe(145000);
    expect(parsePrice(undefined)).toBe(0);
    expect(parsePrice('Consultar')).toBe(0);
  });
});
