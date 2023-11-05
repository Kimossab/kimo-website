<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name: string;
  public: boolean;
}
interface Emits {
  (e: "update:name", value: string): void;
  (e: "update:public", value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const tournamentName = computed({
  get() {
    return props.name;
  },
  set(value) {
    emit("update:name", value);
  },
});
const tournamentIsPublic = computed({
  get() {
    return props.public;
  },
  set(value) {
    emit("update:public", value);
  },
});
</script>

<template>
  <h3>Tournament Details</h3>

  <div class="flex-col flex">
    <label for="tournament-name">Tournament name:</label>
    <input v-model="tournamentName" name="tournament-name" />
  </div>

  <div class="flex">
    <label>
      <input v-model="tournamentIsPublic" type="checkbox" />
      <span>
        The tournament is public (tournament will appear in the list of
        tournaments)</span
      >
    </label>
  </div>
</template>
