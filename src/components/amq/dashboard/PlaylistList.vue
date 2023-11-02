<script setup lang="ts">
import SimpleButton from "@/components/SimpleButton.vue";
import PlaylistModal from "@/components/amq/dashboard/PlaylistModal.vue";
import PlaylistItem from "@/components/amq/dashboard/PlaylistItem.vue";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants, type Playlist } from "@/types";
import { ref } from "vue";

const discord = useDiscord();

const selectedPlaylist = ref<Playlist | null>(null);

const updatedPlaylist = (playlist: Playlist) => {
  if (playlist._id) {
    const plIdx = discord.playerData!.playlists.findIndex(
      (p) => p._id === playlist._id
    );
    discord.playerData!.playlists[plIdx] = playlist;
  } else if (selectedPlaylist.value?.name !== "") {
    const plIdx = discord.playerData!.playlists.findIndex(
      (p) => p.name === selectedPlaylist.value?.name
    );
    discord.playerData!.playlists[plIdx] = playlist;
  } else {
    discord.playerData!.playlists.push(playlist);
  }
  selectedPlaylist.value = null;
};

const deletePlaylist = (playlist: Playlist) => {
  discord.playerData!.playlists = discord.playerData!.playlists.filter(
    (p) => p !== playlist
  );
};
</script>

<template>
  <PlaylistModal
    v-if="selectedPlaylist"
    :playlist="selectedPlaylist"
    @save="updatedPlaylist"
    @cancel="selectedPlaylist = null"
  ></PlaylistModal>
  <div class="flex-col flex">
    <PlaylistItem
      v-for="playlist in discord.playerData!.playlists"
      :key="playlist.name"
      :playlist="playlist"
      @select="(p) => (selectedPlaylist = p)"
      @delete="deletePlaylist"
    >
    </PlaylistItem>
    <div class="flex justify-center border-t pt-4">
      <SimpleButton
        :variant="ButtonVariants.Small"
        @click="selectedPlaylist = { name: '', animeList: [] }"
        >+ Add</SimpleButton
      >
    </div>
  </div>
</template>
