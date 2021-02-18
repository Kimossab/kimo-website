<template>
  <div class="dark__toggle" @click="toggle">
    <transition
      @before-enter="slideBeforeEnter"
      @enter="slideEnter"
      @before-leave="slideBeforeLeave"
      @leave="slideLeave"
      :css="false"
    >
      <div class="light" v-if="darkMode">
        <font-awesome-icon icon="sun"></font-awesome-icon>
      </div>
      <div class="dark" v-else>
        <font-awesome-icon icon="moon"></font-awesome-icon>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { MutationTypes } from "@/store/mutation-types";
import { Vue } from "vue-class-component";
export default class DarkToggle extends Vue {
  private get darkMode() {
    return this.$store.state.darkMode;
  }

  toggle() {
    this.$store.commit(MutationTypes.SET_DARK_MODE, !this.darkMode);
  }

  slideBeforeEnter(el: HTMLElement) {
    el.style.transform = "translateY(100%)";
  }

  slideEnter(el: HTMLElement, done: () => void) {
    setTimeout(() => {
      el.style.transform = "translateY(0%)";
      setTimeout(() => {
        done();
      }, 500);
    }, 100);
  }

  slideBeforeLeave(el: HTMLElement) {
    el.style.transform = "translateY(0%)";
  }
  slideLeave(el: HTMLElement, done: () => void) {
    el.style.transform = "translateY(-100%)";
    setTimeout(() => {
      done();
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.dark__toggle {
  position: absolute;
  right: 0.5rem;
  top: 0;
  font-size: 3rem;
  z-index: 1.5rem;
  cursor: pointer;
  height: 4rem;
  width: 3rem;
  overflow: hidden;

  div {
    position: absolute;
    top: 0;
    right: 0;
    transition: 500ms;
  }
}
</style>
