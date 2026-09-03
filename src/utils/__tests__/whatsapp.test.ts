import { describe, it, expect } from 'vitest';
import { generateWhatsAppLink, generateWhatsAppCartLink, buildCartMessage } from '@/utils/whatsapp';
import { glamConfig } from '@/config/glam.config';
import { products } from '@/data/products';

describe('WhatsApp centralizado', () => {
  it('usa el número oficial +57 316 432 4637', () => {
    const { number } = generateWhatsAppLink();
    expect(number).toBe('+57 316 432 4637');
    expect(number).toBe(glamConfig.whatsapp.number);
  });

  it('genera un enlace wa.me con el número raw', () => {
    const { url } = generateWhatsAppLink();
    expect(url).toContain('https://wa.me/573164324637');
  });
});

describe('generateWhatsAppLink', () => {
  it('existe y devuelve una función pura', () => {
    expect(typeof generateWhatsAppLink).toBe('function');
  });

  it('genera mensaje por defecto sin producto', () => {
    const { url, message } = generateWhatsAppLink();
    expect(url).toContain('https://wa.me/573164324637');
    expect(message).toContain('Hola, GLAM');
  });

  it('acepta un nombre de producto como string', () => {
    const { url, message } = generateWhatsAppLink('Velvet Kiss');
    expect(message).toContain('Velvet Kiss');
    expect(message).toContain('Hola, GLAM');
    expect(message).toContain('¿Podrían darme más información?');
    // URLSearchParams codifica espacios como + y caracteres especiales
    expect(url).toContain('Velvet+Kiss');
    expect(url).toContain('producto%3A+Velvet+Kiss');
  });

  it('acepta un objeto producto', () => {
    const product = products[0];
    const { message } = generateWhatsAppLink(product);
    expect(message).toContain(product.name);
  });

  it('codifica caracteres especiales correctamente', () => {
    const { url } = generateWhatsAppLink('Velvet & Rose "Nº 1"');
    // URLSearchParams codifica espacios como +, y caracteres como &, ", º como %XX
    expect(url).toMatch(/^https:\/\/wa\.me\/573164324637\?text=/);
    expect(url).toContain('Velvet+%26+Rose');
    // El parámetro text decodificado por URLSearchParams debe contener el nombre original
    const params = new URLSearchParams(url.split('?')[1]);
    expect(params.get('text')).toContain('Velvet & Rose "Nº 1"');
  });

  it('genera un mensaje distinto por cada producto', () => {
    const { message: m1 } = generateWhatsAppLink(products[0]);
    const { message: m2 } = generateWhatsAppLink(products[1]);
    expect(m1).not.toBe(m2);
    expect(m1).toContain(products[0].name);
    expect(m2).toContain(products[1].name);
  });

  it('respeta un customMessage cuando se pasa', () => {
    const custom = 'Mensaje custom de prueba';
    const { message } = generateWhatsAppLink(undefined, { customMessage: custom });
    expect(message).toBe(custom);
  });

  it('incluye origen cuando se pasa source sin producto', () => {
    const { message } = generateWhatsAppLink(undefined, { source: 'home-cta' });
    expect(message).toContain('Origen: home-cta');
  });

  it('el producto siempre aparece en el mensaje cuando se pasa producto', () => {
    for (const product of products) {
      const { message, url } = generateWhatsAppLink(product);
      expect(message).toContain(product.name);
      expect(url).toContain('573164324637');
    }
  });

  it('el CTA del home contiene el número oficial', () => {
    const { url } = generateWhatsAppLink(undefined, { source: 'home-cta' });
    expect(url).toBe('https://wa.me/573164324637?text=Hola%2C+GLAM.%0A%0AEstoy+interesada+en+conocer+m%C3%A1s+sobre+sus+productos.%0A%C2%BFPodr%C3%ADan+darme+m%C3%A1s+informaci%C3%B3n%3F%0A%0AOrigen%3A+home-cta');
  });
});

describe('Productos (data)', () => {
  it('hay productos definidos', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it('cada producto tiene campos requeridos', () => {
    for (const p of products) {
      expect(p.id).toBeTruthy();
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.image).toMatch(/^(https?:\/\/|\/)/);
      expect(Array.isArray(p.gallery)).toBe(true);
      expect(p.gallery.length).toBeGreaterThan(0);
    }
  });

  it('los slugs son únicos', () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('WhatsApp carrito', () => {
  it('buildCartMessage con 0 items devuelve default', () => {
    expect(buildCartMessage([])).toContain('Hola, GLAM');
  });

  it('genera mensaje con lista detallada + total + links', () => {
    const items = [
      { id: 'velvet-kiss', name: 'Beso de Terciopelo', quantity: 2, toneName: 'Alma Desnuda', price: 'Desde $89.000 COP' },
      { id: 'silk-veil', name: 'Velo de Seda', quantity: 1, price: 'Desde $145.000 COP' },
    ];
    const msg = buildCartMessage(items);
    expect(msg).toContain('2x Beso de Terciopelo');
    expect(msg).toContain('Tono: Alma Desnuda');
    expect(msg).toContain('https://glam-3in.pages.dev/producto/velvet-kiss');
    expect(msg).toContain('https://glam-3in.pages.dev/producto/silk-veil');
    expect(msg).toContain('Total estimado:');
    expect(msg).toContain('323.000');
  });

  it('generateWhatsAppCartLink codifica correctamente', () => {
    const items = [{ id: 'velvet-kiss', name: 'Beso', quantity: 1, price: 'Desde $89.000 COP' }];
    const { url, message } = generateWhatsAppCartLink(items);
    expect(url).toContain('https://wa.me/573164324637');
    expect(url).toContain('text=');
    const params = new URLSearchParams(url.split('?')[1]);
    expect(params.get('text')).toBe(message);
  });

  it('clamp implícito en mensaje max 99', () => {
    const items = [{ id: 'velvet-kiss', name: 'Beso', quantity: 99, price: 'Desde $89.000 COP' }];
    const msg = buildCartMessage(items);
    expect(msg).toContain('99x');
  });
});