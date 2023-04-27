<script setup lang="ts">
import axios from "axios";
import {
  getPlayerStats,
  type ITournament,
  type PlayerStats as TypePlayerStats,
} from "@/helpers/AMQ";
import AmqPlaylists from "@/components/amq/AmqPlaylists.vue";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import GeneralInfo from "@/components/amq/GeneralInfo.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import GroupPhase from "@/components/amq/GroupPhase.vue";
import SimpleTable from "@/components/SimpleTable.vue";
import AmqDifficulty from "@/components/amq/AmqDifficulty.vue";

const tournament: ITournament = (
  await axios.get(
    `${import.meta.env.VITE_API_URL}amq/tournament/643eeccf2d2885378cc510db`
  )
)?.data;

const playerStats = getPlayerStats(tournament);

const detailsPlayers = ref(null);
let detailsPlayersAnimation: DetailsAnimation | null = null;
const detailsPlayersStats = ref(null);
let detailsPlayersStatsAnimation: DetailsAnimation | null = null;

onMounted(() => {
  if (detailsPlayers.value) {
    detailsPlayersAnimation = new DetailsAnimation(detailsPlayers.value, 500);
  }
  if (detailsPlayersStats.value) {
    detailsPlayersStatsAnimation = new DetailsAnimation(
      detailsPlayersStats.value,
      500
    );
  }
});
onUnmounted(() => {
  detailsPlayersAnimation?.destructor();
  detailsPlayersAnimation = null;
  detailsPlayersStatsAnimation?.destructor();
  detailsPlayersStatsAnimation = null;
});

const playerStatsSort = ref<{
  header: keyof TypePlayerStats;
  direction: "ASC" | "DESC";
}>({ header: "name", direction: "ASC" });

const onPlayerStatsSort = (key: string) => {
  const value = playerStatsSort.value;
  if (value.header !== key) {
    playerStatsSort.value = {
      header: key as keyof TypePlayerStats,
      direction: "DESC",
    };
  } else {
    value.direction = value.direction === "ASC" ? "DESC" : "ASC";
  }
};

const sortedPlayerStats = computed(() => {
  const value = playerStatsSort.value;

  return [...playerStats].sort((a, b) => {
    if (value.direction === "ASC") {
      if (typeof a[value.header] === "string") {
        return a[value.header]
          .toString()
          .localeCompare(b[value.header].toString());
      } else {
        return Number(a[value.header]) - Number(b[value.header]);
      }
    } else {
      if (typeof a[value.header] === "string") {
        return b[value.header]
          .toString()
          .localeCompare(a[value.header].toString());
      } else {
        return Number(b[value.header]) - Number(a[value.header]);
      }
    }
  });
});
</script>

<template>
  <div class="m-6">
    <h1 class="mx-auto w-full mb-8 text-center text-lg font-bold">
      SPECIAL AMQ OVERVIEW
    </h1>
    <hr />
    <hr />
    <div class="my-4">
      <details ref="detailsPlayers">
        <summary class="font-bold text-lg">Players & Playlists</summary>
        <div class="details-content">
          <AmqPlaylists :tournament="tournament" />
          <div class="flex flex-col"></div>
        </div>
      </details>
    </div>
    <hr />
    <hr />
    <GroupPhase
      v-for="phase in tournament.phases"
      :key="`phase-${phase.order}`"
      :tournament="tournament"
      class="my-4"
      :phase="phase"
    />

    <hr />
    <hr />
    <div class="my-4 flex flex-col">
      <details ref="detailsPlayersStats">
        <summary class="font-bold text-lg">Player Stats</summary>
        <div class="details-content">
          <SimpleTable
            id="playerStats"
            :headers="[
              { title: 'Player', key: 'name', size: '5rem', sortable: true },
              { title: 'Matches', key: 'matches', sortable: true },
              { title: 'Total Musics', key: 'totalMusics', sortable: true },
              { title: 'Wins', key: 'wins', sortable: true },
              { title: 'Total Points', key: 'totalPoints', sortable: true },
              {
                title: 'From Playlist',
                key: 'musicsFromPlaylist',
                sortable: true,
              },
              {
                title: 'Avg. Difficulty',
                key: 'averageMusicDifficulty',
                sortable: true,
              },
              {
                title: 'Correct From Other Playlist',
                key: 'guessesFromOtherPlaylists',
                sortable: true,
              },
            ]"
            :data-length="sortedPlayerStats.length"
            :sort="playerStatsSort"
            @sort="onPlayerStatsSort"
          >
            <template
              v-for="(player, idx) in sortedPlayerStats"
              :key="`player-stats-${player.name}`"
              #[`row-${idx}`]
            >
              <div class="text-center">{{ player.name }}</div>
              <div class="text-center">{{ player.matches }}</div>
              <div class="text-center">{{ player.totalMusics }}</div>
              <div class="text-center">{{ player.wins }}</div>
              <div class="text-center">{{ player.totalPoints }}</div>
              <div class="text-center">{{ player.musicsFromPlaylist }}</div>
              <div class="text-center">
                <AmqDifficulty
                  class="grow-0"
                  :difficulty="player.averageMusicDifficulty"
                />
              </div>
              <div class="text-center">
                {{ player.guessesFromOtherPlaylists }}
              </div>
            </template>
          </SimpleTable>
        </div>
      </details>
    </div>

    <hr />
    <hr />
    <div class="mt-4 flex flex-col gap-4">
      <h2 class="font-bold text-lg">Overall Stats & Info</h2>
      <GeneralInfo :tournament="tournament" />
    </div>
  </div>
</template>
