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
  <div class="chapter-list">
    <template
      v-for="chapter of store.manga?.data.chapters"
      :key="chapter.number"
    >
      <ChapterListSingle
        @click="emit('select', chapter.number)"
        :data="chapter"
      />
    </template>
  </div>
</template>

<style>
.chapter-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
