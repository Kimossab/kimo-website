<script setup lang="ts">
import SimpleButton from "@/components/SimpleButton.vue";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants } from "@/types";
import { useRouter } from "vue-router";

const discord = useDiscord();
const router = useRouter();
</script>

<template>
  <div v-if="!discord.playerData?.tournaments.length">
    You haven't created any tournament yet.
  </div>
  <div
    v-for="tournament in discord.playerData.tournaments"
    v-else
    :key="tournament.id"
    class="flex justify-between border-t py-4"
  >
    <div>{{ tournament.name }}</div>
    <div class="flex gap-2">
      <SimpleButton
        :variant="ButtonVariants.Small"
        @click="
          router.push({
            name: 'tournament-edit',
            params: { tournament: tournament.id },
          })
        "
        >Manage</SimpleButton
      >
      <SimpleButton
        :variant="ButtonVariants.Small"
        @click="
          router.push({
            name: 'tournament',
            params: { tournamentId: tournament.id },
          })
        "
        >View</SimpleButton
      >
    </div>
  </div>
  <div class="flex justify-center border-t pt-4">
    <SimpleButton
      :variant="ButtonVariants.Small"
      @click="router.push({ name: 'tournament-create' })"
      >Create new tournament</SimpleButton
    >
  </div>
</template>
