<script setup lang="ts">
import SimpleTable from "@/components/SimpleTable.vue";
import SimpleTab from "@/components/SimpleTab.vue";
import { type Group, type ITournament } from "@/helpers/AMQ";
import TournamentMatch from "./TournamentMatch.vue";

interface Props {
  tournament: ITournament;
  group: Group;
}
const props = defineProps<Props>();

const players = props.group.players.reduce<
  Record<
    string,
    {
      player: string;
      matches: number;
      wins: number;
      draws: number;
      losses: number;
      correct: number;
      c_diff: number;
    }
  >
>(
  (acc, p) => ({
    ...acc,
    [p]: {
      player:
        props.tournament.players.find((player) => player.discordId === p)
          ?.name || p,
      matches: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      correct: 0,
      c_diff: 0,
    },
  }),
  {}
);

for (const match of props.group.matches) {
  players[match.player1].matches++;
  players[match.player2].matches++;

  if (match.p1Points > match.p2Points) {
    players[match.player1].wins++;
    players[match.player2].losses++;
  } else if (match.p1Points < match.p2Points) {
    players[match.player2].wins++;
    players[match.player1].losses++;
  } else {
    players[match.player2].draws++;
    players[match.player1].draws++;
  }

  players[match.player1].correct += match.p1Points;
  players[match.player2].correct += match.p2Points;

  players[match.player1].c_diff += match.p1Points - match.p2Points;
  players[match.player2].c_diff += match.p2Points - match.p1Points;
}

const mapData = Object.values(players);
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
        title: `${match.player1} (${match.p1Points}) x (${match.p2Points}) ${match.player2}`,
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
