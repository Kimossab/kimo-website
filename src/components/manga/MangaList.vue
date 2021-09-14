<template>
  <div class="manga-listing">
    <template v-for="manga of allManga" :key="manga.name">
      <MangaListSingle @click="setManga(manga.folder)" :data="manga" />
    </template>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/action-types";
import { Options, Vue } from "vue-class-component";
import MangaListSingle from "./MangaListSingle.vue";

@Options({
  components: {
    MangaListSingle
  }
})
export default class MangaList extends Vue {
  get allManga() {
    return this.$store.state.allManga;
  }

  setManga(folder: string) {
    this.$store.dispatch(ActionTypes.SELECT_MANGA, folder);
  }
}
</script>
