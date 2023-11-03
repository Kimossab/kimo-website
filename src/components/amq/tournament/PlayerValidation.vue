<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import { ButtonVariants, type TournamentPlayer } from "@/types";
import SingleAnime from "../SingleAnime.vue";
import { ref } from "vue";
import { useDiscord } from "@/stores/discord";
import type { ITournament } from "@/helpers/AMQ";

interface Props {
  tournamentId: string;
  player: TournamentPlayer;
}
interface Emits {
  (e: "update", tournament: ITournament): void;
  (e: "cancel"): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const amqJson = ref<string>("");
const discord = useDiscord();

const approve = async () => {
  const tournament = await discord.validatePlayer(
    props.tournamentId,
    props.player.discordId!,
    amqJson.value
  );

  emits("update", tournament);
};
</script>

<template>
  <BaseModal @close="$emit('cancel')">
    <template #header>Player validation ({{ player.name }})</template>

    <div class="flex flex-col">
      <div class="flex justify-center flex-wrap gap-4">
        <SingleAnime
          v-for="anime in player.playlist.animeList"
          :key="JSON.stringify(anime)"
          :anime="anime"
          small
        ></SingleAnime>
      </div>
      <div>AMQ JSON</div>
      <textarea v-model="amqJson" class="text-sm" rows="8"></textarea>
    </div>

    <template #footer>
      <div class="flex justify-end gap-4">
        <SimpleButton
          :variant="ButtonVariants.Small"
          :disabled="!amqJson"
          @click="approve"
        >
          Approve
        </SimpleButton>
        <SimpleButton :variant="ButtonVariants.Small" @click="$emit('cancel')">
          Cancel
        </SimpleButton>
      </div>
    </template>
  </BaseModal>
</template>
