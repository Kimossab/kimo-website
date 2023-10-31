<script setup lang="ts">
import {
  getPlayerStats,
  type ITournament,
  type PlayerStats as TypePlayerStats,
} from "@/helpers/AMQ";
import { ref, computed } from "vue";
import SimpleTable from "@/components/SimpleTable.vue";
import AmqDifficulty from "@/components/amq/AmqDifficulty.vue";

interface Props {
  tournament: ITournament;
}

enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

const props = defineProps<Props>();

const playerStats = getPlayerStats(props.tournament);

const playerStatsSort = ref<{
  header: keyof TypePlayerStats;
  direction: SortDirection;
}>({ header: "name", direction: SortDirection.ASC });

const onPlayerStatsSort = (key: string) => {
  const value = playerStatsSort.value;
  if (value.header !== key) {
    playerStatsSort.value = {
      header: key as keyof TypePlayerStats,
      direction: SortDirection.DESC,
    };
  } else {
    value.direction =
      value.direction === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
  }
};

const compare = <T = unknown>(
  direction: SortDirection,
  optionA: T,
  optionB: T
): number => {
  if (typeof optionA === "string" && typeof optionB === "string") {
    return direction === SortDirection.ASC
      ? optionA.toString().localeCompare(optionB.toString())
      : optionB.toString().localeCompare(optionA.toString());
  }

  return direction === SortDirection.ASC
    ? Number(optionA) - Number(optionB)
    : Number(optionB) - Number(optionA);
};

const sortedPlayerStats = computed(() => {
  const value = playerStatsSort.value;

  return [...playerStats].sort((a, b) =>
    compare(value.direction, a[value.header], b[value.header])
  );
});
</script>

<template>
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
      v-for="player in sortedPlayerStats"
      :key="`player-stats-${player.name}`"
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
</template>
