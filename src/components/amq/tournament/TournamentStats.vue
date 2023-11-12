<script setup lang="ts">
import SimpleTab from "@/components/SimpleTab.vue";
import SimpleTable from "@/components/SimpleTable.vue";
import type { Anime, ITournament } from "@/helpers/AMQ";
import { computed } from "vue";

interface Props {
  tournament: ITournament;
}

const props = defineProps<Props>();

const songMap = computed(() =>
  props.tournament.songs.reduce<
    Record<
      string,
      {
        id: string;
        name: string;
        artist: string;
        themeLink?: string;
        anime?: Anime;
        players: (string | undefined)[];
      }
    >
  >((acc, cur) => {
    acc[cur._id] = {
      id: cur._id,
      name: cur.name,
      artist: cur.artist,
      themeLink: cur.themeLink,
      anime: props.tournament.animes.find((a) => a.anilistId === cur.anime),
      players: cur.players.map(
        (p) =>
          props.tournament.players.find(
            (player) => player.discordId === p || player.name === p
          )?.name
      ),
    };
    return acc;
  }, {})
);

const playedCount = computed(() => {
  const count: Record<string, number> = props.tournament.songs.reduce<
    Record<string, number>
  >((acc, song) => {
    acc[song._id] = 0;
    return acc;
  }, {});

  for (const phase of props.tournament.phases) {
    for (const group of phase.groups) {
      for (const match of group.matches) {
        for (const song of match.songList) {
          count[song.song]++;
        }
      }
    }
  }

  return count;
});

const notPlayedSongsTable = computed(() => {
  const songList = Object.keys(playedCount.value).filter(
    (k) => !playedCount.value[k]
  );

  return songList.map((m) => ({
    id: songMap.value[m].id,
    title: songMap.value[m].name,
    artist: songMap.value[m].artist,
    anime: `${songMap.value[m].anime?.romaji} (${songMap.value[m].anime?.english})`,
    musicLink: songMap.value[m].themeLink ?? "",
    animeLink: `https://anilist.co/anime/${songMap.value[m].anime?.anilistId}/`,
    players: songMap.value[m].players.join(", "),
  }));
});

const playedSongTable = computed(() => {
  const songList = Object.keys(playedCount.value).filter(
    (k) => playedCount.value[k]
  );

  return songList
    .map((m) => ({
      id: songMap.value[m].id,
      title: songMap.value[m].name,
      artist: songMap.value[m].artist,
      anime: `${songMap.value[m].anime?.romaji} (${songMap.value[m].anime?.english})`,
      musicLink: songMap.value[m].themeLink ?? "",
      animeLink: `https://anilist.co/anime/${songMap.value[m].anime?.anilistId}/`,
      count: playedCount.value[m],
      players: songMap.value[m].players.join(", "),
    }))
    .sort((a, b) => a.count - b.count);
});

const songsByPlayer = computed(() => {
  return props.tournament.players
    .reduce<
      {
        id: string;
        name: string;
        songCount: number;
        playedSongs: number;
        playedSongsUnique: number;
      }[]
    >((acc, player) => {
      const playerSongs = props.tournament.songs.filter((s) =>
        s.players.includes(player.discordId || player.name)
      );

      let playedSongs = 0;
      let playedSongCount = 0;

      for (const song of Object.keys(playedCount.value)) {
        if (playerSongs.find((s) => s._id === song)) {
          playedSongCount += playedCount.value[song];
          if (playedCount.value[song] > 0) {
            playedSongs++;
          }
        }
      }

      return [
        ...acc,
        {
          id: player.discordId || player.name,
          name: player.name,
          songCount: playerSongs.length,
          playedSongs: playedSongCount,
          playedSongsUnique: playedSongs,
        },
      ];
    }, [])
    .sort((a, b) => a.playedSongs - b.playedSongs);
});

const tabHeaders = [
  {
    title: "Songs that never played",
    label: `not-played-songs`,
  },
  {
    title: "Songs by play count",
    label: `played-songs`,
  },
  {
    title: "Songs by player",
    label: `songs-player`,
  },
];
</script>

<template>
  <div class="flex flex-col gap-2">
    <SimpleTab :sections="tabHeaders">
      <template #not-played-songs>
        <SimpleTable
          id="not-played-songs"
          :headers="[
            {
              title: 'Title',
              key: 'title',
              sortable: true,
              useLink: 'musicLink',
            },
            {
              title: 'Artist',
              key: 'artist',
              sortable: true,
            },
            {
              title: 'Anime',
              key: 'anime',
              sortable: true,
              useLink: 'animeLink',
            },
            {
              title: 'Players',
              key: 'players',
            },
          ]"
          :data="notPlayedSongsTable"
        />
      </template>
      <template #played-songs>
        <SimpleTable
          id="played-songs"
          :headers="[
            {
              title: 'Title',
              key: 'title',
              sortable: true,
              useLink: 'musicLink',
            },
            {
              title: 'Artist',
              key: 'artist',
              sortable: true,
            },
            {
              title: 'Anime',
              key: 'anime',
              sortable: true,
              useLink: 'animeLink',
            },
            {
              title: 'Count',
              key: 'count',
              sortable: true,
            },
            {
              title: 'Players',
              key: 'players',
            },
          ]"
          :data="playedSongTable"
          :initial-sort="{ direction: 'DESC', header: 'count' }"
        />
      </template>
      <template #songs-player>
        <SimpleTable
          id="songs-player"
          :headers="[
            {
              title: 'Player',
              key: 'name',
              sortable: true,
            },
            {
              title: 'Song Count',
              key: 'songCount',
              sortable: true,
            },
            {
              title: 'Played Song Total',
              key: 'playedSongs',
              sortable: true,
            },
            {
              title: 'Unique Songs Played',
              key: 'playedSongsUnique',
              sortable: true,
            },
          ]"
          :data="songsByPlayer"
          :initial-sort="{ direction: 'DESC', header: 'playedSongs' }"
        />
      </template>
    </SimpleTab>
  </div>
</template>
