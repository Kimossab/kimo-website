<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import {
  getPlayersMatchStats,
  sortedPlayerData,
  type ITournament,
  type TournamentPlayerStats,
} from "@/helpers/AMQ";
import { chunkArray, shuffle } from "@/helpers/common";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants } from "@/types";
import { computed, ref, watch } from "vue";

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
const advancingPlayers = ref<number>(1);
const shuffledPlayers = ref<TournamentPlayerStats[]>([]);

const availablePlayers = computed(() => {
  if (props.tournament.phases.length) {
    return props.tournament.players
      .filter((p) => p.approved)
      .map((p) => ({
        id: p.discordId ?? p.name,
        player: p.name,
        matches: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        correct: 0,
        c_diff: 0,
      }));
  }

  const phase = props.tournament.phases[props.tournament.phases.length - 1];

  const playersForNext: TournamentPlayerStats[] = [];

  for (const group of phase.groups) {
    const players = getPlayersMatchStats(group, props.tournament);
    const sortedPlayers = sortedPlayerData(players);

    playersForNext.push(...sortedPlayers.slice(0, advancingPlayers.value));
  }

  return playersForNext;
});

watch(availablePlayers, () => shufflePlayers());

const groupList = computed(() => {
  return chunkArray<{
    id: string;
    player: string;
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    correct: number;
    c_diff: number;
  }>(shuffledPlayers.value, playersPerGroup.value);
});

const shufflePlayers = () => {
  shuffledPlayers.value = shuffle(availablePlayers.value);
};

const newPhase = async () => {
  const tournament = await discord.createPhase(
    props.tournament._id,
    groupList.value.map((g) => g.map((p) => p.id))
  );

  emits("update", tournament);
};
</script>

<template>
  <BaseModal @close="$emit('cancel')">
    <template #header>New Phase</template>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <template v-if="tournament.phases.length">
          <span>Number of players that advance to next phase per group:</span>
          <input v-model="advancingPlayers" type="number" min="1" />
        </template>
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
        <code v-for="player in group" :key="player.id">
          {{ player.player }}
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
