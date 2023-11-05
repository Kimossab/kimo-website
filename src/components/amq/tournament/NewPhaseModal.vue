<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import type { ITournament } from "@/helpers/AMQ";
import { chunkArray, shuffle } from "@/helpers/common";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants, type TournamentPlayer } from "@/types";
import { computed, ref } from "vue";

interface Props {
  tournament: ITournament;
}
interface Emits {
  (e: "update", tournament: ITournament): void;
  (e: "cancel"): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const discord = useDiscord();

const playersPerGroup = ref<number>(2);
const availablePlayers = ref<TournamentPlayer[]>(
  shuffle(
    props.tournament.phases.length
      ? []
      : props.tournament.players.filter((p) => p.approved)
  )
);

const groupList = computed(() => {
  return chunkArray(availablePlayers.value, playersPerGroup.value);
});

const shufflePlayers = () => {
  availablePlayers.value = shuffle(availablePlayers.value);
};

const newPhase = async () => {
  const tournament = await discord.createPhase(
    props.tournament._id,
    groupList.value.map((g) => g.map((p) => p.discordId || p.name))
  );

  emits("update", tournament);
};
</script>

<template>
  <BaseModal @close="$emit('cancel')">
    <template #header>New Phase</template>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <span>Number of players per group:</span>
        <input v-model="playersPerGroup" type="number" min="2" />
        <SimpleButton :variant="ButtonVariants.Small" @click="shufflePlayers"
          >Shuffle players</SimpleButton
        >
      </div>

      <div>Groups:</div>

      <div
        v-for="(group, index) in groupList"
        :key="JSON.stringify(group)"
        class="flex gap-2"
      >
        <span>Group {{ index + 1 }}:</span>
        <code v-for="player in group" :key="player.name">
          {{ player.name }}
        </code>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-4">
        <SimpleButton :variant="ButtonVariants.Small" @click="newPhase">
          Accept
        </SimpleButton>
        <SimpleButton :variant="ButtonVariants.Small" @click="$emit('cancel')">
          Cancel
        </SimpleButton>
      </div>
    </template>
  </BaseModal>
</template>
