<script setup lang="ts">
import SimpleButton from "@/components/SimpleButton.vue";
import type { ITournament } from "@/helpers/AMQ";
import { ButtonVariants } from "@/types";
import NewPhaseModal from "@/components/amq/tournament/NewPhaseModal.vue";
import { computed, ref } from "vue";

interface Props {
  tournament: ITournament;
}
interface Emits {
  (e: "update", data: ITournament): void;
}
const props = defineProps<Props>();
defineEmits<Emits>();

const newPhaseModal = ref<boolean>(false);

const phaseTabs = computed(() => {
  return props.tournament.phases.map((p) => ({
    title: `Phase ${p.order}`,
    label: `phase-${p.order}`,
    groups: p.groups,
  }));
});
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

  <SimpleTab v-if="tournament.phases.length" :sections="phaseTabs">
    <template v-for="phase of phaseTabs" :key="phase.label" #[phase.label]>
      <div
        v-for="(group, index) in phase.groups"
        :key="JSON.stringify(group)"
        class="flex gap-2"
      >
        <span>Group {{ index + 1 }}:</span>
        <code v-for="player in group.players" :key="player">
          {{
            tournament.players.find((p) => p.discordId === player)?.name ||
            player
          }}
        </code>
      </div>
    </template>
  </SimpleTab>
</template>
