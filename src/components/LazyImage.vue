<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
  styling?: string;
}

defineProps<Props>();
</script>

<template>
  <figure v-lazyimg>
    <img :class="styling ?? 'w-full rounded-lg'" :data-url="src" :alt="alt" />
  </figure>
</template>
