<script setup lang="ts">
import type { MangaChapterData } from "@/types";

interface Props {
  data: MangaChapterData;
}

defineProps<Props>();
</script>

<template>
  <div class="chapter-list-single">
    <img :src="data.pages[0]" :alt="data.number.toString()" />
    <span class="name">Chapter {{ data.number }}</span>
  </div>
</template>

<style>
.chapter-list-single {
  position: relative;
  width: 200px;
  height: 290px;
  transition: 0.2s;
}
.chapter-list-single img {
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: right;
}

.chapter-list-single .name {
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

.chapter-list-single:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.chapter-list-single:not(:last-child) {
  margin-right: 1rem;
  margin-bottom: 1rem;
}
</style>
