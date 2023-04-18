<script setup lang="ts">
import { useManga } from "@/stores/manga";
import ChapterListSingle from "./ChapterListSingle.vue";
const store = useManga();

interface Emits {
  (e: "select", id: number): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <template v-for="chapter of store.manga?.data.chapters" :key="chapter.number">
      <ChapterListSingle :data="chapter" @click="emit('select', chapter.number)" />
    </template>
  </div>
</template>
