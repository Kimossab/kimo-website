<script setup lang="ts">
import SimpleTab from "@/components/SimpleTab.vue";
import { type Anime, type Group, type Song } from "@/helpers/AMQ";
import TournamentGroup from "./TournamentGroup.vue";

interface Props {
  animes: Anime[];
  songs: Song[];
  groups: Group[];
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
      <TournamentGroup :group="group" :animes="animes" :songs="songs" />
    </template>
  </SimpleTab>
</template>
