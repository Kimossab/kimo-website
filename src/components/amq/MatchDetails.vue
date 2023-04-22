<script setup lang="ts">
import type { GroupMatch } from "@/helpers/AMQ";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import { ref, onMounted, onUnmounted } from "vue";
import MatchSongDetails from "./MatchSongDetails.vue";

interface Props {
  match: GroupMatch;
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
</script>

<template>
  <details ref="matchInfo" class="mx-4 my-0">
    <summary class="font-bold text-lg">
      {{ match.player1 }} ({{ match.p1Points }}) x ({{ match.p2Points }})
      {{ match.player2 }}
    </summary>
    <div
      class="max-w-full grid grid-cols-6 !my-0 gap-4 items-center details-content"
    >
      <div
        v-for="header of [
          'Song',
          'Artist',
          `${match.player1}'s guess`,
          `${match.player2}'s guess`,
          'Song Sample',
          'Song Url',
        ]"
        :key="`${match._id}-${header}`"
        class="text-center"
      >
        {{ header }}
      </div>
      <hr class="col-span-6" />
      <MatchSongDetails
        v-for="song of match.songList"
        :key="song._id"
        :song="song"
        :player1="match.player1"
        :player2="match.player2"
      />
    </div>
  </details>
</template>
