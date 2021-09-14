<template>
  <div class="content manga">
    <h1>Manga shit</h1>
    <MangaList v-if="selectedManga === null" />
    <ChapterList v-else-if="selectedChapter === null" />
    <PageViewer v-else />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ActionTypes } from "@/store/action-types";
import MangaList from "@/components/manga/MangaList.vue";
import ChapterList from "@/components/manga/ChapterList.vue";
import PageViewer from "@/components/manga/PageViewer.vue";

@Options({
  components: {
    MangaList,
    ChapterList,
    PageViewer
  }
})
export default class Luna extends Vue {
  get selectedManga() {
    return this.$store.state.selectedManga;
  }
  get selectedChapter() {
    return this.$store.state.selectedChapter;
  }

  mounted() {
    this.$store.dispatch(ActionTypes.GET_MANGA_DATA, undefined);
    window.onkeydown = this.onKeyPress;
  }

  onKeyPress(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      this.$store.dispatch(ActionTypes.NEXT_PAGE, undefined);
    } else if (e.key === "ArrowLeft") {
      this.$store.dispatch(ActionTypes.PREVIOUS_PAGE, undefined);
    }
  }
}
</script>

<style lang="scss" scoped>
.manga {
  margin: 16px;
}
</style>
