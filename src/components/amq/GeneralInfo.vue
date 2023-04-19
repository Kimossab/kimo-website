<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
} from "chart.js";
import SingleDetails from "./SingleDetails.vue";
import { getStatsAndInfo, type ITournament } from "@/helpers/AMQ";

interface Props {
  tournament: ITournament;
}

const props = defineProps<Props>();

const { data, graphs, meta } = getStatsAndInfo(props.tournament);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);
</script>

<template>
  <SingleDetails
    :name="`${data.anime.length} Animes`"
    :data="data.anime"
    :graph="graphs.anime"
  />
  <SingleDetails
    :name="`${data.artist.length} Artists`"
    :data="data.artist"
    :graph="graphs.artist"
  />
  <SingleDetails :name="`${data.song.length} Songs`" :data="data.song" />
  <SingleDetails
    :name="`${data.tag.length} Tags`"
    :data="data.tag"
    :graph="graphs.tag"
  />
  <SingleDetails
    :name="`${data.genre.length} Genres`"
    :data="data.genre"
    :graph="graphs.genre"
  />
  <SingleDetails
    :name="`${data.season.length} Seasons`"
    :data="data.season"
    :graph="graphs.season"
  />
  <div class="flex flex-wrap gap-4">
    <div class="rounded border p-2">
      Average difficulty: {{ meta.averageDifficulty }}
    </div>
    <div class="rounded border p-2">
      Average anime score: {{ meta.averageScore }}
    </div>
    <div class="rounded border p-2">
      Songs shared between players: {{ meta.shared }}
    </div>
  </div>
</template>
