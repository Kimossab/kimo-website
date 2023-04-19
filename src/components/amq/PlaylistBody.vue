<script setup lang="ts">
import type { TournamentSong } from "@/helpers/AMQ";
import AmqDifficulty from "./AmqDifficulty.vue";
import AmqTags from "./AmqTags.vue";

interface Props {
  playlist: TournamentSong[];
  name: string;
}

defineProps<Props>();
</script>

<template>
  <template v-for="song of playlist" :key="`${name}-${song.name}`">
    <div class="flex flex-col text-center">
      <span>{{ song.anime.romaji }}</span>
      <span v-if="song.anime.romaji !== song.anime.english" class="text-xs">
        ({{ song.anime.english }})
      </span>
    </div>
    <div class="text-center">
      {{ song.name }}
    </div>
    <div class="text-center">
      {{ song.artist }}
    </div>
    <div class="text-center">
      <AmqTags :tags="song.anime.tags" name="Tags" />
    </div>
    <div class="text-center">
      <AmqTags :tags="song.anime.genre" name="Genres" />
    </div>
    <div class="text-center">
      {{ song.anime.season }}
    </div>
    <div class="text-center">
      <AmqDifficulty :difficulty="song.difficulty" />
    </div>
    <div class="text-center">
      {{ song.anime.score }}
    </div>
    <div class="text-center">
      {{ song.anime.type }}
    </div>
  </template>
</template>
