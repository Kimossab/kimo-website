<template>
  <div class="manga-list-single">
    <img :src="data.thumbnail" :alt="data.name.en" />
    <span class="name">{{ data.name.en }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  data = prop({
    type: Object,
    required: true
  });
}

export default class MangaListSingle extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
.manga-list-single {
  position: relative;
  width: 200px;
  height: 290px;
  transition: 0.2s;

  img {
    width: 100%;
    height: 100%;
  }

  .name {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 8px;
    width: calc(100% - 16px);

    background-image: linear-gradient(
      0,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.55) 50%,
      rgba(0, 0, 0, 0.2) 90%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
}
</style>
