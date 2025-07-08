<script setup lang="ts">
import { useAppStore } from "../stores/app";
const store = useAppStore();
</script>

<template>
  <nav :class="{ 'h-home-nav': $route.name === 'home' }">
    <router-link to="/about">
      <button
        class="bg-slate-800/40 transition hover:scale-105 border border-solid border-slate-950 w-full h-full drop-shadow-lg -skew-x-12 rounded-2xl cursor-pointer overflow-hidden no-select"
      >
        <div class="absolute top-0 left-0 w-full h-full opacity-50">
          <img
            v-if="store.darkMode"
            src="@/assets/about.png"
            alt="About me"
            class="w-full h-home-nav object-cover object-left-top no-select"
          />
          <img
            v-else
            src="@/assets/about-light.png"
            alt="About me"
            class="w-full h-home-nav object-cover object-left-top no-select"
          />
        </div>
        <div class="text-3xl skew-x-12 dark:mix-blend-plus-lighter">About</div>
      </button>
    </router-link>
    <router-link to="/bot">
      <button
        class="bg-slate-800/40 transition hover:scale-105 border border-solid border-slate-950 w-full h-full drop-shadow-lg -skew-x-12 rounded-2xl cursor-pointer overflow-hidden no-select"
      >
        <div class="absolute top-0 left-0 w-full h-full opacity-50">
          <img
            v-if="store.darkMode"
            src="@/assets/bot.png"
            alt="Bot"
            class="w-full h-home-nav object-cover object-left-top no-select"
          />
          <img
            v-else
            src="@/assets/bot-light.png"
            alt="Bot"
            class="w-full h-home-nav object-cover object-left-top no-select"
          />
        </div>
        <div class="text-3xl skew-x-12 dark:mix-blend-plus-lighter">Bot</div>
      </button>
    </router-link>
    <router-link to="/luna">
      <button
        class="bg-slate-800/40 transition hover:scale-105 border border-solid border-slate-950 w-full h-full drop-shadow-lg -skew-x-12 rounded-2xl cursor-pointer overflow-hidden no-select"
      >
        <div class="absolute top-0 left-0 w-full h-full opacity-50">
          <img
            src="@/assets/luna.png"
            alt="Luna"
            class="w-full h-home-nav object-cover no-select"
          />
        </div>
        <div
          class="text-3xl skew-x-12 dark:mix-blend-plus-lighter mix-blend-darken"
        >
          Luna
        </div>
      </button>
    </router-link>
    <router-link to="/misc">
      <button
        class="bg-slate-800/40 transition hover:scale-105 border border-solid border-slate-950 w-full h-full drop-shadow-lg -skew-x-12 rounded-2xl cursor-pointer overflow-hidden no-select"
      >
        <div
          class="absolute top-0 left-0 w-full h-full opacity-50 flex items-center justify-center"
        >
          <font-awesome-icon
            class="w-[85%] h-44"
            icon="plus"
          ></font-awesome-icon>
        </div>
        <div
          class="text-3xl skew-x-12 stroke-black dark:mix-blend-plus-lighter"
        >
          More
        </div>
      </button>
    </router-link>
  </nav>
</template>
