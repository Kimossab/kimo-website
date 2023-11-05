<script setup lang="ts">
import LoadSpinner from "@/components/LoadSpinner.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import PlayerValidation from "@/components/amq/tournament/PlayerValidation.vue";
import AddPlayerModal from "@/components/amq/tournament/AddPlayerModal.vue";
import DiscordLogin from "@/components/discord/DiscordLogin.vue";
import { TournamentStatus, type ITournament } from "@/helpers/AMQ";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants, type Playlist, type TournamentPlayer } from "@/types";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AnilistUser from "@/components/amq/dashboard/AnilistUser.vue";
import { useAnilist } from "@/stores/anilist";
import BaseModal from "@/components/BaseModal.vue";
import NewPhaseModal from "@/components/amq/tournament/NewPhaseModal.vue";
import SimpleTab from "@/components/SimpleTab.vue";

const route = useRoute();
const router = useRouter();
const discord = useDiscord();
const anilist = useAnilist();
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
const validating = ref<TournamentPlayer | null>(null);
const addPlayerModal = ref<boolean>(false);
const confirmUpdateAnilist = ref<boolean>(false);
const confirmUpdateAnilistPlayer = ref<TournamentPlayer | null>(null);
const newPhaseModal = ref<boolean>(false);

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
  const id = await discord.createTournament(
    tournamentData.value!.name,
    !tournamentData.value!.public
  );

  router.push({ name: "tournament-edit", params: { tournament: id } });
};

const update = (tournament: ITournament) => {
  updateData(tournament);
  validating.value = null;
};

const addToTournament = async (name: string, playlist: Playlist) => {
  const tournamentD = await discord.manualJoinTournament(
    tournamentData.value!._id,
    name,
    playlist
  );
  updateData(tournamentD);
  addPlayerModal.value = false;
};

const closeConfirmAnilist = () => {
  confirmUpdateAnilist.value = false;
  confirmUpdateAnilistPlayer.value = null;
};

const updateAnilist = async () => {
  const playlists = await anilist.getUserPlaylists();
  const allAnimesIds = playlists!.lists.reduce<
    Record<
      number,
      {
        id: number;
        mediaId: number;
        private: boolean;
        customLists: {
          name: string;
          enabled: boolean;
        }[];
      }
    >
  >((acc, cur) => {
    for (const entry of cur.entries) {
      if (!acc[entry.mediaId]) {
        acc[entry.mediaId] = entry;
      }
    }
    return acc;
  }, {});

  if (
    playlists!.lists.find(
      (l) => l.name === confirmUpdateAnilistPlayer.value!.name
    )
  ) {
    await anilist.deleteList(confirmUpdateAnilistPlayer.value!.name);
  }

  await anilist.createList([
    ...playlists!.lists.filter((l) => l.isCustomList).map((l) => l.name),
    confirmUpdateAnilistPlayer.value!.name,
  ]);

  await anilist.setEntriesToPrivate(
    Object.values(allAnimesIds).map((o) => o.id)
  );

  for (const anime of confirmUpdateAnilistPlayer.value?.playlist.animeList ??
    []) {
    if (allAnimesIds[Number(anime.anilistId)]) {
      await anilist.UpdateAnime(allAnimesIds[Number(anime.anilistId)].id, [
        ...allAnimesIds[Number(anime.anilistId)].customLists
          .filter((c) => c.enabled)
          .map((c) => c.name),
        confirmUpdateAnilistPlayer.value!.name,
      ]);
    } else {
      await anilist.addAnime(Number(anime.anilistId), [
        confirmUpdateAnilistPlayer.value!.name,
      ]);
    }
  }

  closeConfirmAnilist();
};

const phaseTabs = computed(() => {
  return tournamentData.value.phases.map((p) => ({
    title: `Phase ${p.order}`,
    label: `phase-${p.order}`,
    groups: p.groups,
  }));
});
</script>

