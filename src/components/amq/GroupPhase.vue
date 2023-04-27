<script setup lang="ts">
import type { ITournament, Phase } from "@/helpers/AMQ";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import { ref, onMounted, onUnmounted } from "vue";
import GroupDetails from "./GroupDetails.vue";

interface Props {
  phase: Phase;
  tournament: ITournament;
}
defineProps<Props>();

const detailsPhase = ref(null);
let detailsPhaseAnimation: DetailsAnimation | null = null;

onMounted(() => {
  if (detailsPhase.value) {
    detailsPhaseAnimation = new DetailsAnimation(detailsPhase.value, 500);
  }
});
onUnmounted(() => {
  detailsPhaseAnimation?.destructor();
  detailsPhaseAnimation = null;
});
</script>

<template>
  <details ref="detailsPhase">
    <summary class="font-bold text-lg">Phase {{ phase.order }}</summary>
    <div class="details-content">
      <div class="flex flex-col gap-2 my-2">
        <div
          v-for="(group, index) in phase.groups"
          :key="group._id"
          class="border rounded"
        >
          <GroupDetails
            :group="group"
            :index="index"
            :tournament="tournament"
          />
        </div>
      </div>
    </div>
  </details>
</template>
