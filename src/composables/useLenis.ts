import Lenis from 'lenis';
import { onBeforeUnmount } from 'vue';

let lenisInstance: Lenis | null = null;
let rafId = 0;

export function useLenis() {
  const init = () => {
    if (lenisInstance) return lenisInstance;
    if (typeof window === 'undefined') return null;

    lenisInstance = new Lenis({
      duration: 0.85,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.4,
      gestureOrientation: 'vertical',
    });

    const raf = (time: number) => {
      lenisInstance?.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return lenisInstance;
  };

  const stop = () => lenisInstance?.stop();
  const start = () => lenisInstance?.start();
  const destroy = () => {
    if (rafId) cancelAnimationFrame(rafId);
    lenisInstance?.destroy();
    lenisInstance = null;
  };

  onBeforeUnmount(() => {
    // instancia global: no destruir en cada unmount de componente,
    // pero cancelar RAF si la app se desmonta (HMR / test)
    if (rafId) cancelAnimationFrame(rafId);
  });

  return { init, stop, start, destroy, instance: () => lenisInstance };
}