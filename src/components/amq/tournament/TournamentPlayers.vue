<script setup lang="ts">
import { type ITournament } from "@/helpers/AMQ";
import { computed, ref } from "vue";
import AmqDifficulty from "./AmqDifficulty.vue";
import { useDiscord } from "@/stores/discord";
import SimpleButton from "@/components/SimpleButton.vue";
import SingleAnime from "@/components/amq/SingleAnime.vue";
import { ButtonVariants, type Playlist } from "@/types";
import JoinModal from "./JoinModal.vue";

interface Props {
  tournament: ITournament;
}
interface Emits {
  (e: "update", data: ITournament): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const discord = useDiscord();

const selectedPlayer = ref<string | null>(null);
const showJoinModal = ref<boolean>(false);

const player = computed(() =>
  props.tournament.players.find((p) => p.name === selectedPlayer.value)
);
const musics = computed(() =>
  props.tournament.songs
    .filter((song) => song.players.includes(selectedPlayer.value || ""))
    .map((song) => ({
      name: song.name,
      artist: song.artist,
      anime: props.tournament.animes.find((a) => a.romaji === song.anime)!,
      difficulty: song.difficulty,
      type: song.type,
      typeNumber: song.typeNumber,
    }))
);

const difficulty = computed(() =>
  Math.round(
    musics.value.reduce<number>((acc, song) => acc + song.difficulty, 0) /
      musics.value.length
  )
);

const canJoin = computed(
  () =>
    discord.playerData?.username &&
    discord.playerData?.playlists &&
    !props.tournament.players.find(
      (p) =>
        p.discordId === discord.user?.id ||
        p.name === discord.playerData?.username
    )
);

const joinTournament = async (playlist: Playlist) => {
  const tournamentData = await discord.joinTournament(
    props.tournament._id,
    playlist
  );
  showJoinModal.value = false;
  emits("update", tournamentData);
};
</script>

<template>
  <JoinModal
    v-if="showJoinModal"
    @select="joinTournament"
    @cancel="showJoinModal = false"
  />
  <div class="flex border-b mx-0 my-1">
    <button
      v-for="{ name } in tournament.players"
      :key="name"
      :class="[
        'mt-0 rounded-t-md p-2 text-sm  mb-1',
        {
          ' font-bold border-b-2 border-solid !border-blue-500':
            selectedPlayer === name,
        },
      ]"
      @click="selectedPlayer = selectedPlayer === name ? null : name"
    >
      {{ name }}
    </button>
  </div>
  <div v-if="player" class="flex flex-col gap-2">
    <div class="flex gap-2">
      <span>Difficulty:</span> <AmqDifficulty :difficulty="difficulty" />
    </div>
    <div class="flex justify-center flex-wrap gap-4">
      <SingleAnime
        v-for="anime in player.playlist.animeList"
        :key="JSON.stringify(anime)"
        :anime="anime"
        small
      ></SingleAnime>
    </div>
  </div>
  <div class="flex justify-center mt-4">
    <SimpleButton
      v-if="canJoin"
      :variant="ButtonVariants.Small"
      @click="showJoinModal = true"
      >JOIN</SimpleButton
    >
  </div>
</template>
