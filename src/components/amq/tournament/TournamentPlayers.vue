<script setup lang="ts">
import { type ITournament } from "@/helpers/AMQ";
import { computed, ref } from "vue";
import AmqDifficulty from "./AmqDifficulty.vue";
import { useDiscord } from "@/stores/discord";
import SimpleButton from "@/components/SimpleButton.vue";
import SingleAnime from "@/components/amq/SingleAnime.vue";
import { ButtonVariants, type Playlist } from "@/types";
import JoinModal from "./JoinModal.vue";
import SimpleTable from "@/components/SimpleTable.vue";
import SimpleTab from "@/components/SimpleTab.vue";

interface Props {
  tournament: ITournament;
}
interface Emits {
  (e: "update", data: ITournament): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const discord = useDiscord();

const showJoinModal = ref<boolean>(false);

const musics = (player: string) =>
  props.tournament.songs
    .filter((song) => song.players.includes(player))
    .map((song) => ({
      id: song._id,
      name: song.name,
      artist: song.artist,
      anime: props.tournament.animes.find((a) => a.anilistId === song.anime)!,
      difficulty: song.difficulty,
      type: song.type,
      typeNumber: song.typeNumber,
      themeLink: song.themeLink,
    }));
const animeList = (player: string) =>
  props.tournament.players.find(
    (p) => p.discordId === player || p.name === player
  )?.playlist?.animeList;

const difficulty = (musicList: ReturnType<typeof musics>) =>
  Math.round(
    musicList.reduce<number>((acc, song) => acc + song.difficulty, 0) /
      musicList.length
  );

const songTable = (musicList: ReturnType<typeof musics>) =>
  musicList.map((m) => ({
    id: m.id,
    title: m.name,
    artist: m.artist,
    anime: `${m.anime?.romaji} (${m.anime?.english})`,
    musicLink: m.themeLink ?? "",
    animeLink: `https://anilist.co/anime/${m.anime.anilistId}/`,
  }));

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

const playerMap = props.tournament.players.reduce<
  Record<
    string,
    {
      name: string;
      difficulty: ReturnType<typeof difficulty>;
      songTable: ReturnType<typeof songTable>;
      animeList: ReturnType<typeof animeList>;
    }
  >
>((acc, p) => {
  const player = p.discordId ?? p.name;
  const musicList = musics(player);

  return {
    ...acc,
    [player]: {
      name: p.name,
      difficulty: difficulty(musicList),
      songTable: songTable(musicList),
      animeList: animeList(player),
    },
  };
}, {});
</script>

<template>
  <JoinModal
    v-if="showJoinModal"
    @select="joinTournament"
    @cancel="showJoinModal = false"
  />
  <SimpleTab
    :sections="
      Object.keys(playerMap).map((s) => ({
        title: playerMap[s].name,
        label: s,
      }))
    "
  >
    <template v-for="(player, key) of playerMap" :key="key" #[key]>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <span>Difficulty:</span>
          <AmqDifficulty :difficulty="player.difficulty" />
        </div>
        <div class="flex justify-center flex-wrap gap-4">
          <SingleAnime
            v-for="anime in player.animeList ?? []"
            :key="JSON.stringify(anime)"
            :anime="anime"
            small
          ></SingleAnime>
        </div>
        <h3>Songs</h3>
        <SimpleTable
          id="song-list"
          :headers="[
            {
              title: 'Title',
              key: 'title',
              sortable: true,
              useLink: 'musicLink',
            },
            {
              title: 'Artist',
              key: 'artist',
              sortable: true,
            },
            {
              title: 'Anime',
              key: 'anime',
              sortable: true,
              useLink: 'animeLink',
            },
          ]"
          :data="player.songTable"
          :initial-sort="{ header: 'anime', direction: 'ASC' }"
        />
      </div>
    </template>
  </SimpleTab>
  <div class="flex justify-center mt-4">
    <SimpleButton
      v-if="canJoin"
      :variant="ButtonVariants.Small"
      @click="showJoinModal = true"
    >
      JOIN
    </SimpleButton>
  </div>
</template>
