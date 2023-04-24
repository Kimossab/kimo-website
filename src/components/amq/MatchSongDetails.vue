<script setup lang="ts">
import type { ITournament, MatchSong } from "@/helpers/AMQ";

interface Props {
  tournament: ITournament;
  song: MatchSong;
  player1: string;
  player2: string;
}

interface Emits {
  (e: "select", src: string): void;
}

defineEmits<Emits>();
const props = defineProps<Props>();
const tournamentSong = props.tournament.songs.find(
  (s) => s.name === props.song.song && s.artist === props.song.artist
);
const anime = props.tournament.animes.find(
  (a) => a.romaji === tournamentSong?.anime
);
</script>

<template>
  <div class="flex flex-col text-center">
    <div class="flex flex-col text-center">
      <span>{{ anime?.romaji }}</span>
      <span v-if="anime?.romaji !== anime?.english" class="text-xs">
        ({{ anime?.english }})
      </span>
    </div>
  </div>
  <div class="flex flex-col text-center">
    {{ song.song }}
  </div>
  <div class="flex flex-col text-center">
    {{ song.artist }}
  </div>
  <div class="flex justify-center gap-2">
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
  <div class="flex justify-center gap-2">
    <font-awesome-icon
      v-if="tournamentSong?.players.includes(player1)"
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
    <font-awesome-icon
      v-if="tournamentSong?.players.includes(player2)"
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
    <div class="w-full h-8 border border-solid">
      <div
        class="h-full sample-section dark:sample-section-dark border-l border-r border-neutral-700 dark:border-stone-300"
        :title="`Start at ${song.startPoint} seconds\nLength of ${song.videoLength} seconds`"
        :style="`width:calc(20 * 100% / ${song.videoLength}); margin-left:calc(${song.startPoint} * 100% / ${song.videoLength})`"
      ></div>
    </div>
  </div>
  <div class="flex flex-col text-center">
    <button
      v-if="song.videoUrl"
      class="cursor-pointer"
      @click="$emit('select', song.videoUrl!)"
    >
      <font-awesome-icon icon="fa-solid fa-circle-play" />
      Play Video
    </button>
    <span v-else>No video</span>
  </div>
</template>
