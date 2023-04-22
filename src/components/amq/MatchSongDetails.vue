<script setup lang="ts">
import type { MatchSong } from "@/helpers/AMQ";

interface Props {
  song: MatchSong;
  player1: string;
  player2: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col text-center">
    {{ song.song }}
  </div>
  <div class="flex flex-col text-center">
    {{ song.artist }}
  </div>
  <div class="flex flex-col text-center">
    <font-awesome-icon
      v-if="song.correctAnswers.includes(player1)"
      icon="square-check"
      size="xl"
      class="text-green-500"
    />
    <font-awesome-icon
      v-else
      icon="square-xmark"
      size="xl"
      class="text-red-500"
    />
  </div>
  <div class="flex flex-col text-center">
    <font-awesome-icon
      v-if="song.correctAnswers.includes(player2)"
      icon="square-check"
      size="xl"
      class="text-green-500"
    />
    <font-awesome-icon
      v-else
      icon="square-xmark"
      size="xl"
      class="text-red-500"
    />
  </div>
  <div class="flex flex-col text-center">
    <div class="w-full h-8 border border-solid border-white relative">
      <div
        class="h-full w-0.5 bg-white absolute top-0"
        :title="`Start at ${song.startPoint} seconds`"
        :style="`left:calc(${song.startPoint} * 100% / ${song.videoLength})`"
      ></div>
      <div
        class="h-full w-0.5 bg-white absolute top-0"
        :title="`End at ${song.startPoint + 20} seconds`"
        :style="`left:calc(${song.startPoint + 20} * 100% / ${
          song.videoLength
        })`"
      ></div>
    </div>
  </div>
  <div class="flex flex-col text-center">
    <a v-if="song.videoUrl" :href="song.videoUrl" target="_blank">Song Video</a>
    <span v-else>No video</span>
  </div>
</template>
