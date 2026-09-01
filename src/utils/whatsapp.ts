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