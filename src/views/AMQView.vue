<script setup lang="ts">
import TournamentContainer from "@/components/amq/TournamentContainer.vue";
import TournamentList from "@/components/amq/TournamentList.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();
const deselectTournament = () => {
  router.push({ name: "amq", params: { tournamentId: null } });
};
</script>

<template>
  <div class="w-full h-full p-4 amq overflow-y-auto">
    <button class="underline w-auto mb-4" @click="deselectTournament()">
      <h1>AMQ Tournaments</h1>
    </button>

    <template v-if="!route.params.tournamentId">
      <Suspense>
        <TournamentList></TournamentList>
        <template #fallback><div>Loading...</div></template>
      </Suspense>
    </template>

    <template v-else>
      <Suspense>
        <TournamentContainer
          :tournament-id="(route.params.tournamentId as string)"
        />
        <template #fallback><div>Loading...</div></template>
      </Suspense>
    </template>
  </div>
</template>
