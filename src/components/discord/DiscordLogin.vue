<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDiscord } from "@/stores/discord";

const route = useRoute();
const discord = useDiscord();

discord.load();
if (discord.codeVerifier || discord.token) {
  if (route.query.code) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}

const authenticate = () => {
  console.log("authenticate", discord.isLoading);
  if (!discord.isLoading) {
    discord.authenticate();
  }
};
</script>

<template>
  <div class="max-h-16 border rounded-2xl p-2 flex items-center gap-4">
    <template v-if="discord.token == null">
      <div class="border-r p-2 h-full flex items-center">
        <font-awesome-icon :icon="['fab', 'discord']"></font-awesome-icon>
      </div>
      <button @click="authenticate">Discord login</button>
    </template>
    <template v-else>
      <div class="border-r p-2 h-full flex items-center">
        <font-awesome-icon :icon="['fab', 'discord']"></font-awesome-icon>
      </div>
      <img
        v-if="discord.user"
        class="h-12 rounded-full"
        :src="`https://cdn.discordapp.com/avatars/${discord.user.id}/${discord.user.avatar}.png`"
        :alt="`${discord.user.username}'s avatar`"
      />
      <div class="flex flex-col">
        <span>@{{ discord.user?.username }}</span>
        <span v-if="discord.playerData" class="text-sm">{{
          discord.playerData.username
        }}</span>
      </div>
      <button class="bg-red-500 rounded-lg p-2 h-full" @click="discord.logout">
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
      </button>
    </template>
  </div>
</template>
