<script setup lang="ts">
import SimpleTable from "@/components/SimpleTable.vue";
import SimpleTab from "@/components/SimpleTab.vue";
import {
  type Group,
  type ITournament,
  getPlayersMatchStats,
  sortedPlayerData,
} from "@/helpers/AMQ";
import TournamentMatch from "./TournamentMatch.vue";

interface Props {
  tournament: ITournament;
  group: Group;
}
const props = defineProps<Props>();

const players = getPlayersMatchStats(props.group, props.tournament);

const mapData = sortedPlayerData(players);
</script>

<template>
  <SimpleTable
    :id="group._id"
    class="w-full"
    :headers="[
      { title: 'Player', key: 'player' },
      { title: 'Matches', key: 'matches' },
      { title: 'Wins', key: 'wins' },
      { title: 'Draws', key: 'draws' },
      { title: 'Losses', key: 'losses' },
      { title: 'Correct', key: 'correct' },
      { title: 'Correct Diff.', key: 'c_diff' },
    ]"
    :data="mapData"
  />
  <SimpleTab
    :sections="
      group.matches.map((match) => ({
        title: `${players[match.player1].player} (${match.p1Points}) x (${
          match.p2Points
        }) ${players[match.player2].player}`,
        label: match._id,
      }))
    "
  >
    <template v-for="match of group.matches" :key="match._id" #[match._id]>
      <TournamentMatch
        :match="match"
        :animes="tournament.animes"
        :songs="tournament.songs"
      />
    </template>
  </SimpleTab>
</template>
