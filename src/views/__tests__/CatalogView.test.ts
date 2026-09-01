import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import CatalogView from '@/views/CatalogView.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp.vue';
import { products } from '@/data/products';

const createTestRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/catalogo', component: CatalogView },
      { path: '/producto/:id', component: { template: '<div />' } },
    ],
  });

describe('CatalogView', () => {
  it('renderiza todos los productos inicialmente', () => {
    const router = createTestRouter();
    const wrapper = mount(CatalogView, {
      global: { plugins: [router] },
    });
    expect(wrapper.findAll('[data-testid="product-card"]').length).toBe(products.length);
  });

  it('filtra por categoría', async () => {
    const router = createTestRouter();
    const wrapper = mount(CatalogView, { global: { plugins: [router] } });
    const labiosButton = wrapper.find('[data-testid="filter-labios"]');
    await labiosButton.trigger('click');
    await wrapper.vm.$nextTick();
    const labios = products.filter((p) => p.category === 'labios');
    expect(wrapper.findAll('[data-testid="product-card"]').length).toBe(labios.length);
  });

  it('filtra por búsqueda', async () => {
    const router = createTestRouter();
    const wrapper = mount(CatalogView, { global: { plugins: [router] } });
    const input = wrapper.find('[data-testid="search-input"]');
    await input.setValue('terciopelo');
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Beso de Terciopelo');
    const nonMatching = wrapper.findAll('[data-testid="product-card"]');
    expect(nonMatching.length).toBeGreaterThan(0);
    expect(nonMatching.length).toBeLessThan(products.length);
  });

  it('muestra estado vacío cuando no hay resultados', async () => {
    const router = createTestRouter();
    const wrapper = mount(CatalogView, { global: { plugins: [router] } });
    await wrapper.find('[data-testid="search-input"]').setValue('zzzzzzzz');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-testid="empty-state"]').exists()).toBe(true);
  });

  it('muestra el contador de resultados', async () => {
    const router = createTestRouter();
    const wrapper = mount(CatalogView, { global: { plugins: [router] } });
    const count = wrapper.find('[data-testid="results-count"]').text();
    expect(count).toContain(String(products.length));
  });
});

describe('ProductCard', () => {
  it('renderiza el nombre del producto', () => {
    const wrapper = mount(ProductCard, {
      props: { product: products[0] },
      global: {
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    });
    expect(wrapper.text()).toContain(products[0].name);
  });
});

describe('FloatingWhatsApp', () => {
  it('tiene un enlace wa.me al número oficial', () => {
    const wrapper = mount(FloatingWhatsApp);
    const link = wrapper.find('a');
    const href = link.attributes('href') || '';
    expect(href).toContain('https://wa.me/573164324637');
  });

  it('está configurado para abrir en nueva pestaña', () => {
    const wrapper = mount(FloatingWhatsApp);
    const link = wrapper.find('a');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toContain('noopener');
  });

  it('incluye el número oficial en el aria-label', () => {
    const wrapper = mount(FloatingWhatsApp);
    const aria = wrapper.find('a').attributes('aria-label') || '';
    expect(aria).toContain('+57 316 432 4637');
  });
});