<template>
  <AddPlayerModal
    v-if="addPlayerModal"
    @select="addToTournament"
    @cancel="addPlayerModal = false"
  />
  <PlayerValidation
    v-if="validating && tournamentData"
    :player="validating"
    :tournament-id="tournamentData!._id"
    @cancel="validating = null"
    @update="update"
  />
  <NewPhaseModal
    v-if="newPhaseModal"
    :tournament="tournamentData"
    @update="
      (t) => {
        update(t);
        newPhaseModal = false;
      }
    "
    @cancel="newPhaseModal = false"
  />
  <BaseModal v-if="confirmUpdateAnilist" @close="closeConfirmAnilist">
    <template #header>Confirm Anilist Update</template>

    <div>
      This will make changes to your anilist anime list. Do you wish to
      continue?
    </div>

    <template #footer>
      <div class="flex justify-end gap-4">
        <SimpleButton :variant="ButtonVariants.Small" @click="updateAnilist">
          Accept
        </SimpleButton>
        <SimpleButton
          :variant="ButtonVariants.Small"
          @click="closeConfirmAnilist"
        >
          Cancel
        </SimpleButton>
      </div>
    </template>
  </BaseModal>
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
          <input v-model="tournamentData.name" name="tournament-name" />
        </div>

        <div class="flex">
          <label>
            <input v-model="tournamentData.public" type="checkbox" />
            <span>
              The tournament is public (tournament will appear in the list of
              tournaments)</span
            >
          </label>
        </div>

        <div class="flex gap-2">
          <span>Status:</span>
          <span>{{ tournamentData.status }}</span>
          <SimpleButton
            :variant="ButtonVariants.Small"
            :disabled="!tournamentData.name"
            @click="newPhaseModal = true"
          >
            Create new phase
          </SimpleButton>
        </div>

        <SimpleTab v-if="tournamentData.phases.length" :sections="phaseTabs">
          <template
            v-for="phase of phaseTabs"
            :key="phase.label"
            #[phase.label]
          >
            <div
              v-for="(group, index) in phase.groups"
              :key="JSON.stringify(group)"
              class="flex gap-2"
            >
              <span>Group {{ index + 1 }}:</span>
              <code v-for="player in group.players" :key="player">
                {{
                  tournamentData.players.find((p) => p.discordId === player)
                    ?.name || player
                }}
              </code>
            </div>
          </template>
        </SimpleTab>
      </div>

      <div class="flex justify-end">
        <SimpleButton
          :variant="ButtonVariants.Small"
          :disabled="!tournamentData.name"
          @click="save"
          >{{ isEdit ? "Save" : "Create" }}</SimpleButton
        >
      </div>

      <AnilistUser />

      <div class="border rounded-2xl p-4 flex flex-col">
        <h3>Players</h3>
        <div
          v-for="player in tournamentData.players"
          :key="player.discordId"
          class="w-full flex justify-between items-start gap-2 border-t border-solid py-4"
        >
          <span>
            {{ player.name }}
            <span
              v-if="!player.approved"
              class="text-xs bg-orange-500 bg-opacity-25 p-1 rounded"
            >
              Waiting Approval
            </span>
            <span v-else class="text-xs bg-green-700 bg-opacity-25 p-1 rounded">
              Approved
            </span>
          </span>

          <div class="flex gap-2 shrink-0">
            <SimpleButton
              v-if="anilist.user"
              :variant="ButtonVariants.Small"
              @click="
                confirmUpdateAnilist = true;
                confirmUpdateAnilistPlayer = player;
              "
            >
              Update Anilist
            </SimpleButton>
            <SimpleButton
              :variant="ButtonVariants.Small"
              :disabled="player.approved"
              @click="validating = player"
            >
              Check
            </SimpleButton>
            <SimpleButton
              :variant="ButtonVariants.Small"
              :disabled="tournamentData.status !== TournamentStatus.Open"
            >
              Remove
            </SimpleButton>
          </div>
        </div>
        <div class="flex justify-center border-t p-4">
          <SimpleButton
            v-if="tournamentData.status === TournamentStatus.Open"
            :variant="ButtonVariants.Small"
            @click="addPlayerModal = true"
          >
            Add Player
          </SimpleButton>
        </div>
      </div>
    </div>
    <LoadSpinner v-else />
  </div>
</template>
