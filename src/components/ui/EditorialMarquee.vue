<script setup lang="ts">
defineProps<{
  items: string[];
  speed?: number;
  reverse?: boolean;
  separator?: string;
  variant?: 'light' | 'dark';
}>();
</script>

<template>
  <div class="group relative overflow-hidden" aria-hidden="true">
    <!-- fade edges -->
    <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent opacity-60" :class="variant === 'dark' ? 'block' : 'hidden'" aria-hidden="true" />
    <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent opacity-60" :class="variant === 'dark' ? 'block' : 'hidden'" aria-hidden="true" />
    <div
      class="flex w-max gap-10 whitespace-nowrap py-5 group-hover:[animation-play-state:paused] md:gap-16 md:py-7"
      :class="[
        reverse ? 'animate-marquee-rev' : 'animate-marquee',
        variant === 'dark' ? 'text-white' : 'text-glam-ink/90',
      ]"
      :style="{ animationDuration: `${speed ?? 40}s` }"
    >
      <div class="flex shrink-0 items-center gap-10 md:gap-16">
        <span
          v-for="(item, i) in items"
          :key="`a-${i}`"
          class="font-display text-[clamp(1.4rem,4vw,2.6rem)] font-light tracking-[-0.02em] md:text-[clamp(1.8rem,3.5vw,3rem)]"
          :class="i % 2 === 0 ? 'italic font-light' : 'not-italic font-normal opacity-90'"
        >
          {{ item }}
          <span
            class="mx-5 inline-block h-2 w-2 rounded-full align-middle shadow-[0_0_10px_rgba(232,75,138,0.8)] md:mx-8 md:h-2.5 md:w-2.5"
            :class="variant === 'dark' ? 'bg-glam-rose-400' : 'bg-glam-rose-400'"
          />
        </span>
      </div>
      <div class="flex shrink-0 items-center gap-10 md:gap-16" aria-hidden="true">
        <span
          v-for="(item, i) in items"
          :key="`b-${i}`"
          class="font-display text-[clamp(1.4rem,4vw,2.6rem)] font-light tracking-[-0.02em] md:text-[clamp(1.8rem,3.5vw,3rem)]"
          :class="i % 2 === 0 ? 'italic font-light' : 'not-italic font-normal opacity-90'"
        >
          {{ item }}
          <span
            class="mx-5 inline-block h-2 w-2 rounded-full align-middle shadow-[0_0_10px_rgba(232,75,138,0.8)] md:mx-8 md:h-2.5 md:w-2.5"
            :class="variant === 'dark' ? 'bg-glam-rose-400' : 'bg-glam-rose-400'"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee-rev {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.animate-marquee-rev {
  animation-name: marquee-rev;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>