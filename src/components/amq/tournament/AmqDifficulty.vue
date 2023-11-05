<script setup lang="ts">
interface Props {
  difficulty: number;
}

defineProps<Props>();
</script>

<template>
  <div
    class="text-center border w-full h-6 bg-gradient-to-r relative from-green-500 via-amber-600 to-red-500 group"
  >
    <div
      class="absolute right-0 h-full dark:bg-neutral-700 bg-stone-300"
      :style="`width:${difficulty}%`"
    ></div>
    <span class="font-bold mix-blend-darken dark:mix-blend-lighten">{{
      difficulty
    }}</span>
  </div>
</template>

<style scoped>
.arrow {
  @apply after:rotate-45 after:border-8 after:border-slate-800 after:border-r-0 after:border-t-0 after:z-0;
  @apply after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/4;
}
</style>
