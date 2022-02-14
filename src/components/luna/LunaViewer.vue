<script setup lang="ts">
import { useLuna } from "@/stores/luna";
import { ref } from "vue";

const transition = ref<"scroll-luna-left" | "scroll-luna-right">(
  "scroll-luna-left"
);

const luna = useLuna();

const nextPicture = () => {
  luna.nextPicture();
  transition.value = "scroll-luna-left";
};
const previousPicture = () => {
  luna.previousPicture();
  transition.value = "scroll-luna-right";
};

const keyup = (ev: KeyboardEvent) => {
  switch (ev.code) {
    case "ArrowLeft":
      previousPicture();
      break;
    case "ArrowRight":
      nextPicture();
      break;
  }
};

const expand = () => {
  if (luna.selectedIndex) {
    window.open(luna.pictures[luna.selectedIndex].original, "_blank");
  }
};

const close = () => {
  luna.selectPicture(null);
};

const goTo = (index: number) => {
  if (luna.selectedIndex === null) {
    return;
  }

  let diff = index - luna.selectedIndex;

  while (diff > 0) {
    nextPicture();
    diff--;
  }
  while (diff < 0) {
    previousPicture();
    diff++;
  }
};

const scrollerClass = (index: number): string | null => {
  if (luna.selectedIndex === null) {
    return null;
  }

  const left = luna.selectedIndex - 1;
  const right = luna.selectedIndex + 1;
  const lefter = luna.selectedIndex - 2;
  const righter = luna.selectedIndex + 2;
  const leftest = luna.selectedIndex - 3;
  const rightest = luna.selectedIndex + 3;
  const leftest2 = luna.selectedIndex - 4;
  const rightest2 = luna.selectedIndex + 4;

  if (index === luna.selectedIndex) {
    return "center";
  }
  if (index === lefter) {
    return "lefter";
  }
  if (index === left) {
    return "left";
  }
  if (index === right) {
    return "right";
  }
  if (index === righter) {
    return "righter";
  }
  if (
    index === rightest ||
    index === leftest ||
    index === rightest2 ||
    index === leftest2
  ) {
    return "hidden";
  }
  return null;
};

window.addEventListener("keyup", keyup);
// window.removeEventListener('keyup', keyup);

const swipeLeft = () => {
  nextPicture();
};
const swipeRight = () => {
  previousPicture();
};
</script>

<template>
  <div class="luna_viewer" v-if="luna.selectedIndex !== null" @click="close">
    <div class="closer" @click.self="close"></div>
    <div class="luna_viewer_main">
      <div class="luna_viewer_img_container">
        <template
          v-for="(img, index) of luna.pictures"
          :key="`main-${img.name}`"
        >
          <transition :name="transition">
            <img
              :src="img.original"
              :alt="img.name"
              v-if="index === luna.selectedIndex"
              @click.stop
              v-touch:swipe.left="swipeLeft"
              v-touch:swipe.right="swipeRight"
            />
          </transition>
        </template>
      </div>
      <div class="expand_button">
        <div class="button" @click.stop="expand">
          <font-awesome-icon icon="expand" size="2x"></font-awesome-icon>
          <div><span>Expand</span></div>
        </div>
      </div>
      <div class="close_button">
        <div class="button" @click.stop="close">
          <font-awesome-icon icon="window-close" size="2x"></font-awesome-icon>
          <div><span>Close</span></div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <template
        v-for="(img, index) of luna.pictures"
        :key="`scroll-${img.name}`"
      >
        <img
          v-if="scrollerClass(index) !== null"
          :class="scrollerClass(index)"
          :src="img.thumbnail"
          :alt="img.name"
          @click.stop="goTo(index)"
        />
      </template>
    </div>
  </div>
</template>

<style>
.luna_viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000f1;
  z-index: 100;
  opacity: 1;
  transition: opacity var(--speed-fast);
  color: var(--color-light);

  display: grid;
  grid-template-rows: 1fr 7rem;
  grid-gap: 1rem;

  padding: 0.5rem;
}

.luna_viewer .closer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: -1;
}

.luna_viewer .button {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;

  cursor: pointer;
}
.luna_viewer .button svg {
  width: 2rem;
}

.luna_viewer .button div {
  width: 0;
  overflow: hidden;
  transition: var(--speed-faster);
  display: grid;
  justify-content: center;
}

.luna_viewer .button div span {
  width: 3.5rem;
  text-align: center;
  transition: var(--speed-faster);
}

.luna_viewer .button:hover div {
  width: 3.5rem;
}

.luna_viewer_main {
  grid-row: 1;

  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 9rem);
}
.expand_button {
  position: absolute;
  left: 0;
  width: 3.5rem;

  mix-blend-mode: difference;
}

.close_button {
  position: absolute;
  right: 0;
  width: 3.5rem;

  mix-blend-mode: difference;
}

.luna_viewer_img_container {
  width: 100%;
}

.luna_viewer_img_container img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-width: 100%;
  max-height: 100%;

  object-fit: contain;

  transition: var(--speed-faster);
}

.bottom {
  display: flex;

  justify-content: center;
}
.bottom > * {
  cursor: pointer;
  margin: 0 0.5rem;
  transition: var(--speed-fast);
  object-fit: contain;
}

.bottom .hidden {
  width: 0;
}

.bottom .lefter {
  height: auto;
  width: 3rem;
  grid-column: 2;
}

.bottom .left {
  width: 5rem;
  grid-column: 3;
}

.bottom .center {
  width: 6rem;
  grid-column: 4;
}

.bottom .right {
  width: 5rem;
  grid-column: 5;
}

.bottom .righter {
  width: 3rem;
  grid-column: 6;
}
</style>
