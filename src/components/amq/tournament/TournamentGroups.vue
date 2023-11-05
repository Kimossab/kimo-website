<script setup lang="ts">
import SimpleTab from "@/components/SimpleTab.vue";
import { type Group, type ITournament } from "@/helpers/AMQ";
import TournamentGroup from "./TournamentGroup.vue";

interface Props {
  groups: Group[];
  tournament: ITournament;
}
defineProps<Props>();
</script>

<template>
  <SimpleTab
    :sections="
      groups.map((g, index) => ({
        title: `Group ${index + 1}`,
        label: g._id,
      }))
    "
  >
    <template v-for="group of groups" :key="group._id" #[group._id]>
      <TournamentGroup :group="group" :tournament="tournament" />
    </template>
  </SimpleTab>
</template>
