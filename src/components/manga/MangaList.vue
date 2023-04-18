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
  <div>
    <template v-for="(manga, index) of store.list" :key="manga.name">
      <MangaListSingle :data="manga" @click="emit('select', index)" />
    </template>
  </div>
</template>

