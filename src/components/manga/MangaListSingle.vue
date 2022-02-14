<script setup lang="ts">
import type { MangaData } from "@/types";

interface Props {
  data: MangaData;
}

defineProps<Props>();
</script>

<template>
  <div class="manga-list-single">
    <img :src="data.thumbnail" :alt="data.name.en" />
    <span class="name">{{ data.name.en }}</span>
  </div>
</template>

<style>
.manga-list-single {
  position: relative;
  width: 200px;
  height: 290px;
  transition: 0.2s;
}
.manga-list-single img {
  width: 100%;
  height: 100%;
}

.manga-list-single .name {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 8px;
  width: 100%;

  background-image: linear-gradient(
    0,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.55) 50%,
    rgba(0, 0, 0, 0.2) 90%,
    rgba(0, 0, 0, 0) 100%
  );
}

.manga-list-single:hover {
  transform: scale(1.05);
  cursor: pointer;
}
</style>
