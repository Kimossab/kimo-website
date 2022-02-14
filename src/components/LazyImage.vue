<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
}

defineProps<Props>();
</script>

<template>
  <figure v-lazyimg class="image__wrapper">
    <img class="image__item" :data-url="src" :alt="alt" />
  </figure>
</template>
