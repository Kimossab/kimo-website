<script setup lang="ts">
import MangaList from "@/components/manga/MangaList.vue";
import ChapterList from "@/components/manga/ChapterList.vue";
import PageViewer from "@/components/manga/PageViewer.vue";
import { useManga } from "@/stores/manga";
import { useRouter, useRoute } from "vue-router";
// import { watch } from "vue";

const router = useRouter();
const route = useRoute();
const store = useManga();

// watch(
//   () => route.params,
//   async () => {
//     const { mangaId, chapterId, pageId } = route.params;

//     await store.selectManga(
//       [undefined, ""].includes(mangaId as string | undefined)
//         ? null
//         : Number(mangaId)
//     );

//     store.selectChapter(
//       [undefined, ""].includes(chapterId as string | undefined)
//         ? null
//         : Number(chapterId)
//     );

//     store.selectPage(
//       [undefined, ""].includes(pageId as string | undefined)
//         ? null
//         : Number(pageId) - 1
//     );
//   }
// );

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
  <div class="content manga">
    <h1>Manga</h1>

    <div class="loader" v-if="store.loading">
      <FontAwesomeIcon icon="spinner" spin size="6x"></FontAwesomeIcon>
    </div>
    <template v-else>
      <div class="breadcrumbs">
        <template v-for="crumb of store.breadcrumbs" :key="crumb.name">
          <span @click="breadcrumbClick(crumb.data)">{{ crumb.name }}</span>
        </template>
      </div>
      <MangaList v-if="store.manga === null" @select="selectManga" />
      <ChapterList v-else-if="store.chapter === null" @select="selectChapter" />
      <PageViewer v-else />
    </template>
  </div>
</template>

<style>
.manga {
  padding: 1rem;

  width: 100%;
}
.manga .loader {
  display: flex;
  justify-content: center;
}
.manga .breadcrumbs {
  margin: 1rem;
  padding: 0;
  font-size: 0.9rem;
}

.manga .breadcrumbs span:hover {
  cursor: pointer;
}

.manga .breadcrumbs span:not(:last-child)::after {
  content: " > ";
}
</style>
