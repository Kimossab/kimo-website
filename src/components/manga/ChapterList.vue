<template>
  <div class="manga-chapter-listing">
    <h2>{{ selectedManga.name.en }}</h2>
    <template v-for="chapter of selectedManga.chapters" :key="chapter.number">
      <ChapterListSingle @click="setChapter(chapter.number)" :data="chapter" />
    </template>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/action-types";
import { Options, Vue } from "vue-class-component";
import ChapterListSingle from "./ChapterListSingle.vue";

@Options({
  components: {
    ChapterListSingle
  }
})
export default class ChapterList extends Vue {
  get selectedManga() {
    return this.$store.state.selectedManga;
  }
  setChapter(number: number) {
    this.$store.dispatch(ActionTypes.SELECT_CHAPTER, number);
  }
}
</script>
