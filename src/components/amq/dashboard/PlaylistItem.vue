<script setup lang="ts">
import { ButtonVariants, type Playlist } from "@/types";
import SimpleButton from "@/components/SimpleButton.vue";

interface Props {
  playlist: Playlist;
}
interface Emits {
  (e: "select", playlist: Playlist): void;
  (e: "delete", playlist: Playlist): void;
}
defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="flex justify-between border-t py-4">
    <div>{{ playlist.name }} ({{ playlist.animeList.length }} animes)</div>
    <div class="flex gap-2">
      <SimpleButton
        :variant="ButtonVariants.Small"
        @click="$emit('select', playlist)"
        >Edit</SimpleButton
      >
      <SimpleButton
        :variant="ButtonVariants.Small"
        @click="$emit('delete', playlist)"
        >Delete</SimpleButton
      >
    </div>
  </div>
</template>
