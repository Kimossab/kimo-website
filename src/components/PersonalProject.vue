<script setup lang="ts">
defineProps<{ image: string }>()
</script>

<template>
  <div class="border !border-emerald-500/50 rounded-4xl overflow-hidden grid grid-cols-[1fr_5fr] personal-prj">
    <div class="h-full mask-r-from-0% bg-cover bg-center bg-no-repeat mr-6" :style="`background-image: url(${image})`">
    </div>
    <slot></slot>
  </div>
</template>

<style>
@reference "@/assets/css/base.css";

.personal-prj img {
  @apply max-w-96;
}
</style>