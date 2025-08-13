<script setup lang="ts">
import DarkToggle from "@/components/DarkToggle.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
import { useAppStore } from "./stores/app";
import { watch } from "vue";

const store = useAppStore();

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  store.darkMode = true;
}

document.documentElement.classList.toggle("dark", store.darkMode);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    store.darkMode = event.matches;
  });

watch(
  () => store.darkMode,
  () => document.documentElement.classList.toggle("dark", store.darkMode)
);
</script>

<template>
  <DarkToggle />
  <Suspense>
    <router-view />
    <template #fallback>
      <LoadSpinner></LoadSpinner>
    </template>
  </Suspense>
</template>

<style>
@reference "@/assets/css/base.css";

#app {
  @apply w-screen min-h-screen;
  @apply flex flex-col justify-between;
}

.curtain-enter-active,
.curtain-leave-active {
  @apply duration-500 transition-all h-content-inner;
}

.curtain-leave-to,
.curtain-enter-from {
  @apply !h-0;
}
</style>
