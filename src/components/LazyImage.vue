<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
  styling?: string;
}

defineProps<Props>();
</script>

<template>
  <figure v-lazyimg="src">
    <img :class="styling ?? 'w-full rounded-lg'" :alt="alt" />
  </figure>
</template>
