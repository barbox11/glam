import { onMounted, onUnmounted, ref } from 'vue';

export function useScrollPosition(threshold = 50) {
  const scrolled = ref(false);

  const onScroll = () => {
    scrolled.value = window.scrollY > threshold;
  };

  onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });

  return { scrolled };
}