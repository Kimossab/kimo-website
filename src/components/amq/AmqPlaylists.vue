<script setup lang="ts">
import type { ITournament, TournamentSong } from "@/helpers/AMQ";
import SinglePlaylist from "@/components/amq/SinglePlaylist.vue";

interface Props {
  tournament: ITournament;
}

const props = defineProps<Props>();
const playlists: { name: string; playlist: TournamentSong[] }[] =
  props.tournament.players.map((player) => ({
    name: player,
    playlist: props.tournament.songs
      .filter((song) => song.players.includes(player))
      .map((song) => ({
        name: song.name,
        artist: song.artist,
        anime: props.tournament.animes.find((a) => a.romaji === song.anime)!,
        difficulty: song.difficulty,
        type: song.type,
        typeNumber: song.typeNumber,
      })),
  }));
</script>

<template>
  <div class="flex flex-col">
    <SinglePlaylist
      v-for="{ name, playlist } of playlists"
      :key="name"
      :name="name"
      :playlist="playlist"
    />
  </div>
</template>
