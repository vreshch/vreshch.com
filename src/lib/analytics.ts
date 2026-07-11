export type GtagParams = Record<string, string | number | boolean>;

type GtagFn = (command: 'event', name: string, params?: GtagParams) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function trackEvent(name: string, params?: GtagParams): void {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
}
