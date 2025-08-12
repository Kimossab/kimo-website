<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import { html as bot } from "@/assets/markdown/bot.md";
import { html as rega } from "@/assets/markdown/rega.md";
import { html as website } from "@/assets/markdown/website.md";
import PersonalProject from "@/components/PersonalProject.vue";
import websiteImg from "@/assets/website.png";
import botImg from "@/assets/bot.png";
import LandingSection from "@/components/LandingSection.vue";
import AboutMe from "@/components/AboutMe.vue";
</script>

<template>
  <LandingSection />

  <AboutMe />

  <div class="mt-12">
    <h3>Personal Projects</h3>
    <div class="grid gap-6 grid-cols-1 p-6">
      <PersonalProject :image="websiteImg">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4" :source="website" :html="true" />
      </PersonalProject>
      <PersonalProject :image="botImg">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4" :source="bot" :html="true" />
      </PersonalProject>
      <PersonalProject image="/rega-pcb.png">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4" :source="rega" :html="true" />
      </PersonalProject>
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/base.css";

h3 {
  @apply text-center;
}

.tool {
  @apply duration-500;
  @apply opacity-20;
  @apply border rounded p-2 flex items-center justify-center gap-2 h-16;

  @apply hover:scale-105;
}
.tool.active {
  @apply opacity-100;
}
.tool i {
  @apply text-2xl
}

.tool-lang {
  @apply border-emerald-300 shadow-lg bg-radial from-emerald-300/25 to-transparent;
}
.tool-frame {
  @apply border-orange-300 shadow-lg bg-radial from-orange-300/25 to-transparent;
}
.tool-db {
  @apply border-sky-300 shadow-lg bg-radial from-sky-300/25 to-transparent;
}
.tool-other {
  @apply border-amber-300 shadow-lg bg-radial from-amber-300/25 to-transparent;
}

.experience {
  @apply  md:min-h-[50vh] py-6;
}
</style>