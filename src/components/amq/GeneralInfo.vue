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
import { AmqTournament } from "@/helpers/AmqTournament";

const tournament = await AmqTournament.getInstance();

const { animes, artists, songs, tags, genres, seasons } = tournament.details;
const graphs = tournament.graphData;
const meta = tournament.meta;

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
    :name="`${animes.length} Animes`"
    :data="
      animes.map(([anime, count]) => [
        { key: anime.romaji, title: anime.romaji },
        count,
      ])
    "
    :graph="graphs.animes"
  />
  <SingleDetails
    :name="`${artists.length} Artists`"
    :data="
      artists.map(([artist, count]) => [{ key: artist, title: artist }, count])
    "
    :graph="graphs.artists"
  />
  <SingleDetails
    :name="`${songs.length} Songs`"
    :data="
      songs.map(([song, count]) => [
        { key: song.name, title: song.name, subtitle: song.artist },
        count,
      ])
    "
  />
  <SingleDetails
    :name="`${tags.length} Tags`"
    :data="tags.map(([tag, count]) => [{ key: tag, title: tag }, count])"
    :graph="graphs.tags"
  />
  <SingleDetails
    :name="`${genres.length} Genres`"
    :data="
      genres.map(([genre, count]) => [{ key: genre, title: genre }, count])
    "
    :graph="graphs.genres"
  />
  <SingleDetails
    name="Seasons"
    :data="
      seasons.map(([season, count]) => [{ key: season, title: season }, count])
    "
    :graph="graphs.seasons"
  />
  <div class="flex flex-wrap gap-4">
    <div class="rounded border p-2">
      Average difficulty: {{ meta.averageDifficulty }}
    </div>
    <div class="rounded border p-2">
      Average anime score: {{ meta.averageAnimeScore }}
    </div>
    <div class="rounded border p-2">
      Songs shared between players: {{ meta.repeatedSongs }}
    </div>
  </div>
</template>
