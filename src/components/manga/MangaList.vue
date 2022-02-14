<script setup lang="ts">
import { useManga } from "@/stores/manga";
import MangaListSingle from "./MangaListSingle.vue";
const store = useManga();

interface Emits {
  (e: "select", id: number): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <div class="manga-list">
    <template v-for="(manga, index) of store.list" :key="manga.name">
      <MangaListSingle @click="emit('select', index)" :data="manga" />
    </template>
  </div>
</template>

<style>
.manga-list {
  margin: 0;
  padding: 0 !important;
}
</style>
