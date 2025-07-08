<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import { TournamentStatus, type ITournament } from "@/helpers/AMQ";
import { useAnilist } from "@/stores/anilist";
import { ButtonVariants, type Playlist, type TournamentPlayer } from "@/types";
import { ref } from "vue";
import AddPlayerModal from "../tournament/AddPlayerModal.vue";
import PlayerValidation from "../tournament/PlayerValidation.vue";
import { useDiscord } from "@/stores/discord";

interface Props {
  tournament: ITournament;
}
type Emits = (e: "update", data: ITournament) => void;

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const anilist = useAnilist();
const discord = useDiscord();

const validating = ref<TournamentPlayer | null>(null);
const addPlayerModal = ref<boolean>(false);
const confirmUpdateAnilist = ref<boolean>(false);
const confirmUpdateAnilistPlayer = ref<TournamentPlayer | null>(null);

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

const addToTournament = async (name: string, playlist: Playlist) => {
  const tournamentD = await discord.manualJoinTournament(
    props.tournament._id,
    name,
    playlist
  );
  emit("update", tournamentD);
  addPlayerModal.value = false;
};

const update = (tournament: ITournament) => {
  emit("update", tournament);
  validating.value = null;
};
</script>

<template>
  <AddPlayerModal
    v-if="addPlayerModal"
    @select="addToTournament"
    @cancel="addPlayerModal = false"
  />
  <PlayerValidation
    v-if="validating && tournament"
    :player="validating"
    :tournament-id="tournament!._id"
    @cancel="validating = null"
    @update="update"
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
  <h3>Players</h3>
  <div
    v-for="player in tournament.players"
    :key="player.discordId"
    class="w-full flex justify-between items-start gap-2 border-t border-solid py-4"
  >
    <span>
      {{ player.name }}
      <span
        v-if="!player.approved"
        class="text-xs bg-orange-500/25 p-1 rounded-sm"
      >
        Waiting Approval
      </span>
      <span v-else class="text-xs bg-green-700/25 p-1 rounded-sm">
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
        :disabled="tournament.status !== TournamentStatus.Open"
      >
        Remove
      </SimpleButton>
    </div>
  </div>
  <div class="flex justify-center border-t p-4">
    <SimpleButton
      v-if="tournament.status === TournamentStatus.Open"
      :variant="ButtonVariants.Small"
      @click="addPlayerModal = true"
    >
      Add Player
    </SimpleButton>
  </div>
</template>
