<script setup lang="ts">
import { ref } from "vue";

interface Props {
  sections: {
    title: string;
    label: string;
  }[];
}

defineProps<Props>();

const selected = ref<string | null>(null);
</script>

<template>
  <div class="flex border-b mx-0 my-1 flex-wrap">
    <button
      v-for="section in sections"
      :key="`tab-${section.label}`"
      :class="[
        'mt-0 rounded-t-md p-2 text-sm mb-1',
        {
          'font-bold border-b-2 border-solid !border-blue-500':
            selected === section.label,
        },
      ]"
      @click="
        selected !== section.label
          ? (selected = section.label)
          : (selected = null)
      "
    >
      {{ section.title }}
    </button>
  </div>

  <div
    v-for="section in sections"
    v-show="selected === section.label"
    :key="section.label"
  >
    <slot :name="section.label"></slot>
  </div>
</template>
