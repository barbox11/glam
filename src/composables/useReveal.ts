import { onMounted, onUnmounted, type Ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal(target: Ref<HTMLElement | null>, options: { y?: number; delay?: number } = {}) {
  let trigger: ScrollTrigger | null = null;

  onMounted(() => {
    if (!target.value) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(target.value, { opacity: 1, y: 0 });
      return;
    }
    // En mobile no animar reveal — mostrar directo para fluidez
    if (window.matchMedia('(max-width: 767px)').matches) {
      gsap.set(target.value, { opacity: 1, y: 0 });
      return;
    }
    const el = target.value;
    gsap.set(el, { opacity: 0, y: options.y ?? 24 });

    trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: options.delay ?? 0,
          ease: 'power3.out',
        });
      },
    });
  });

  onUnmounted(() => {
    trigger?.kill();
  });
}