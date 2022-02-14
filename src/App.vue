<script setup lang="ts">
import DarkToggle from "@/components/DarkToggle.vue";
import PageNav from "@/components/PageNav.vue";
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import LunaViewer from "@/components/luna/LunaViewer.vue";
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

document.body.classList.toggle("dark", store.darkMode);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    store.darkMode = event.matches;
  });

watch(
  () => store.darkMode,
  () => document.body.classList.toggle("dark", store.darkMode)
);
</script>

<template>
  <template v-if="!$route.name || !routeExceptions.includes($route.name)">
    <DarkToggle />
    <LunaViewer />
    <PageHeader />
    <PageNav />
    <div :class="['content-container', $route.name]">
      <router-view v-slot="{ Component }">
        <transition name="scroll">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <PageFooter />
  </template>
  <template v-else>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </template>
</template>

<style>
@import "@/assets/css/base.css";
@import "@/assets/css/transitions.css";

#app {
  width: 100vw;
  min-height: 100vh;
}

.content-container {
  width: 100vw;
  transition: var(--speed-fast);
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(
    100vh - var(--footer-size) - var(--header-size) - var(--header-size) -
      var(--size-medium)
  );
  margin-top: var(--size-medium);
}

.content-container.home {
  height: 0;
}

.content {
  width: 100vw;
  position: absolute;
  padding: 0 max(0px, calc((100vw - var(--content-max-width)) / 2));
  transition: var(--speed-fast) ease;
}

.content > div {
  padding: 0.5rem;
}
</style>
