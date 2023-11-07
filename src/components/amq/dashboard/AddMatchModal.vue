<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import SimpleButton from "@/components/SimpleButton.vue";
import type { ITournament, MatchSong } from "@/helpers/AMQ";
import { AmqMatchSchema } from "@/helpers/AmqMatch";
import { useDiscord } from "@/stores/discord";
import { ButtonVariants } from "@/types";
import { ref, watch } from "vue";

interface Emits {
  (e: "update", tournament: ITournament): void;
  (e: "close"): void;
}

interface Props {
  tournament: ITournament;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const discord = useDiscord();

const amqJson = ref<string>("");
const player1 = ref<string>("");
const player2 = ref<string>("");
const player1Points = ref<number | null>(null);
const player2Points = ref<number | null>(null);
const songList = ref<MatchSong[]>([]);

watch(amqJson, (value) => {
  try {
    songList.value = [];
    const data = AmqMatchSchema.parse(JSON.parse(value));

    let p1Points = 0;
    let p1Name: string | null = null;
    let p2Points = 0;
    let p2Name: string | null = null;

    const names: string[] = [];

    for (const song of data.songs) {
      const correctAnswers = [];

      if (names.length < 2 && song.correctGuessPlayers) {
        for (const player of song.correctGuessPlayers) {
          if (!names.includes(player)) {
            names.push(player);
          }
        }
      }

      if (song.correctGuess) {
        correctAnswers.push("p1");
        p1Points++;
        if (song.correctCount > 1) {
          correctAnswers.push("p2");
          p2Points++;

          if (p1Name && !p2Name && song.correctGuessPlayers) {
            p2Name = song.correctGuessPlayers.filter((n) => n !== p1Name)[0];
          }
        } else {
          if (!p1Name && song.correctGuessPlayers) {
            p1Name = song.correctGuessPlayers[0];
          }
        }
      } else if (song.correctCount > 0) {
        correctAnswers.push("p2");
        p2Points++;

        if (!p2Name && song.correctGuessPlayers) {
          p2Name = song.correctGuessPlayers[0];
        }
      }

      songList.value.push({
        correctAnswers,
        song: props.tournament.songs.find(
          (s) =>
            s.name === song.songInfo.songName &&
            s.artist === song.songInfo.artist
        )!._id,
        startPoint: song.startPoint,
        videoLength: song.videoLength,
      });
    }

    if (p1Name) {
      player1.value = p1Name;
    }
    if (p2Name) {
      player2.value = p2Name;
    }

    player1Points.value = p1Points;
    player2Points.value = p2Points;
  } finally {
    /* empty */
  }
});

const accept = async () => {
  const p1 = props.tournament.players.find(
    (p) => p.discordId === player1.value || p.name === player1.value
  );
  const p2 = props.tournament.players.find(
    (p) => p.discordId === player2.value || p.name === player2.value
  );
  const data = await discord.createMatch(props.tournament._id, {
    players: [
      {
        id: p1?.discordId ?? p1?.name ?? player1.value,
        points: player1Points.value ?? 0,
      },
      {
        id: p2?.discordId ?? p2?.name ?? player2.value,
        points: player2Points.value ?? 0,
      },
    ],
    songList: songList.value.map((s) => ({
      ...s,
      correctAnswers: s.correctAnswers.map((a) =>
        a === "p1"
          ? p1?.discordId ?? player1.value
          : p2?.discordId ?? player2.value
      ),
    })),
  });
  emit("update", data);
};
</script>
<template>
  <BaseModal @close="$emit('close')">
    <template #header>Add a match</template>

    <div class="flex flex-col">
      <div>AMQ JSON</div>
      <textarea v-model="amqJson" class="text-sm" rows="8"></textarea>

      <div class="flex-col flex">
        <label for="player1">Player 1 name:</label>
        <input v-model="player1" name="player1" />
      </div>
      <div class="flex-col flex">
        <label for="player2">Player 2 name:</label>
        <input v-model="player2" name="player2" />
      </div>

      {{ player1Points }} x {{ player2Points }}
    </div>

    <template #footer>
      <div class="flex justify-end gap-4">
        <SimpleButton
          :variant="ButtonVariants.Small"
          :disabled="!amqJson"
          @click="accept"
        >
          Accept
        </SimpleButton>
        <SimpleButton :variant="ButtonVariants.Small" @click="$emit('close')">
          Cancel
        </SimpleButton>
      </div>
    </template>
  </BaseModal>
</template>
