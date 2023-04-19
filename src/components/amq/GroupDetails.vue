<script setup lang="ts">
import type { ITournament } from "@/helpers/AMQ";

interface Props {
  tournament: ITournament;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-2 my-2">
    <div
      v-for="(group, index) in tournament.phases[0].groups"
      :key="JSON.stringify(group)"
      class="border rounded"
    >
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
        <template v-for="player in group.players" :key="player">
          <div class="text-center">
            {{ player }}
          </div>
          <div class="text-center">
            {{
              group.matches.filter(
                (m) => m.player1 === player || m.player2 === player
              ).length
            }}
          </div>
          <div class="text-center">
            {{
              group.matches.filter(
                (m) =>
                  (m.player1 === player && m.p1Points > m.p2Points) ||
                  (m.player2 === player && m.p1Points < m.p2Points)
              ).length
            }}
          </div>
          <div class="text-center">
            {{
              group.matches.filter(
                (m) =>
                  (m.player1 === player || m.player2 === player) &&
                  m.p1Points === m.p2Points
              ).length
            }}
          </div>
          <div class="text-center">
            {{
              group.matches.filter(
                (m) =>
                  (m.player1 === player && m.p1Points < m.p2Points) ||
                  (m.player2 === player && m.p1Points > m.p2Points)
              ).length
            }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
