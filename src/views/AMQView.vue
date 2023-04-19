<script setup lang="ts">
import axios from "axios";
import type { ITournament } from "@/helpers/AMQ";
import AmqPlaylists from "@/components/amq/AmqPlaylists.vue";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import GroupDetails from "@/components/amq/GroupDetails.vue";
import GeneralInfo from "@/components/amq/GeneralInfo.vue";
import { ref, onMounted, onUnmounted } from "vue";

const tournament: ITournament = (
  await axios.get(
    `${import.meta.env.VITE_API_URL}amq/tournament/643eeccf2d2885378cc510db`
  )
)?.data;

const detailsPlayers = ref(null);
const detailsGroups = ref(null);
let detailsPlayersAnimation: DetailsAnimation | null = null;
let detailsGroupsAnimation: DetailsAnimation | null = null;

onMounted(() => {
  if (detailsPlayers.value) {
    detailsPlayersAnimation = new DetailsAnimation(detailsPlayers.value, 500);
  }
  if (detailsGroups.value) {
    detailsGroupsAnimation = new DetailsAnimation(detailsGroups.value, 500);
  }
});
onUnmounted(() => {
  detailsPlayersAnimation?.destructor();
  detailsPlayersAnimation = null;
  detailsGroupsAnimation?.destructor();
  detailsGroupsAnimation = null;
});
</script>

<template>
  <div class="m-6">
    <h1 class="mx-auto w-full mb-8 text-center text-lg font-bold">
      SPECIAL AMQ OVERVIEW
    </h1>
    <hr />
    <hr />
    <div class="mt-2 mb-4">
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
    <div class="mt-2 mb-4">
      <details ref="detailsGroups">
        <summary class="font-bold text-lg">Groups</summary>
        <div class="details-content">
          <GroupDetails :tournament="tournament" />
        </div>
      </details>
    </div>
    <hr />
    <hr />
    <div class="mt-2 mb-4 flex flex-col gap-4">
      <h2 class="font-bold text-lg">Overall Stats & Info</h2>
      <GeneralInfo :tournament="tournament" />
    </div>
  </div>
</template>
