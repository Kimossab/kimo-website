<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants, type Playlist } from "@/types";
import { ref } from "vue";

interface Emits {
  (e: "select", name: string, playlist: Playlist): void;
  (e: "cancel"): void;
}

defineEmits<Emits>();

const discord = useDiscord();

const amqName = ref<string>("");
</script>

<template>
  <BaseModal @close="$emit('cancel')">
    <template #header>Add a new player</template>

    <div class="flex gap-2">
      <label for="anime-query">AMQ name:</label>
      <input v-model="amqName" name="anime-query" class="flex-grow" />
    </div>

    <div v-if="amqName" class="flex flex-col">
      <div
        v-for="playlist in discord.playerData?.playlists ?? []"
        :key="playlist._id || playlist.name"
        class="w-full flex justify-between items-start gap-2 border-t border-solid py-4"
      >
        <span>{{ playlist.name }}</span>
        <div class="flex gap-2 text-sm flex-wrap">
          <code v-for="a in playlist.animeList" :key="a.anilistId">
            {{ a.nameEn }}|{{ a.nameRom }}
          </code>
        </div>
        <SimpleButton
          class="shrink-0"
          :variant="ButtonVariants.Small"
          @click="$emit('select', amqName, playlist)"
          >Select</SimpleButton
        >
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-4">
        <SimpleButton :variant="ButtonVariants.Small" @click="$emit('cancel')"
          >Cancel</SimpleButton
        >
      </div>
    </template>
  </BaseModal>
</template>
