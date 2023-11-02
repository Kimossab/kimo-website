<script setup lang="ts">
import type { PlaylistAnime } from "@/types";

interface Props {
  anime: PlaylistAnime;
}

defineProps<Props>();
</script>

<template>
  <div
    class="w-52 h-72 relative cursor-pointer hover:scale-105 transition shadow"
  >
    <img class="object-cover w-full h-full" :src="anime.picture" />
    <div
      class="absolute bottom-0 bg-opacity-50 bg-zinc-800 text-center w-full backdrop-blur-sm"
    >
      <span class="w-full text-white text-sm"
        >{{ anime.nameEn }} | {{ anime.nameRom }}</span
      >
    </div>
  </div>
</template>
