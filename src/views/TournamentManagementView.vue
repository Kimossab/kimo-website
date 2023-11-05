<script setup lang="ts">
import LoadSpinner from "@/components/LoadSpinner.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import DiscordLogin from "@/components/discord/DiscordLogin.vue";
import { TournamentStatus, type ITournament } from "@/helpers/AMQ";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants } from "@/types";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AnilistUser from "@/components/amq/dashboard/AnilistUser.vue";
import TournamentDetails from "@/components/amq/dashboard/TournamentDetails.vue";
import TournamentStatusDetails from "@/components/amq/dashboard/TournamentStatusDetails.vue";
import TournamentPlayerDetails from "@/components/amq/dashboard/TournamentPlayerDetails.vue";

const route = useRoute();
const router = useRouter();
const discord = useDiscord();
discord.load();

const isEdit = !!route.params.tournament;

const tournamentData = ref<ITournament>({
  _id: "",
  animes: [],
  creator: "",
  hasBegun: false,
  name: "",
  phases: [],
  players: [],
  public: false,
  serverId: "",
  songs: [],
  status: TournamentStatus.Open,
});
const isLoading = ref<boolean>(isEdit);

if (isEdit) {
  discord.load().then(() =>
    discord
      .getTournament(route.params.tournament as string)
      .then((tournament) => {
        updateData(tournament);
      })
  );
}

const updateData = (tournament: ITournament) => {
  tournamentData.value = JSON.parse(JSON.stringify(tournament));
  isLoading.value = false;
};

const save = async () => {
  // TODO: UPDATE
  const id = await discord.createTournament(
    tournamentData.value!.name,
    !tournamentData.value!.public
  );

  router.push({ name: "tournament-edit", params: { tournament: id } });
};

const update = (tournament: ITournament) => {
  updateData(tournament);
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
          >
            Go Back
          </SimpleButton>
          <h1>{{ isEdit ? "Manage Tournament" : "Create Tournament" }}</h1>
        </div>

        <div class="flex gap-4">
          <DiscordLogin />
        </div>
      </div>

      <div class="border rounded-2xl p-4 flex flex-col gap-4">
        <TournamentDetails
          v-model:name="tournamentData.name"
          v-model:public="tournamentData.public"
        />

        <TournamentStatusDetails
          :tournament="tournamentData"
          @update="update"
        />
      </div>

      <div class="flex justify-end">
        <SimpleButton
          :variant="ButtonVariants.Small"
          :disabled="!tournamentData.name || tournamentData._id !== ''"
          @click="save"
          >{{ isEdit ? "Save" : "Create" }}</SimpleButton
        >
      </div>

      <AnilistUser />

      <div class="border rounded-2xl p-4 flex flex-col">
        <TournamentPlayerDetails
          :tournament="tournamentData"
          @update="update"
        />
      </div>
    </div>
    <LoadSpinner v-else />
  </div>
</template>
