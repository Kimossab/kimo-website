<script setup lang="ts">
import SimpleButton from "@/components/SimpleButton.vue";
import DiscordLogin from "@/components/discord/DiscordLogin.vue";
import TournamentPlayers from "@/components/amq/tournament/TournamentPlayers.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
import { ButtonVariants } from "@/types";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { type ITournament } from "@/helpers/AMQ";
import { useDiscord } from "@/stores/discord";
import TournamentPhases from "@/components/amq/tournament/TournamentPhases.vue";
import TournamentStats from "@/components/amq/tournament/TournamentStats.vue";

const route = useRoute();
const router = useRouter();
const discord = useDiscord();

const tournament = ref<ITournament | null>(null);

discord.load().then(() => {
  discord
    .getTournament(route.params.tournamentId as string)
    .then((t) => (tournament.value = t));
});
</script>

<template>
  <div
    class="w-full px-content-padding mx-auto h-full tournament overflow-y-auto pt-2"
  >
    <div class="w-full flex justify-between mb-4">
      <div class="flex gap-4 items-center">
        <SimpleButton :variant="ButtonVariants.Small" @click="router.back()"
          >Go Back</SimpleButton
        >
        <h1>Tournament details</h1>
      </div>

      <div class="flex gap-4">
        <button
          v-if="discord.user"
          class="bg-slate-800/40 transition hover:scale-105 border border-solid border-slate-950 drop-shadow-lg rounded-2xl cursor-pointer overflow-hidden no-select p-4"
          :disabled="!discord.user"
          @click="router.push('/amq/dashboard')"
        >
          Dashboard
        </button>
        <DiscordLogin />
      </div>
    </div>

    <div v-if="tournament !== null" class="mb-4 mt-2 flex flex-col gap-4">
      <h2>{{ tournament.name }}</h2>

      <div class="border rounded-2xl p-4">
        <h3>Players</h3>
        <TournamentPlayers
          :tournament="tournament"
          @update="(t) => (tournament = t)"
        />
      </div>

      <div class="border rounded-2xl p-4">
        <h3>Groups & Matches</h3>
        <TournamentPhases :tournament="tournament" />
      </div>

      <div class="border rounded-2xl p-4">
        <h3>Stats & Facts</h3>
        <TournamentStats :tournament="tournament" />
      </div>
    </div>
    <LoadSpinner v-else />
  </div>
</template>
