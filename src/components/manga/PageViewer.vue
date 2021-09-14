<template>
  <div class="manga-page-viewer">
    <h2>{{ selectedManga.name.en }}</h2>
    <h3>Chapter {{ selectedChapter.number }}</h3>
    <div class="manga-page">
      <div class="previous" @click="prevPage"></div>
      <img :src="selectedPage" />
      <div class="next" @click="nextPage"></div>
    </div>
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
  get selectedChapter() {
    return this.$store.state.selectedChapter;
  }
  get selectedPage() {
    return this.$store.state.selectedPage;
  }
  prevPage() {
    this.$store.dispatch(ActionTypes.PREVIOUS_PAGE, undefined);
  }
  nextPage() {
    this.$store.dispatch(ActionTypes.NEXT_PAGE, undefined);
  }
}
</script>

<style lang="scss" scoped>
.manga-page-viewer {
  width: 100%;
  height: 100%;

  .manga-page {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;

    .previous {
      position: absolute;
      left: 0;
      top: 0;
      width: 45%;
      height: 100%;

      &:hover {
        cursor: pointer;
      }
    }
    .next {
      position: absolute;
      right: 0;
      top: 0;
      width: 45%;
      height: 100%;
      &:hover {
        cursor: pointer;
      }
    }

    img {
      max-width: 100%;
    }
  }
}
</style>
