import { test, expect } from '@playwright/test';

test.describe('WhatsApp', () => {
  test('el número oficial es +57 316 432 4637', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    expect(html).toContain('573164324637');
    expect(html).toContain('+57 316 432 4637');
  });

  test('existen botones de WhatsApp en header, footer, home CTA y flotante', async ({ page }) => {
    await page.goto('/');
    // En desktop el header muestra WhatsApp inline; en mobile está dentro del menú fullscreen
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      await page.getByRole('button', { name: /abrir menú/i }).click();
      // El link de WhatsApp dentro del menú fullscreen
      await expect(page.getByRole('link', { name: /WhatsApp/i }).first()).toBeVisible();
    } else {
      await expect(page.getByTestId('header-whatsapp')).toBeVisible();
    }
    await expect(page.getByTestId('home-cta-whatsapp')).toBeVisible();
    await expect(page.getByTestId('floating-whatsapp')).toBeVisible();
    await expect(page.getByTestId('footer-whatsapp')).toBeVisible();
  });

  test('el CTA del producto en el detalle funciona y menciona el producto', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/producto/velvet-kiss');
    const cta = page.getByTestId('product-whatsapp');
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute('href');
    expect(href).toContain('https://wa.me/573164324637');
    expect(href).toContain('Beso+de+Terciopelo');
  });

  test('el mensaje incluye el nombre del producto para cualquier producto', async ({ page }) => {
    await page.goto('/catalogo');
    const firstProduct = page.getByTestId('product-card').first();
    await firstProduct.click();
    const cta = page.getByTestId('product-whatsapp');
    const href = await cta.getAttribute('href');
    expect(href).toContain('https://wa.me/573164324637');
    const params = new URLSearchParams((href || '').split('?')[1] || '');
    expect(params.get('text') || '').toMatch(/Estoy interesada en el producto:/);
  });

  test('el botón flotante está disponible y abre en nueva pestaña', async ({ page }) => {
    await page.goto('/');
    const floating = page.getByTestId('floating-whatsapp');
    await expect(floating).toBeVisible();
    const target = await floating.getAttribute('target');
    expect(target).toBe('_blank');
  });
});

test.describe('Catálogo', () => {
  test('muestra productos', async ({ page }) => {
    await page.goto('/catalogo');
    const cards = page.getByTestId('product-card');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('filtros funcionan', async ({ page }) => {
    await page.goto('/catalogo');
    const allCount = await page.getByTestId('product-card').count();
    await page.getByTestId('filter-labios').click();
    const labiosCount = await page.getByTestId('product-card').count();
    expect(labiosCount).toBeGreaterThan(0);
    expect(labiosCount).toBeLessThanOrEqual(allCount);
  });

  test('búsqueda funciona', async ({ page }) => {
    await page.goto('/catalogo');
    await page.getByTestId('search-input').fill('terciopelo');
    const cards = page.getByTestId('product-card');
    expect(await cards.count()).toBeGreaterThan(0);
    await expect(page.locator('text=/Terciopelo/i').first()).toBeVisible();
  });
});

test.describe('Detalle de producto', () => {
  test('carga un producto existente', async ({ page }) => {
    await page.goto('/producto/velvet-kiss');
    await expect(page.locator('h1')).toContainText('Beso de Terciopelo');
  });

  test('producto inexistente redirige a home (404 manejado en SPA)', async ({ page }) => {
    await page.goto('/producto/inexistente-xyz');
    // ProductView detecta producto no existente y hace router.replace a / (home)
    await expect(page).toHaveURL(/\/$|\/catalogo/);
  });

  test('la galería cambia al click', async ({ page }) => {
    await page.goto('/producto/velvet-kiss');
    const buttons = page.locator('[aria-label^="Imagen"]');
    const count = await buttons.count();
    if (count > 1) {
      await buttons.nth(1).click();
      await expect(buttons.nth(1)).toHaveAttribute('class', /ring-2/);
    }
  });
});

test.describe('Navegación', () => {
  test('la home carga y tiene el hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('text=/Belleza/i').first()).toBeVisible();
  });

  test('existen todas las rutas principales', async ({ page }) => {
    for (const route of ['/', '/catalogo', '/colecciones', '/nosotros', '/contacto']) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('404 funciona en rutas inexistentes', async ({ page }) => {
    await page.goto('/ruta-inexistente');
    await expect(page.locator('text=/404/i').first()).toBeVisible();
  });
});

test.describe('Responsive', () => {
  test('no hay scroll horizontal en mobile', async ({ page }) => {
    await page.goto('/');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('el menú mobile se abre', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: /abrir menú/i }).click();
    await expect(page.getByRole('navigation', { name: /menú principal/i })).toBeVisible();
  });
});

test.describe('No-ecommerce', () => {
  test('no existe botón de comprar, carrito ni checkout', async ({ page }) => {
    await page.goto('/');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.toLowerCase()).not.toContain('comprar');
    expect(bodyText.toLowerCase()).not.toContain('agregar al carrito');
    expect(bodyText.toLowerCase()).not.toContain('checkout');
  });
});