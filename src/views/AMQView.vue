<script setup lang="ts">
import TournamentContainer from "@/components/amq/TournamentContainer.vue";
import TournamentList from "@/components/amq/TournamentList.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
import DiscordLogin from "@/components/discord/DiscordLogin.vue";
import { useRoute, useRouter } from "vue-router";
import { useDiscord } from "@/stores/discord";

const route = useRoute();
const router = useRouter();
const discord = useDiscord();

const deselectTournament = () => {
  router.push({ name: "amq", params: { tournamentId: null } });
};
</script>

<template>
  <div class="w-full h-full p-6 amq overflow-y-auto">
    <div class="w-full flex justify-between mb-4">
      <button class="underline w-auto mb-4" @click="deselectTournament()">
        <h1>AMQ Tournaments</h1>
      </button>
      <div class="flex gap-4">
        <button
          class="bg-slate-800 bg-opacity-40 transition hover:scale-105 border border-solid border-slate-950 drop-shadow-lg rounded-2xl cursor-pointer overflow-hidden no-select p-4"
          :disabled="!discord.user"
          @click="router.push('/amq/dashboard')"
        >
          Dashboard
        </button>
        <DiscordLogin />
      </div>
    </div>

    <template v-if="!route.params.tournamentId">
      <Suspense>
        <TournamentList></TournamentList>
        <template #fallback><LoadSpinner></LoadSpinner></template>
      </Suspense>
    </template>

    <template v-else>
      <Suspense>
        <TournamentContainer
          :tournament-id="(route.params.tournamentId as string)"
        />
        <template #fallback><LoadSpinner></LoadSpinner></template>
      </Suspense>
    </template>
  </div>
</template>
