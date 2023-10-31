<script setup lang="ts">
import axios from "axios";
import type { ITournament } from "@/helpers/AMQ";
import AmqPlaylists from "@/components/amq/AmqPlaylists.vue";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import GeneralInfo from "@/components/amq/GeneralInfo.vue";
import { ref, onMounted, onUnmounted } from "vue";
import GroupPhase from "@/components/amq/GroupPhase.vue";
import PlayerStats from "@/components/amq/PlayerStats.vue";

interface Props {
  tournamentId: string;
}

const props = defineProps<Props>();

const tournament: ITournament = (
  await axios.get(
    `${import.meta.env.VITE_API_URL}amq/tournament/${props.tournamentId}`
  )
)?.data;

const detailsPlayers = ref(null);
let detailsPlayersAnimation: DetailsAnimation | null = null;
const detailsPlayersStats = ref(null);
let detailsPlayersStatsAnimation: DetailsAnimation | null = null;

onMounted(() => {
  if (detailsPlayers.value) {
    detailsPlayersAnimation = new DetailsAnimation(detailsPlayers.value, 500);
  }
  if (detailsPlayersStats.value) {
    detailsPlayersStatsAnimation = new DetailsAnimation(
      detailsPlayersStats.value,
      500
    );
  }
});
onUnmounted(() => {
  detailsPlayersAnimation?.destructor();
  detailsPlayersAnimation = null;
  detailsPlayersStatsAnimation?.destructor();
  detailsPlayersStatsAnimation = null;
});
</script>

<template>
  <h2>{{ tournament.name }}</h2>
  <div class="my-4">
    <details ref="detailsPlayers">
      <summary class="font-bold text-lg">Players & Playlists</summary>
      <div class="details-content">
        <AmqPlaylists :tournament="tournament" />
        <div class="flex flex-col"></div>
      </div>
    </details>
  </div>
  <hr />
  <hr />
  <GroupPhase
    v-for="phase in tournament.phases"
    :key="`phase-${phase.order}`"
    :tournament="tournament"
    class="my-4"
    :phase="phase"
  />

  <hr />
  <hr />
  <div class="my-4 flex flex-col">
    <details ref="detailsPlayersStats">
      <summary class="font-bold text-lg">Player Stats</summary>
      <div class="details-content">
        <PlayerStats :tournament="tournament" />
      </div>
    </details>
  </div>

  <hr />
  <hr />
  <div class="mt-4 flex flex-col gap-4">
    <h2 class="font-bold text-lg">Overall Stats & Info</h2>
    <GeneralInfo :tournament="tournament" />
  </div>
</template>
