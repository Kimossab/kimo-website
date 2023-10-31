<script setup lang="ts">
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const tournamentList: { id: string; name: string }[] = (
  await axios.get(`${import.meta.env.VITE_API_URL}amq/tournament/`)
)?.data;

const selectTournament = (id: string) => {
  router.push({ name: "amq", params: { tournamentId: id } });
};
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <button
      v-for="tournament in tournamentList"
      :key="tournament.id"
      class="h-20 bg-slate-800 bg-opacity-40 transition hover:scale-105 border border-solid border-slate-950 drop-shadow-lg rounded-2xl cursor-pointer overflow-hidden no-select"
      @click="selectTournament(tournament.id)"
    >
      <div class="text-xl dark:mix-blend-plus-lighter mix-blend-darken p-2">
        {{ tournament.name }}
      </div>
    </button>
  </div>
</template>
