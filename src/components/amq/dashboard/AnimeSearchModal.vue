<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import { searchByQuery } from "@/helpers/Anilist";
import { ButtonVariants, type PlaylistAnime } from "@/types";
import { ref } from "vue";
import SingleAnime from "./SingleAnime.vue";

interface Emits {
  (e: "selected", anime: PlaylistAnime): void;
  (e: "cancel"): void;
}
const emit = defineEmits<Emits>();

const query = ref("");
const selected = ref<string | null>(null);
const isSearching = ref(false);
const searchResults = ref<PlaylistAnime[]>([]);

const search = async () => {
  isSearching.value = true;
  selected.value = null;

  const result = await searchByQuery(query.value);

  searchResults.value =
    result?.Page.media.map((m) => ({
      anilistId: m.id.toString(),
      banner: m.bannerImage,
      nameEn: m.title.english,
      nameRom: m.title.romaji,
      picture:
        m.coverImage.extraLarge || m.coverImage.large || m.coverImage.medium,
    })) ?? [];

  isSearching.value = false;
};

const accept = () => {
  const anime = searchResults.value.find((a) => a.anilistId === selected.value);

  emit("selected", anime!);
};
</script>

<template>
  <BaseModal @close="$emit('cancel')">
    <template #header>Search Anime</template>

    <div class="flex flex-col gap-4">
      <div class="flex-col flex">
        <label for="anime-query">Anime name:</label>
        <input v-model="query" name="anime-query" />
      </div>
      <SimpleButton
        :variant="ButtonVariants.Small"
        :disabled="isSearching"
        @click="search"
        >Search</SimpleButton
      >
      <div>Search Results</div>
      <div class="flex justify-center flex-wrap gap-4">
        <SingleAnime
          v-for="result in searchResults"
          :key="JSON.stringify(result)"
          :class="{
            'border-4 !border-blue-600': selected === result.anilistId,
          }"
          :anime="result"
          @click="
            selected !== result.anilistId
              ? (selected = result.anilistId)
              : (selected = null)
          "
        ></SingleAnime>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-4">
        <SimpleButton
          :variant="ButtonVariants.Small"
          :disabled="!selected"
          @click="accept"
          >Accept</SimpleButton
        >
        <SimpleButton :variant="ButtonVariants.Small" @click="$emit('cancel')"
          >Cancel</SimpleButton
        >
      </div>
    </template>
  </BaseModal>
</template>
