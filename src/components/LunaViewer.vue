<template>
  <transition
    @before-enter="viewerBeforeEnter"
    @enter="viewerEnter"
    @leave="viewerLeave"
    :css="false"
  >
    <div class="luna__viewer" v-if="selected !== null" @click="onClick">
      <div class="luna__viewer_buttons">
        <div class="button" @click="close">
          <font-awesome-icon icon="window-close" size="2x"></font-awesome-icon>
          <span>Close</span>
        </div>
        <div class="button" @click="expand">
          <font-awesome-icon icon="expand" size="2x"></font-awesome-icon>
          <span>Expand</span>
        </div>
      </div>
      <template v-for="(img, index) of lunaPictures" :key="`main-${img.name}`">
        <transition
          @before-enter="mainBeforeEnter"
          @enter="mainEnter"
          @leave="mainLeave"
          :css="false"
        >
          <img
            class="luna__viewer_main"
            :src="img.original"
            :alt="img.name"
            v-if="index === selected"
          />
        </transition>
      </template>
      <div class="luna__viewer_scroll">
        <template
          v-for="(img, index) of lunaPictures"
          :key="`scroll-${img.name}`"
        >
          <transition
            @before-enter="scrollBeforeEnter"
            @enter="scrollEnter"
            @leave="scrollLeave"
            :css="false"
          >
            <img
              v-if="scrollerClass(index) !== null"
              :class="scrollerClass(index)"
              :src="img.thumbnail"
              :alt="img.name"
              @click="goTo(index)"
            />
          </transition>
        </template>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/action-types";
import { Vue } from "vue-class-component";
export default class LunaViewer extends Vue {
  get lunaPictures() {
    return this.$store.state.lunaPictures;
  }

  get selected() {
    return this.$store.state.lunaSelected;
  }

  scrollerClass(index: number): string | null {
    if (this.selected === null) {
      return null;
    }

    if (index === this.selected) {
      return "center";
    }
    if (index === this.selected - 1) {
      return "left";
    }
    if (index === this.selected + 1) {
      return "right";
    }
    return null;
  }

  goTo(index: number) {
    this.$store.dispatch(ActionTypes.SELECT_LUNA_PICTURE, index);
  }

  onClick(e: Event) {
    if (
      e.target &&
      (e.target as HTMLImageElement).classList.contains("luna__viewer")
    ) {
      this.$store.dispatch(ActionTypes.SELECT_LUNA_PICTURE, null);
    }
  }

  close() {
    this.$store.dispatch(ActionTypes.SELECT_LUNA_PICTURE, null);
  }

  expand() {
    if (this.$store.state.lunaSelected) {
      window.open(
        this.$store.state.lunaPictures[this.$store.state.lunaSelected].original,
        "_blank"
      );
    }
  }

  // viewer animations
  viewerBeforeEnter() {
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = "fixed";
  }
  viewerEnter(el: HTMLElement, done: () => void) {
    setTimeout(() => {
      el.style.opacity = "1";
      setTimeout(done, 500);
    }, 1);
  }
  viewerLeave(el: HTMLElement, done: () => void) {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);

    el.style.opacity = "0";
    setTimeout(done, 500);
  }
  //main image animations
  mainBeforeEnter(el: HTMLElement) {
    el.style.transform = "translate(50%, -50%)";
    el.style.opacity = "0";
  }
  mainEnter(el: HTMLElement, done: () => void) {
    setTimeout(() => {
      el.style.transform = "translate(-50%, -50%)";
      el.style.opacity = "1";
      setTimeout(done, 500);
    }, 1);
  }
  mainLeave(el: HTMLElement, done: () => void) {
    el.style.opacity = "0";
    el.style.transform = "translate(-150%, -50%)";
    setTimeout(done, 500);
  }
  //main image animations
  scrollBeforeEnter(el: HTMLElement) {
    el.style.transform = "translateX(calc(-50% + 40vh + 1rem))";
    el.style.opacity = "0";
  }
  scrollEnter(el: HTMLElement, done: () => void) {
    setTimeout(() => {
      el.style.transform = "";
      el.style.opacity = "1";
      setTimeout(done, 500);
    }, 1);
  }
  scrollLeave(el: HTMLElement, done: () => void) {
    el.style.opacity = "0";
    el.style.transform = "translateX(calc(-50% - 40vh - 1rem))";
    setTimeout(done, 500);
  }
}
</script>

<style lang="scss" scoped>
.luna__viewer {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000f1;
  opacity: 0;
  transition: $speed-fast;
  color: $color-light;

  .luna__viewer_buttons {
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;

    .button {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;

      cursor: pointer;

      svg {
        margin-right: 0.2rem;
        width: 2rem;
      }

      span {
        width: 0;
        overflow: hidden;
        transition: $speed-faster;
      }

      &:hover {
        span {
          width: 3.5rem;
        }
      }
    }
  }

  .luna__viewer_main {
    position: absolute;
    top: calc(
      50% - 10vh + 2.5rem
    ); //10vh + 2rem because of the 90vw - 2rem in height and extra .5rem for margin
    left: 50%;
    transform: translate(-50%, -50%);

    max-width: calc(90vw - 2rem);
    max-height: calc(90vh - 2rem);
    object-fit: contain;
    margin: auto;

    transition: $speed-fast;
  }

  .luna__viewer_scroll {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    height: 20vh;
    display: flex;
    justify-content: center;

    align-items: flex-end;

    width: calc(10vh * 3 + 1rem);

    &:hover {
      width: calc(20vh + 2rem);

      img {
        height: 100%;

        &.left {
          transform: translateX(calc(-50% - 20vh - 0.5rem));
        }
        &.right {
          transform: translateX(calc(-50% + 20vh + 0.5rem));
        }
      }
    }

    img {
      height: 10vh;
      position: absolute;
      left: 50%;
      bottom: 0.5rem;
      transform: translateX(-50%);

      transition: $speed-faster;

      cursor: pointer;

      &.left {
        transform: translateX(calc(-50% - 10vh - 0.5rem));
      }
      &.right {
        transform: translateX(calc(-50% + 10vh + 0.5rem));
      }
    }
  }
}
</style>
