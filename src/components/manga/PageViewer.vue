<script setup lang="ts">
import LazyImage from "../LazyImage.vue";
import MangaPagination from "./MangaPagination.vue";
import { useManga } from "@/stores/manga";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useManga();
const router = useRouter();

const main = ref<HTMLDivElement>();

const keyup = (ev: KeyboardEvent) => {
  switch (ev.code) {
    case "ArrowLeft":
      previous();
      break;
    case "ArrowRight":
      next();
      break;
  }
};

const previous = () => {
  if (store.previousPage !== null) {
    main.value?.scrollIntoView();
    router.push({
      name: "manga",
      params: { ...store.currentRouteParams, pageId: store.previousPage },
    });
    store.selectPage(store.previousPage);
  }
};

const next = () => {
  if (store.nextPage !== null) {
    main.value?.scrollIntoView();
    router.push({
      name: "manga",
      params: { ...store.currentRouteParams, pageId: store.nextPage },
    });
    store.selectPage(store.nextPage);
  }
};

const setPage = (page: number) => {
  main.value?.scrollIntoView();
  router.push({
    name: "manga",
    params: { ...store.currentRouteParams, pageId: page },
  });
  store.selectPage(page);
};

window.addEventListener("keyup", keyup);
</script>

<template>
  <div class="manga-page" ref="main">
    <MangaPagination
      :top="true"
      :selectedPage="(store.page?.index || 0) + 1"
      :pages="store.pageCount"
      @previous="previous"
      @next="next"
      @setPage="setPage"
    />
    <div class="display">
      <template
        v-for="(p, index) in store.chapter?.pages"
        :key="`btn-page-${top ? 'top' : 'bottom'}-${index}`"
      >
        <LazyImage
          :src="p"
          :alt="`page-${index}`"
          v-show="store.page?.index === index"
        />
      </template>

      <div class="page-switcher">
        <div class="left" @click="previous"></div>
        <div class="center"></div>
        <div class="right" @click="next"></div>
      </div>
    </div>
    <MangaPagination
      :top="false"
      :selectedPage="(store.page?.index || 0) + 1"
      :pages="store.pageCount"
      @previous="previous"
      @next="next"
      @setPage="setPage"
    />
  </div>
</template>

<style>
.manga-page {
  max-width: 100%;
}
.manga-page .display {
  display: flex;
  justify-content: center;
  position: relative;
}
.manga-page .display img {
  max-width: 100%;
}

.manga-page .display .page-switcher {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  opacity: 25%;
}
</style>
