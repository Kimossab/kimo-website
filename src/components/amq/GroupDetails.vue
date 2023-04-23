<script setup lang="ts">
import type { Group, ITournament } from "@/helpers/AMQ";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import { ref, onMounted, onUnmounted } from "vue";
import MatchDetails from "./MatchDetails.vue";

interface Props {
  group: Group;
  index: number;
  tournament: ITournament;
}

const props = defineProps<Props>();

const matchesGroup = ref(null);
let matchesGroupAnimation: DetailsAnimation | null = null;

onMounted(() => {
  if (matchesGroup.value) {
    matchesGroupAnimation = new DetailsAnimation(matchesGroup.value, 500);
  }
});
onUnmounted(() => {
  matchesGroupAnimation?.destructor();
  matchesGroupAnimation = null;
});

// eslint-disable-next-line vue/no-setup-props-destructure
const players = props.group.players
  .map((player) => ({
    name: player,
    matches: props.group.matches.filter(
      (m) => m.player1 === player || m.player2 === player
    ).length,
    wins: props.group.matches.filter(
      (m) =>
        (m.player1 === player && m.p1Points > m.p2Points) ||
        (m.player2 === player && m.p1Points < m.p2Points)
    ).length,
    draws: props.group.matches.filter(
      (m) =>
        (m.player1 === player || m.player2 === player) &&
        m.p1Points === m.p2Points
    ).length,
    losses: props.group.matches.filter(
      (m) =>
        (m.player1 === player && m.p1Points < m.p2Points) ||
        (m.player2 === player && m.p1Points > m.p2Points)
    ).length,
  }))
  .sort((a, b) => {
    if (a.matches !== b.matches) {
      return b.matches - a.matches;
    }
    if (a.wins !== b.wins) {
      return b.wins - a.wins;
    }
    if (a.draws !== b.draws) {
      return b.draws - a.draws;
    }
    return b.losses - a.losses;
  });
</script>

<template>
  <h3 class="my-2 p-2">Group {{ index + 1 }}</h3>
  <hr />
  <div
    class="max-w-full grid gap-4 items-center details-content grid-cols-5 p-4"
  >
    <div
      v-for="header of ['Player', 'Matches', 'Wins', 'Draws', 'Losses']"
      :key="`${index}-${header}`"
      class="text-center"
    >
      {{ header }}
    </div>
    <hr class="col-span-5" />
    <template v-for="player in players" :key="player">
      <div class="text-center">
        {{ player.name }}
      </div>
      <div class="text-center">
        {{ player.matches }}
      </div>
      <div class="text-center">
        {{ player.wins }}
      </div>
      <div class="text-center">
        {{ player.draws }}
      </div>
      <div class="text-center">
        {{ player.losses }}
      </div>
    </template>
  </div>
  <hr />
  <details ref="matchesGroup" class="mx-4 my-2">
    <summary class="font-bold text-lg">Matches</summary>
    <div class="details-content !my-0 !p-0">
      <MatchDetails
        v-for="match of group.matches"
        :key="match._id"
        :match="match"
        :tournament="tournament"
      />
    </div>
  </details>
</template>
