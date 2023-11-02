<script setup lang="ts">
import TournamentList from "@/components/amq/TournamentList.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
import DiscordLogin from "@/components/discord/DiscordLogin.vue";
import { useRouter } from "vue-router";
import { useDiscord } from "@/stores/discord";

const router = useRouter();
const discord = useDiscord();

const deselectTournament = () => {
  router.push({ name: "amq" });
};
</script>

<template>
  <div
    class="w-full px-content-padding mx-auto h-full amq overflow-y-auto pt-2"
  >
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
    <Suspense>
      <TournamentList></TournamentList>
      <template #fallback><LoadSpinner></LoadSpinner></template>
    </Suspense>
  </div>
</template>
