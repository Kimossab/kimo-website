<script setup lang="ts">
import DarkToggle from "@/components/DarkToggle.vue";
import PageNav from "@/components/PageNav.vue";
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import type { RouteRecordName } from "vue-router";
import { useAppStore } from "./stores/app";
import { watch } from "vue";

const store = useAppStore();

const routeExceptions: RouteRecordName[] = ["manga"];

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
  <template v-if="!$route.name || !routeExceptions.includes($route.name)">
    <DarkToggle />
    <PageHeader />
    <PageNav />
    <Transition name="curtain" :appear="false">
      <div v-if="$route.name !== 'home'" class="w-screen relative h-content overflow-hidden mt-0.5">
        <router-view v-slot="{ Component }">
          <div class="h-content">
            <component :is="Component" />
          </div>
        </router-view>
      </div>
    </Transition>
    <PageFooter />
  </template>
  <template v-else>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </template>
</template>

<style>
#app {
  @apply w-screen min-h-screen;
  @apply flex flex-col justify-between
}

.curtain-enter-active, .curtain-leave-active {
  @apply duration-500 transition-all h-content;
}
.curtain-leave-to, .curtain-enter-from {
  @apply !h-0;
}
</style>
