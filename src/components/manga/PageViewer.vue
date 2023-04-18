<script setup lang="ts">
import LazyImage from "../LazyImage.vue";
import MangaPagination from "./MangaPagination.vue";
import { useManga } from "@/stores/manga";
import { onUnmounted, ref } from "vue";
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

onUnmounted(() => {
  window.removeEventListener("keyup", keyup);
});
</script>

<template>
  <div ref="main" class="max-w-full">
    <MangaPagination
      :top="true"
      :selected-page="(store.page?.index || 0) + 1"
      :pages="store.pageCount"
      @previous="previous"
      @next="next"
      @set-page="setPage"
    />
    <div class="flex justify-center relative">
      <template
        v-for="(p, index) in store.chapter?.pages"
        :key="`btn-page-${top ? 'top' : 'bottom'}-${index}`"
      >
        <LazyImage
          v-show="store.page?.index === index"
          styling="max-w-full"
          :src="p"
          :alt="`page-${index}`"
        />
      </template>

      <div class="absolute top-0 left-0 w-full h-full grid grid-cols-3">
        <div class="left" @click="previous"></div>
        <div class="center"></div>
        <div class="right" @click="next"></div>
      </div>
    </div>
    <MangaPagination
      :top="false"
      :selected-page="(store.page?.index || 0) + 1"
      :pages="store.pageCount"
      @previous="previous"
      @next="next"
      @set-page="setPage"
    />
  </div>
</template>
