<script setup lang="ts">
import TournamentContainer from "@/components/amq/TournamentContainer.vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const tournamentList: { id: string; name: string }[] = (
  await axios.get(`${import.meta.env.VITE_API_URL}amq/tournament/`)
)?.data;

const selectTournament = (id: string) => {
  router.push({ name: "amq", params: { tournamentId: id } });
};
</script>

<template>
  <div class="m-6">
    <h1 class="mx-auto w-full mb-8 text-center text-lg font-bold">
      SPECIAL AMQ OVERVIEW
    </h1>
    <hr />
    <hr />

    <template v-if="!route.params.tournamentId">
      <div class="mt-4">Select a tournament:</div>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="tournament in tournamentList"
          :key="tournament.id"
          class="border rounded-lg p-6 text-lg cursor-pointer"
          @click="selectTournament(tournament.id)"
        >
          {{ tournament.name }}
        </div>
      </div>
    </template>

    <TournamentContainer
      v-else
      :tournament-id="route.params.tournamentId as string"
    />
  </div>
</template>
