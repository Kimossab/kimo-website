<script setup lang="ts">
import GeneralInfo from "@/components/amq/GeneralInfo.vue";
import SinglePlaylist from "@/components/amq/SinglePlaylist.vue";
import GroupDetails from "@/components/amq/GroupDetails.vue";
import { AmqTournament } from "@/helpers/AmqTournament";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import { ref, onMounted, onUnmounted } from "vue";

const tournament = await AmqTournament.getInstance();

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
          <div class="flex flex-col">
            <SinglePlaylist
              v-for="[name, playlist] of tournament.playlists"
              :key="name"
              :name="name"
              :playlist="playlist"
            />
          </div>
        </div>
      </details>
    </div>
    <hr />
    <hr />
    <div class="mt-2 mb-4">
      <details ref="detailsGroups">
        <summary class="font-bold text-lg">Groups</summary>
        <div class="details-content">
          <GroupDetails></GroupDetails>
        </div>
      </details>
    </div>
    <hr />
    <hr />
    <div class="mt-2 mb-4 flex flex-col gap-4">
      <h2 class="font-bold text-lg">Overall Stats & Info</h2>
      <GeneralInfo />
    </div>
  </div>
</template>
