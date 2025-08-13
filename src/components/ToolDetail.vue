<script setup lang="ts">
import type { ToolData } from '@/helpers/experience';

defineProps<{
  tool: ToolData,
  isActive: boolean
}>();
</script>

<template>
  <div :key="tool.name" :class="[`tool tool-${tool.type}`, { 'active': isActive }]">
    {{ tool.name }} <i :class="tool.icon"></i>
  </div>
</template>
<style>
@reference "@/assets/css/base.css";

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
  @apply border-emerald-300 shadow-lg bg-radial from-transparent dark:from-emerald-300/25 to-emerald-300/50 dark:to-transparent;
}
.tool-frame {
  @apply border-orange-300 shadow-lg bg-radial from-transparent dark:from-orange-300/25 to-orange-300/50 dark:to-transparent;
}
.tool-db {
  @apply border-sky-300 shadow-lg bg-radial from-transparent dark:from-sky-300/25 to-sky-300/50 dark:to-transparent;
}
.tool-other {
  @apply border-amber-300 shadow-lg bg-radial from-transparent dark:from-amber-300/25 to-amber-300/50 dark:to-transparent;
}

</style>