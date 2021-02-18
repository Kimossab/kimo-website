<template>
  <div class="luna__gallery">
    <font-awesome-icon
      v-if="loading"
      icon="spinner"
      spin
      size="6x"
    ></font-awesome-icon>
    <template v-for="(picture, index) of pictures" :key="picture.name">
      <LazyImage
        class="luna"
        :src="picture.thumbnail"
        :alt="picture.name"
        @click="open(index)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LazyImage from "@/components/LazyImage.vue";
import { ActionTypes } from "@/store/action-types";
import { fixBodyHeight } from "@/helpers/common";

let fixTimer: NodeJS.Timeout | null = null;

@Options({
  watch: {
    loading() {
      if (fixTimer) {
        clearTimeout(fixTimer);
      }
      fixTimer = setTimeout(() => {
        fixBodyHeight();
      }, 100);
    }
  },
  components: {
    LazyImage
  }
})
export default class LunaGallery extends Vue {
  get loading() {
    return this.$store.state.lunaLoading;
  }

  get pictures() {
    return this.$store.state.lunaPictures;
  }

  open(index: number) {
    this.$store.dispatch(ActionTypes.SELECT_LUNA_PICTURE, index);
  }
}
</script>

<style lang="scss" scoped>
.noselect {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.luna__gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  .loader {
    width: 100%;
  }

  figure {
    margin: 0;
  }

  .luna {
    @extend .noselect;

    width: 200px;
    height: 200px;
    margin: 0.5rem;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: $speed-faster;

    &:hover {
      transform: $normal-scale;
    }
  }
}
</style>
