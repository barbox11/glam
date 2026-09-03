import { glamConfig } from '@/config/glam.config';

export interface WhatsAppLinkOptions {
  productName?: string;
  customMessage?: string;
  source?: string;
}

export interface WhatsAppLinkResult {
  url: string;
  message: string;
  number: string;
}

const buildProductMessage = (productName: string): string =>
  `Hola, GLAM.\n\nEstoy interesada en el producto: ${productName}\n¿Podrían darme más información?`;

const SITE_URL = 'https://glam-3in.pages.dev';

function formatPriceCOP(n: number): string {
  return `$${n.toLocaleString('es-CO')} COP`;
}

export function generateWhatsAppLink(
  productOrName?: { name: string } | string,
  options: WhatsAppLinkOptions = {},
): WhatsAppLinkResult {
  let productName: string | undefined;

  if (typeof productOrName === 'string') {
    productName = productOrName;
  } else if (productOrName && typeof productOrName === 'object' && 'name' in productOrName) {
    productName = productOrName.name;
  }

  let message: string;
  if (options.customMessage) {
    message = options.customMessage;
  } else if (productName) {
    message = buildProductMessage(productName);
  } else if (options.source) {
    message = `${glamConfig.whatsapp.defaultMessage}\n\nOrigen: ${options.source}`;
  } else {
    message = glamConfig.whatsapp.defaultMessage;
  }

  const params = new URLSearchParams({ text: message });
  const url = `https://wa.me/${glamConfig.whatsapp.numberRaw}?${params.toString()}`;

  return {
    url,
    message,
    number: glamConfig.whatsapp.number,
  };
}

export interface CartWhatsAppItem {
  name: string;
  quantity: number;
  toneName?: string;
  price?: string;
  id: string;
}

export function parsePriceForWhatsApp(price?: string): number {
  if (!price) return 0;
  const m = price.match(/[\d.,]+/);
  if (!m) return 0;
  const digits = m[0].replace(/[.,]/g, '');
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
}

export function buildCartMessage(items: CartWhatsAppItem[]): string {
  if (!items.length) return glamConfig.whatsapp.defaultMessage;
  const lines = items.map((item) => {
    const tone = item.toneName ? ` (Tono: ${item.toneName})` : '';
    const price = item.price ? ` — ${item.price} c/u` : '';
    const url = `${SITE_URL}/producto/${item.id}`;
    return `• ${item.quantity}x ${item.name}${tone}${price}\n  ${url}`;
  });
  const total = items.reduce((acc, it) => acc + parsePriceForWhatsApp(it.price) * it.quantity, 0);
  const totalLine = total ? `\nTotal estimado: ${formatPriceCOP(total)}` : '';
  return `Hola, GLAM. 👋\n\nQuiero hacer este pedido:\n\n${lines.join('\n')}${totalLine}\n\n¿Podrían confirmarme disponibilidad?\n\nOrigen: carrito`;
}

export function generateWhatsAppCartLink(
  items: CartWhatsAppItem[],
  options: { source?: string } = {},
): WhatsAppLinkResult {
  const message = items.length ? buildCartMessage(items) : glamConfig.whatsapp.defaultMessage + (options.source ? `\n\nOrigen: ${options.source}` : '');
  const params = new URLSearchParams({ text: message });
  const url = `https://wa.me/${glamConfig.whatsapp.numberRaw}?${params.toString()}`;
  return { url, message, number: glamConfig.whatsapp.number };
}