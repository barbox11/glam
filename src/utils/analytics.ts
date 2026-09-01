type AnalyticsEvent = 'click_whatsapp' | 'view_product' | 'view_detail';

interface TrackOptions {
  source?: string;
  product?: string;
  category?: string;
}

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    umami?: { track: (event: string, data?: Record<string, string>) => void };
    gtag?: (cmd: string, event: string, params?: Record<string, string>) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, opts: TrackOptions = {}) {
  const props: Record<string, string> = {};
  if (opts.source) props.source = opts.source;
  if (opts.product) props.product = opts.product;
  if (opts.category) props.category = opts.category;

  // Plausible
  try {
    window.plausible?.(event, { props });
  } catch {}

  // Umami
  try {
    window.umami?.track(event, props);
  } catch {}

  // GA4 fallback
  try {
    window.gtag?.('event', event, props);
  } catch {}

  // Debug en dev
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, props);
  }
}

export function trackWhatsAppClick(opts: TrackOptions = {}) {
  trackEvent('click_whatsapp', opts);
}

export function trackViewProduct(product: string, category?: string) {
  trackEvent('view_product', { product, category });
}
