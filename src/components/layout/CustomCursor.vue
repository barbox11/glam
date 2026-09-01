<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const ringRef = ref<HTMLDivElement | null>(null);
const dotRef = ref<HTMLDivElement | null>(null);
const labelRef = ref<HTMLSpanElement | null>(null);

let raf = 0;
let enabled = false;

const target = { x: -100, y: -100 };
const ringPos = { x: -100, y: -100 };
const dotPos = { x: -100, y: -100 };

const RING_EASE = 0.15;
const DOT_EASE = 0.6;

type EstadoCursor = 'ver' | 'explorar' | 'hablar';
let activeState: EstadoCursor | null = null;

const LABELS: Record<EstadoCursor, string> = {
  ver: 'Ver',
  explorar: 'Explorar',
  hablar: 'Hablar',
};

const setState = (state: EstadoCursor | null, label: string) => {
  if (activeState === state) return;
  activeState = state;
  if (!ringRef.value || !labelRef.value) return;
  if (state) {
    ringRef.value.dataset.state = state;
    labelRef.value.textContent = label;
  } else {
    delete ringRef.value.dataset.state;
    labelRef.value.textContent = '';
  }
};

const animate = () => {
  if (!enabled) return;
  ringPos.x += (target.x - ringPos.x) * RING_EASE;
  ringPos.y += (target.y - ringPos.y) * RING_EASE;
  dotPos.x += (target.x - dotPos.x) * DOT_EASE;
  dotPos.y += (target.y - dotPos.y) * DOT_EASE;

  if (ringRef.value) {
    ringRef.value.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
  }
  if (dotRef.value) {
    dotRef.value.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
  }
  raf = requestAnimationFrame(animate);
};

const onMove = (e: MouseEvent) => {
  if (!enabled) return;
  target.x = e.clientX;
  target.y = e.clientY;
};

const onOver = (e: MouseEvent) => {
  if (!enabled) return;
  const t = e.target as HTMLElement | null;
  if (!t) return;
  const el = t.closest('[data-cursor]') as HTMLElement | null;
  if (el) {
    const state = (el.dataset.cursor as EstadoCursor) || 'ver';
    const label = el.dataset.cursorLabel || LABELS[state] || state;
    setState(state, label);
  } else {
    setState(null, '');
  }
};

const onDown = () => {
  if (ringRef.value) ringRef.value.dataset.press = 'true';
};
const onUp = () => {
  if (ringRef.value) delete ringRef.value.dataset.press;
};

const onLeave = () => {
  if (!enabled) return;
  if (ringRef.value) ringRef.value.dataset.hidden = 'true';
};
const onEnter = () => {
  if (!enabled) return;
  if (ringRef.value) delete ringRef.value.dataset.hidden;
};

const isDesktopWithMouse = () =>
  window.matchMedia('(pointer: fine)').matches &&
  window.matchMedia('(hover: hover)').matches &&
  window.matchMedia('(min-width: 1024px)').matches;

const enable = () => {
  if (enabled) return;
  enabled = true;
  document.body.classList.add('custom-cursor');
  raf = requestAnimationFrame(animate);
};

const disable = () => {
  if (!enabled) return;
  enabled = false;
  cancelAnimationFrame(raf);
  document.body.classList.remove('custom-cursor');
};

const onMediaChange = () => {
  if (isDesktopWithMouse()) enable();
  else disable();
};

let mql: MediaQueryList | null = null;

onMounted(() => {
  onMediaChange();
  mql = window.matchMedia('(min-width: 1024px)');
  if (mql.addEventListener) mql.addEventListener('change', onMediaChange);
  else mql.addListener(onMediaChange);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseover', onOver);
  window.addEventListener('mousedown', onDown);
  window.addEventListener('mouseup', onUp);
  document.documentElement.addEventListener('mouseleave', onLeave);
  document.documentElement.addEventListener('mouseenter', onEnter);
});

onBeforeUnmount(() => {
  if (mql) {
    if (mql.removeEventListener) mql.removeEventListener('change', onMediaChange);
    else mql.removeListener(onMediaChange);
  }
  document.documentElement.removeEventListener('mouseleave', onLeave);
  document.documentElement.removeEventListener('mouseenter', onEnter);
  disable();
  window.removeEventListener('mousemove', onMove);
  window.removeEventListener('mouseover', onOver);
  window.removeEventListener('mousedown', onDown);
  window.removeEventListener('mouseup', onUp);
});
</script>

<template>
  <div ref="ringRef" class="cursor-ring" aria-hidden="true" data-testid="custom-cursor">
    <span ref="labelRef" class="cursor-ring__label" />
  </div>
  <div ref="dotRef" class="cursor-dot" aria-hidden="true" />
</template>