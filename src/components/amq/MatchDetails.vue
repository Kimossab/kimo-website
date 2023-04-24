<script setup lang="ts">
import type { GroupMatch, ITournament } from "@/helpers/AMQ";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import { ref, onMounted, onUnmounted } from "vue";
import MatchSongDetails from "./MatchSongDetails.vue";
import VideoPlayer from "./VideoPlayer.vue";

interface Props {
  match: GroupMatch;
  tournament: ITournament;
}

defineProps<Props>();

const matchInfo = ref(null);
let matchInfoAnimation: DetailsAnimation | null = null;

onMounted(() => {
  if (matchInfo.value) {
    matchInfoAnimation = new DetailsAnimation(matchInfo.value, 500);
  }
});
onUnmounted(() => {
  matchInfoAnimation?.destructor();
  matchInfoAnimation = null;
});

const videoSrc = ref<string | null>(null);
</script>

<template>
  <VideoPlayer v-if="videoSrc" :video-src="videoSrc" @close="videoSrc = null" />
  <details ref="matchInfo" class="mx-4 my-0">
    <summary class="font-bold text-lg">
      {{ match.player1 }} ({{ match.p1Points }}) x ({{ match.p2Points }})
      {{ match.player2 }}
    </summary>
    <div class="max-w-full overflow-auto !my-0">
      <div
        class="min-w-[65rem] grid grid-cols-7 gap-4 items-center details-content"
      >
        <div
          v-for="header of [
            'Anime',
            'Song',
            'Artist',
            `Player's guesses`,
            `From player's playlist`,
            'Song sample',
            'Song video',
          ]"
          :key="`${match._id}-${header}`"
          class="text-center"
        >
          {{ header }}
        </div>
        <hr class="col-span-7" />
        <MatchSongDetails
          v-for="song of match.songList"
          :key="song._id"
          :song="song"
          :player1="match.player1"
          :player2="match.player2"
          :tournament="tournament"
          @select="(song) => (videoSrc = song)"
        />
      </div>
    </div>
  </details>
</template>
