<script setup lang="ts">
import type { MangaData } from "@/types";

interface Props {
  data: MangaData;
}

defineProps<Props>();
</script>

<template>
  <button class="relative w-52 h-72 duration-200 hover:scale-105">
    <img class="w-full h-full object-cover object-right" :src="data.thumbnail" :alt="data.name.en" />
    <span
      class="absolute bottom-0 left-0 p-2 w-full bg-gradient-to-t from-[#000000bf] from-0% via-[#0000008c] via-50% via-[#00000033] via-90%">{{
        data.name.en
      }}</span>
  </button>
</template>