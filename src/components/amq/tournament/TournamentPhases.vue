<script setup lang="ts">
import SimpleTab from "@/components/SimpleTab.vue";
import { type ITournament } from "@/helpers/AMQ";
import TournamentGroups from "./TournamentGroups.vue";

interface Props {
  tournament: ITournament;
}
const props = defineProps<Props>();

const phaseList = props.tournament.phases.map((p) => ({
  headers: {
    title: `Phase ${p.order + 1}`,
    label: `phase-${p.order}`,
  },
  groups: p.groups,
}));
</script>

<template>
  <SimpleTab :sections="phaseList.map((p) => p.headers)">
    <template
      v-for="phase of phaseList"
      :key="phase.headers.label"
      #[phase.headers.label]
    >
      <TournamentGroups
        :groups="phase.groups"
        :animes="tournament.animes"
        :songs="tournament.songs"
      />
    </template>
  </SimpleTab>
</template>
