import { onMounted, onUnmounted, ref } from 'vue';

export function useMediaQuery(query: string) {
  const matches = ref(false);
  let mql: MediaQueryList | null = null;
  const handler = (e: MediaQueryListEvent) => (matches.value = e.matches);

  onMounted(() => {
    if (typeof window === 'undefined') return;
    mql = window.matchMedia(query);
    matches.value = mql.matches;
    mql.addEventListener('change', handler);
  });

  onUnmounted(() => {
    mql?.removeEventListener('change', handler);
  });

  return matches;
}