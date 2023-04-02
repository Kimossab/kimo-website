<script setup lang="ts">
import { useAppStore } from "../stores/app";
const store = useAppStore();
</script>

<template>
  <nav :class="{ 'h-home-nav': $route.name === 'home' }">
    <router-link to="/">
      <button
        class="bg-slate-800 bg-opacity-40 transition hover:scale-105 border border-solid border-slate-950 w-full h-full drop-shadow-lg -skew-x-12 rounded-2xl cursor-pointer overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-50">
          <font-awesome-icon class="w-[85%] h-full" icon="home"></font-awesome-icon>
        </div>
        <div class="text-3xl skew-x-12">Home</div>
      </button>
    </router-link>
    <router-link to="/about">
      <button
        class="bg-slate-800 bg-opacity-40 transition hover:scale-105 border border-solid border-slate-950 w-full h-full drop-shadow-lg -skew-x-12 rounded-2xl cursor-pointer overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-50">
          <img v-if="store.darkMode" src="@/assets/about.png" alt="About me"
            class="w-full h-full object-cover object-left-top" />
          <img v-else src="@/assets/about-light.png" alt="About me" class="w-full h-full object-cover object-left-top" />
        </div>
        <div class="text-3xl skew-x-12">About</div>
      </button>
    </router-link>
    <router-link to="/bot">
      <button
        class="bg-slate-800 bg-opacity-40 transition hover:scale-105 border border-solid border-slate-950 w-full h-full drop-shadow-lg -skew-x-12 rounded-2xl cursor-pointer overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-50">
          <img v-if="store.darkMode" src="@/assets/bot.png" alt="Bot"
            class="w-full h-full object-cover object-left-top" />
          <img v-else src="@/assets/bot-light.png" alt="Bot" class="w-full h-full object-cover object-left-top" />
        </div>
        <div class="text-3xl skew-x-12">Bot</div>
      </button>
    </router-link>
    <router-link to="/luna">
      <button
        class="bg-slate-800 bg-opacity-40 transition hover:scale-105 border border-solid border-slate-950 w-full h-full drop-shadow-lg -skew-x-12 rounded-2xl cursor-pointer overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-50">
          <img src="@/assets/luna.png" alt="Luna" class="w-full h-full object-cover" />
        </div>
        <div class="text-3xl skew-x-12 shadow-2xl">Luna</div>
      </button>
    </router-link>
  </nav>
</template>
