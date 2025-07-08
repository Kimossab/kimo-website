<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import AnimeSearchModal from "@/components/amq/dashboard/AnimeSearchModal.vue";
import SingleAnime from "@/components/amq/SingleAnime.vue";
import { ButtonVariants, type Playlist, type PlaylistAnime } from "@/types";
import { ref } from "vue";

interface Props {
  playlist: Playlist;
}

interface Emits {
  (e: "save", playlist: Playlist): void;
  (e: "cancel"): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const playlistData = ref(props.playlist);
const searchAnime = ref<boolean>(false);

const addAnime = (newAnime: PlaylistAnime) => {
  if (
    !playlistData.value.animeList.find(
      (a) => a.anilistId === newAnime.anilistId
    )
  ) {
    playlistData.value.animeList.push(newAnime);
  }
  searchAnime.value = false;
};
</script>

<template>
  <AnimeSearchModal
    v-if="searchAnime"
    @selected="addAnime"
    @cancel="searchAnime = false"
  ></AnimeSearchModal>
  <BaseModal @close="$emit('cancel')">
    <template #header>Playlist</template>

    <div class="flex flex-col gap-4">
      <div class="flex-col flex">
        <label for="playlist-name">Playlist name:</label>
        <input v-model="playlistData.name" name="playlist-name" />
      </div>

      <div>Anime List:</div>
      <div class="flex justify-center flex-wrap gap-4">
        <SingleAnime
          v-for="anime in playlistData.animeList"
          :key="anime.anilistId"
          class="cursor-pointer"
          :anime="anime"
        ></SingleAnime>
        <SimpleButton
          class="w-52 h-72 relative cursor-pointer hover:scale-105 transition shadow-sm"
          :variant="ButtonVariants.Normal"
          @click="searchAnime = true"
          >Add</SimpleButton
        >
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end gap-4">
        <SimpleButton
          :variant="ButtonVariants.Small"
          :disabled="!playlistData.name"
          @click="$emit('save', playlistData)"
          >Save</SimpleButton
        >
        <SimpleButton :variant="ButtonVariants.Small" @click="$emit('cancel')"
          >Cancel</SimpleButton
        >
      </div>
    </template>
  </BaseModal>
</template>
