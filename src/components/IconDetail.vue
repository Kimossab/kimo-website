<script setup lang="ts">
defineProps<{
  link?: string,
  icon: string[] | string
}>();
</script>

<template>
  <a v-if="link" :href="link" class="flex items-center gap-0.5 !no-underline border p-2 rounded hover:scale-105"
    target="_blank">
    <font-awesome-icon :icon="icon"></font-awesome-icon>
    <slot></slot>
  </a>
  <span v-else class="cursor-default flex items-center gap-0.5 !no-underline border p-2 rounded hover:scale-105">
    <font-awesome-icon :icon="icon"></font-awesome-icon>
    <slot></slot>
  </span>
</template>