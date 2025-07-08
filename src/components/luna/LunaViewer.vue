<script setup lang="ts">
import { useLuna } from "@/stores/luna";
import { onUnmounted, ref } from "vue";

const transition = ref<"scroll-luna-left" | "scroll-luna-right">(
  "scroll-luna-left"
);

const luna = useLuna();

const nextPicture = () => {
  console.log("next picture");
  luna.nextPicture();
  transition.value = "scroll-luna-left";
};
const previousPicture = () => {
  console.log("previousPicture");
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
    return "w-24 col-start-4";
  }
  if (index === lefter) {
    return "h-auto w-12 col-start-2";
  }
  if (index === left) {
    return "w-20 col-start-3";
  }
  if (index === right) {
    return "w-20 col-start-5";
  }
  if (index === righter) {
    return "w-12 col-start-6";
  }
  if (
    index === rightest ||
    index === leftest ||
    index === rightest2 ||
    index === leftest2
  ) {
    return "w-0";
  }
  return null;
};

window.addEventListener("keyup", keyup);

onUnmounted(() => {
  window.removeEventListener("keyup", keyup);
});

const swipeLeft = () => {
  nextPicture();
};
const swipeRight = () => {
  previousPicture();
};
</script>

<template>
  <div
    v-if="luna.selectedIndex !== null"
    class="fixed top-0 left-0 w-screen h-screen bg-black\95 z-20 opacity-100 transition-opacity duration-500 text-stone-300 grid col-[1fr_7rem] gap-4 p-2"
    @click="close"
  >
    <div
      class="absolute top-0 left-0 w-screen h-screen -z-[1]"
      @click.self="close"
    ></div>
    <div class="row-start-1 flex justify-center w-full h-[calc(100vh_-_9rem)]">
      <div class="w-full">
        <template
          v-for="(img, index) of luna.pictures"
          :key="`main-${img.name}`"
        >
          <transition :name="transition">
            <img
              v-if="index === luna.selectedIndex"
              v-touch:swipe.left="swipeLeft"
              v-touch:swipe.right="swipeRight"
              :src="img.original"
              :alt="img.name"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full object-contain duration-200"
              @click.stop
            />
          </transition>
        </template>
      </div>
      <div class="absolute left-0 w-14 mix-blend-difference">
        <button
          class="w-full flex flex-col items-center mb-2 group"
          @click.stop="expand"
        >
          <font-awesome-icon
            class="w-8"
            icon="expand"
            size="2x"
          ></font-awesome-icon>
          <div
            class="w-0 overflow-hidden duration-200 grid justify-center group-hover:w-14"
          >
            <span class="w-14 text-center duration-200">Expand</span>
          </div>
        </button>
      </div>
      <div class="absolute right-0 w-14 mix-blend-difference">
        <div
          class="w-full flex flex-col items-center mb-2 group"
          @click.stop="close"
        >
          <font-awesome-icon
            class="w-8"
            icon="window-close"
            size="2x"
          ></font-awesome-icon>
          <div
            class="w-0 overflow-hidden duration-200 grid justify-center group-hover:w-14"
          >
            <span class="w-14 text-center duration-200">Close</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <template
        v-for="(img, index) of luna.pictures"
        :key="`scroll-${img.name}`"
      >
        <img
          v-if="scrollerClass(index) !== null"
          :class="[
            scrollerClass(index),
            'cursor-pointer my-0 mx-2 duration-500 object-contain',
          ]"
          :src="img.thumbnail"
          :alt="img.name"
          @click.stop="goTo(index)"
        />
      </template>
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/base.css";

.scroll-luna-left-enter-active,
.scroll-luna-left-leave-active {
  @apply h-full;
  @apply overflow-auto;
}

.scroll-luna-left-enter-from {
  @apply !left-full;
  @apply !translate-x-0 !-translate-y-1/2;
}

.scroll-luna-left-leave-to {
  @apply !left-0;
  @apply !-translate-x-full !-translate-y-1/2;
}

/** scroll luna right */
.scroll-luna-right-enter-active,
.scroll-luna-right-leave-active {
  @apply h-full;
  @apply overflow-auto;
}

.scroll-luna-right-enter-from {
  @apply !left-0;
  @apply !-translate-x-full !-translate-y-1/2;
}

.scroll-luna-right-leave-to {
  @apply !left-full;
  @apply !translate-x-0 !-translate-y-1/2;
}
</style>
