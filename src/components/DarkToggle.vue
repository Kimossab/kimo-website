<script setup lang="ts">
import { useAppStore } from "@/stores/app";

const store = useAppStore();

const toggle = () => {
  store.darkMode = !store.darkMode;
};
</script>

<template>
  <div class="sticky ml-[100vw] -translate-x-full top-0 z-10 cursor-pointer w-10 h-10 flex justify-center"
    @click="toggle">
    <transition name="scroll-dark-mode">
      <div v-if="store.darkMode"
        class="absolute text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-500">
        <font-awesome-icon icon="sun"></font-awesome-icon>
      </div>
      <div v-else class="absolute text-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-500">
        <font-awesome-icon icon="moon"></font-awesome-icon>
      </div>
    </transition>
  </div>
</template>

<style>
@reference "@/assets/css/base.css";

.scroll-dark-mode-enter-from {
  @apply !-translate-x-1/2 !-translate-y-full;
  @apply opacity-0;
}

.scroll-dark-mode-leave-to {
  @apply !-translate-x-1/2 !translate-y-1/2;
  @apply opacity-0;
}
</style>
