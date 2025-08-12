<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import type { ToolData } from '@/helpers/experience';
import ToolList from "./ToolDetail.vue";
import ToolDetail from "./ToolDetail.vue";

defineProps<{
  markdown: string;
  tools: ToolData[];
}>();
</script>

<template>
  <div ref="tblx-exp" class="experience">
    <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="markdown" :html="true" />

    <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
      <ToolDetail v-for="tool in tools" :key="tool.name" :tool="tool" :is-active="true" />
    </div>
  </div>
</template>