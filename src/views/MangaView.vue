<script setup lang="ts">
import MangaList from "@/components/manga/MangaList.vue";
import ChapterList from "@/components/manga/ChapterList.vue";
import PageViewer from "@/components/manga/PageViewer.vue";
import { useManga } from "@/stores/manga";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useManga();

store.loadManga(
  route.params.mangaId as string,
  route.params.chapterId as string,
  route.params.pageId as string
);

const selectManga = (id: number) => {
  store.selectManga(id);
  router.push({ name: "manga", params: { mangaId: id } });
};
const selectChapter = (id: number) => {
  store.selectChapter(id);
  router.push({
    name: "manga",
    params: { mangaId: store.manga?.index, chapterId: id, pageId: 1 },
  });
};

const breadcrumbClick = async (data: {
  mangaId?: string;
  chapterId?: string;
  pageId?: string;
}) => {
  await store.selectManga(
    [undefined, ""].includes(data.mangaId) ? null : Number(data.mangaId)
  );
  store.selectChapter(
    [undefined, ""].includes(data.chapterId) ? null : Number(data.chapterId)
  );
  store.selectPage(
    [undefined, ""].includes(data.pageId) ? null : Number(data.pageId)
  );
  router.push({ name: "manga", params: data });
};
</script>

<template>
  <div class="w-full p-8 mx-auto h-screen about overflow-y-auto">
    <h1 class="mb-4 mt-2 flex">Manga</h1>

    <div v-if="store.loading" class="w-full h-full flex justify-center items-center">
      <FontAwesomeIcon icon="spinner" spin size="6x"></FontAwesomeIcon>
    </div>
    <template v-else>
      <div class="m-4 text-sm">
        <template v-for="crumb of store.breadcrumbs" :key="crumb.name">
          <button class="after:content-['>'] after:mx-1 last:after:content-['']" @click="breadcrumbClick(crumb.data)">{{
            crumb.name
          }}</button>
        </template>
      </div>
      <MangaList v-if="store.manga === null" @select="selectManga" />
      <ChapterList v-else-if="store.chapter === null" @select="selectChapter" />
      <PageViewer v-else />
    </template>
  </div>
</template>