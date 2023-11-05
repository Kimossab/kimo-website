<script setup lang="ts">
import type { PlaylistAnime } from "@/types";

interface Props {
  anime: PlaylistAnime;
  small?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="[
      'relative hover:scale-105 transition shadow group',
      { 'w-24 h-36': small },
      { 'w-52 h-72': !small },
    ]"
  >
    <img class="object-cover w-full h-full" :src="anime.picture" />
    <div
      :class="[
        'absolute bottom-0 bg-opacity-50 bg-zinc-800 text-center w-full backdrop-blur-sm',
        {
          'hidden group-hover:block': small,
        },
      ]"
    >
      <span class="w-full text-white text-sm"
        >{{ anime.nameEn }} | {{ anime.nameRom }}</span
      >
    </div>
  </div>
</template>
