<script setup lang="ts">
import { useLuna } from "@/stores/luna";
import LazyImage from "../LazyImage.vue";

const luna = useLuna();

const open = (index: number) => {
  luna.selectPicture(index);
};
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center" v-if="luna.loading">
      <FontAwesomeIcon icon="spinner" spin size="6x"></FontAwesomeIcon>
    </div>
    <div class="grid grid-cols-3 md:grid-cols-4 gap-4 justify-center content-center mb-2">
      <template v-for="(picture, index) of luna.pictures" :key="picture.name">
        <LazyImage class="min-w-0 m-0 p-0 cursor-pointer duration-200 hover:scale-105 noselect" :src="picture.thumbnail"
          :alt="picture.name" @click="open(index)" />
      </template>
    </div>
  </div>
</template>
