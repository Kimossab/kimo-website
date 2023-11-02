<script setup lang="ts">
import LoadSpinner from "@/components/LoadSpinner.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import PlaylistList from "@/components/amq/dashboard/PlaylistList.vue";
import TournamentDashList from "@/components/amq/dashboard/TournamentDashList.vue";
import DiscordLogin from "@/components/discord/DiscordLogin.vue";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();
const discord = useDiscord();
discord.load();

const save = async () => {
  await discord.save();
};
</script>

<template>
  <div
    class="w-full px-content-padding mx-auto h-full amq-dashboard overflow-y-auto"
  >
    <div v-if="!discord.isLoading" class="mb-4 mt-2 flex flex-col gap-4">
      <div class="w-full flex justify-between mb-4">
        <div class="flex gap-4 items-center">
          <SimpleButton :variant="ButtonVariants.Small" @click="router.back()"
            >Go Back</SimpleButton
          >
          <h1>AMQ Dashboard</h1>
        </div>

        <div class="flex gap-4">
          <DiscordLogin />
        </div>
      </div>
      <div class="border rounded-2xl p-4">
        <h3>AMQ Details</h3>

        <div class="flex-col flex">
          <label for="amq-username">Username:</label>
          <input v-model="discord.playerData!.username" name="amq-username" />
        </div>
      </div>

      <div class="border rounded-2xl p-4">
        <h3 class="mb-2">Playlists</h3>
        <PlaylistList />
      </div>

      <div class="flex justify-end">
        <SimpleButton
          :variant="ButtonVariants.Small"
          :disabled="!discord.hasChanges"
          @click="save"
          >Save</SimpleButton
        >
      </div>

      <div class="border rounded-2xl p-4">
        <h3 class="mb-2">Your Tournaments</h3>
        <TournamentDashList />
      </div>
    </div>
    <LoadSpinner v-else />
  </div>
</template>
