<script setup lang="ts">
import { AmqTournament } from "@/helpers/AmqTournament";

const tournament = await AmqTournament.getInstance();
</script>

<template>
  <div class="flex flex-col gap-2 my-2">
    <div
      v-for="(group, index) in tournament.groups"
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
        <template v-for="player in group" :key="player.player">
          <div class="text-center">
            {{ player.player }}
          </div>
          <div class="text-center">
            {{ player.matches.length }}
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
    </div>
  </div>
</template>
