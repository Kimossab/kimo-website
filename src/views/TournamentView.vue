<script setup lang="ts">
import TournamentContainer from "@/components/amq/TournamentContainer.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import { ButtonVariants } from "@/types";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<template>
  <div class="w-full h-full p-6 tournament overflow-y-auto">
    <SimpleButton :variant="ButtonVariants.Small" @click="router.back()"
      >Go Back</SimpleButton
    >
    <Suspense>
      <TournamentContainer
        :tournament-id="(route.params.tournamentId as string)"
      />
      <template #fallback><LoadSpinner></LoadSpinner></template>
    </Suspense>
  </div>
</template>
