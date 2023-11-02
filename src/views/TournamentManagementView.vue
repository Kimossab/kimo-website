<script setup lang="ts">
import LoadSpinner from "@/components/LoadSpinner.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import DiscordLogin from "@/components/discord/DiscordLogin.vue";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants } from "@/types";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const discord = useDiscord();
discord.load();

const isEdit = !!route.params.tournament;

const tournamentName = ref<string>("");
const isPrivate = ref<boolean>(false);
const isLoading = ref<boolean>(isEdit);

if (isEdit) {
  discord
    .getTournament(route.params.tournament as string)
    .then((tournament) => {
      tournamentName.value = tournament.name;
      isPrivate.value = !tournament.public;
      isLoading.value = false;
    });
}

const save = async () => {
  const id = await discord.createTournament(
    tournamentName.value,
    isPrivate.value
  );

  router.push({ name: "tournament-edit", params: { tournament: id } });
};
</script>

<template>
  <div
    class="w-full px-content-padding mx-auto h-full tournament-create overflow-y-auto"
  >
    <div
      v-if="!discord.isLoading && !isLoading"
      class="mb-4 mt-2 flex flex-col gap-4"
    >
      <div class="w-full flex justify-between mb-4">
        <div class="flex gap-4 items-center">
          <SimpleButton
            :variant="ButtonVariants.Small"
            @click="router.push({ name: 'amqDashboard' })"
            >Go Back</SimpleButton
          >
          <h1>{{ isEdit ? "Manage Tournament" : "Create Tournament" }}</h1>
        </div>

        <div class="flex gap-4">
          <DiscordLogin />
        </div>
      </div>

      <div class="border rounded-2xl p-4 flex flex-col gap-4">
        <h3>Tournament Details</h3>

        <div class="flex-col flex">
          <label for="tournament-name">Tournament name:</label>
          <input v-model="tournamentName" name="tournament-name" />
        </div>

        <div class="flex">
          <label>
            <input v-model="isPrivate" type="checkbox" />
            <span>
              The tournament is private (people can only join by adding manually
              or with a direct link)</span
            >
          </label>
        </div>
      </div>

      <div class="flex justify-end">
        <SimpleButton
          :variant="ButtonVariants.Small"
          :disabled="!tournamentName"
          @click="save"
          >{{ isEdit ? "Save" : "Create" }}</SimpleButton
        >
      </div>
    </div>
    <LoadSpinner v-else />
  </div>
</template>
