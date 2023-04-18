<script setup lang="ts">
import { Bar } from "vue-chartjs";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import { ref, onMounted, onUnmounted } from "vue";
import type { GraphData } from "@/helpers/AMQ.js";

interface Props {
  name: string;
  data: [{ key: string; title: string; subtitle?: string }, number][];
  graph?: GraphData;
}

defineProps<Props>();

const detailsRef = ref(null);
let detailsAnimation: DetailsAnimation | null = null;

onMounted(() => {
  if (detailsRef.value) {
    detailsAnimation = new DetailsAnimation(detailsRef.value);
  }
});
onUnmounted(() => {
  detailsAnimation?.destructor();
  detailsAnimation = null;
});
</script>

<template>
  <details ref="detailsRef">
    <summary>{{ name }}</summary>
    <div class="details-content">
      <div class="flex flex-wrap gap-3 p-2">
        <div
          v-for="[single, count] of data"
          :key="`${single.key}`"
          class="rounded border border-stone-100 p-1 relative"
        >
          <span>{{ single.title }}</span>
          <span
            v-if="single.subtitle"
            class="before:content-['by'] before:mx-1 before:text-xs text-xs"
            >{{ single.subtitle }}</span
          >
          <div
            class="rounded-full absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-slate-500 h-5 w-5 text-sm text-stone-100 flex justify-center items-center"
          >
            {{ count }}
          </div>
        </div>
      </div>
      <Bar
        v-if="graph"
        :data="{
          labels: graph.labels,
          datasets: [
            {
              data: graph.data,
              label: 'Music Count',
            },
          ],
        }"
        :options="{ responsive: true }"
        :style="{ height: '6rem' }"
      />
    </div>
  </details>
</template>
