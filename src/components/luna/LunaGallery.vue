<script setup lang="ts">
import { useLuna } from "@/stores/luna";
import LazyImage from "../LazyImage.vue";

const luna = useLuna();

const open = (index: number) => {
  luna.selectPicture(index);
};
</script>

<template>
  <div class="luna_gallery">
    <div class="loader" v-if="luna.loading">
      <FontAwesomeIcon icon="spinner" spin size="6x"></FontAwesomeIcon>
    </div>
    <div class="luna_images">
      <template v-for="(picture, index) of luna.pictures" :key="picture.name">
        <LazyImage
          class="luna_single noselect"
          :src="picture.thumbnail"
          :alt="picture.name"
          @click="open(index)"
        />
      </template>
    </div>
  </div>
</template>

<style>
.luna_gallery {
  width: 100%;
}

.luna_gallery .loader {
  display: flex;
  justify-content: center;
}

.luna_images {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: var(--size-medium);
  justify-content: center;
  align-content: center;
}

@media screen and (max-width: 640px) {
  .luna_images {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.luna_single {
  min-width: 0;

  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: var(--speed-faster);
}
.luna_single:hover {
  transform: var(--normal-scale);
}

.luna_single img {
  width: 100%;
  border-radius: 20px;
}
</style>
