<script setup lang="ts">
interface Props {
  difficulty: number;
}

defineProps<Props>();
</script>

<template>
  <div
    class="border w-full h-6 bg-gradient-to-r relative from-green-500 via-amber-600 to-red-500 group"
  >
    <div
      class="absolute right-0 h-full bg-stone-900"
      :style="`width:${difficulty}%`"
    ></div>
    <div
      class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2 hidden px-4 py-1 justify-center bg-slate-800 group-hover:flex after:content[''] z-10 arrow"
    >
      {{ difficulty }}
    </div>
  </div>
</template>

<style scoped>
.arrow {
  @apply after:rotate-45 after:border-8 after:border-slate-800 after:border-r-0 after:border-t-0 after:z-0;
  @apply after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/4;
}
</style>
