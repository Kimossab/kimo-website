<script setup lang="ts">
import type { Anime, GroupMatch, Song } from "@/helpers/AMQ";

interface Props {
  animes: Anime[];
  songs: Song[];
  match: GroupMatch;
}
const props = defineProps<Props>();

const animeMap = props.animes.reduce<Record<string, Anime>>(
  (acc, cur) => ({ ...acc, [cur.anilistId || cur.romaji]: cur }),
  {}
);
const songMap = props.songs.reduce<Record<string, Song>>(
  (acc, cur) => ({ ...acc, [`${cur.name}-${cur.artist}`]: cur }),
  {}
);
</script>

<template>
  <div class="border-b grid grid-cols-6 gap-x-4 pb-2 mb-2">
    <div
      v-for="header of [
        'Anime',
        'Song',
        'Artist',
        `Player's guesses`,
        `From player's playlist`,
        'Song sample',
      ]"
      :key="`${match._id}-${header}`"
      class="text-center"
    >
      {{ header }}
    </div>
  </div>
  <div class="border-b grid grid-cols-6 gap-2 text-sm">
    <template v-for="song in match.songList" :key="song.song">
      <div class="flex flex-col text-center">
        <div class="flex flex-col text-center">
          <span>{{
            animeMap[songMap[`${song.song}-${song.artist}`].anime].romaji
          }}</span>
          <span
            v-if="
              animeMap[songMap[`${song.song}-${song.artist}`].anime].romaji !==
              animeMap[songMap[`${song.song}-${song.artist}`].anime].english
            "
            class="text-xs"
          >
            ({{
              animeMap[songMap[`${song.song}-${song.artist}`].anime].english
            }})
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
          v-if="song.correctAnswers.includes(match.player1)"
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
          v-if="song.correctAnswers.includes(match.player2)"
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
          v-if="
            songMap[`${song.song}-${song.artist}`]?.players.includes(
              match.player1
            )
          "
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
          v-if="
            songMap[`${song.song}-${song.artist}`]?.players.includes(
              match.player2
            )
          "
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
    </template>
  </div>
</template>
