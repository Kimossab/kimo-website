<script setup lang="ts">
import SimpleButton from "@/components/SimpleButton.vue";
import type { ITournament } from "@/helpers/AMQ";
import { ButtonVariants } from "@/types";
import NewPhaseModal from "@/components/amq/tournament/NewPhaseModal.vue";
import { ref } from "vue";

interface Props {
  tournament: ITournament;
}
interface Emits {
  (e: "update", data: ITournament): void;
}
defineProps<Props>();
defineEmits<Emits>();

const newPhaseModal = ref<boolean>(false);
</script>

<template>
  <NewPhaseModal
    v-if="newPhaseModal"
    :tournament="tournament"
    @update="
      (t) => {
        newPhaseModal = false;
        $emit('update', t);
      }
    "
    @cancel="newPhaseModal = false"
  />
  <div class="flex gap-2">
    <span>Status:</span>
    <span>{{ tournament.status }}</span>
    <SimpleButton
      :variant="ButtonVariants.Small"
      :disabled="!tournament.name"
      @click="newPhaseModal = true"
    >
      Create new phase
    </SimpleButton>
  </div>
</template>
