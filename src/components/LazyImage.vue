<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
}

defineProps<Props>();
</script>

<template>
  <figure v-lazyimg>
    <img class="w-full rounded-lg" :data-url="src" :alt="alt" />
  </figure>
</template>
