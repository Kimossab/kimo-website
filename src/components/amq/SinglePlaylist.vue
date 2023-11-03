<script setup lang="ts">
import PlaylistHeader from "@/components/amq/PlaylistHeader.vue";
import PlaylistBody from "@/components/amq/PlaylistBody.vue";
import { onMounted, onUnmounted, ref } from "vue";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import type { TournamentSong } from "@/helpers/AMQ.js";
import AmqDifficulty from "@/components/amq/tournament/AmqDifficulty.vue";

interface Props {
  name: string;
  playlist: TournamentSong[];
}

const props = defineProps<Props>();

const detailsRef = ref(null);
let detailsAnimation: DetailsAnimation | null = null;

onMounted(() => {
  if (detailsRef.value) {
    detailsAnimation = new DetailsAnimation(detailsRef.value, 500);
  }
});
onUnmounted(() => {
  detailsAnimation?.destructor();
  detailsAnimation = null;
});

const seasonMap = {
  Winter: 0,
  Spring: 1,
  Summer: 2,
  Fall: 3,
};
const songs = Array.from(props.playlist.values()).sort((a, b) => {
  const seasonSplitA = a.anime.season.split(" ");
  const seasonSplitB = b.anime.season.split(" ");
  return (
    Number(seasonSplitA[1]) - Number(seasonSplitB[1]) ||
    (seasonMap[seasonSplitA[1] as keyof typeof seasonMap] ?? 0) -
      (seasonMap[seasonSplitB[1] as keyof typeof seasonMap] ?? 0) ||
    a.anime.english.localeCompare(b.anime.english)
  );
});
const diffAverage = Math.round(
  songs.reduce<number>((acc, song) => acc + song.difficulty, 0) / songs.length
);
</script>

<template>
  <div class="mb-4">
    <details ref="detailsRef" class="text-lg">
      <summary>
        <div class="inline max-w-xl">
          <div class="inline">{{ name }}'s Playlist</div>
          <div class="flex gap-2 max-w-[12rem]">
            Difficulty:
            <AmqDifficulty class="grow-0" :difficulty="diffAverage" />
          </div>
        </div>
      </summary>
      <div
        class="max-w-full grid grid-cols-[repeat(3,_1fr)_5rem_1fr_12rem_8rem_repeat(3,_5rem)] mt-2 gap-4 items-center details-content"
      >
        <PlaylistHeader />

        <hr class="col-span-10" />

        <PlaylistBody :playlist="songs" :name="name" />
      </div>
    </details>
  </div>
</template>
