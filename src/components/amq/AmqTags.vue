<script setup lang="ts">
interface Props {
  tags: string[];
  name: string;
}

defineProps<Props>();
</script>
<template>
  <div class="relative group text-center">
    <span>{{ tags.length }} {{ name }}</span>
    <div
      class="absolute w-[800px] left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-2 hidden px-4 py-3 justify-center bg-slate-800 group-hover:flex flex-wrap gap-2 after:content[''] arrow">
      <span v-for="tag of tags" :key="`${name}-${tag}`" class="rounded border border-stone-100 text-xs p-1">
        {{ tag }}
      </span>
    </div>
  </div>
</template>


<style scoped>
.arrow {
  @apply after:h-4 after:w-4 after:rotate-45 after:bg-slate-800 ;
  @apply after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2;
}
</style>