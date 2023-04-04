<script setup lang="ts">
import MalIcon from "@/components/icons/MalIcon.vue";
</script>

<template>
  <footer>
    <a href="https://github.com/Kimossab" class="flex items-center gap-0.5 whitespace-nowrap" target="_blank">
      <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
      <span>Github</span>
    </a>
    <a href="mailto:kimossab@outlook.pt" class="flex items-center gap-0.5 whitespace-nowrap" target="_blank">
      <font-awesome-icon icon="envelope"></font-awesome-icon>
      <span>Email</span>
    </a>
    <a href="https://www.linkedin.com/in/luis-mc-pereira/" class="flex items-center gap-0.5 whitespace-nowrap"
      target="_blank">
      <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
      <span>LinkedIn</span>
    </a>
    <a href="https://myanimelist.net/profile/Kimossab" class="flex items-center gap-0.5 whitespace-nowrap"
      target="_blank">
      <MalIcon style="width: 1em" />
      <span>MyAnimeList</span>
    </a>
    <span class="flex items-center gap-0.5 whitespace-nowrap">
      <font-awesome-icon :icon="['fab', 'discord']"></font-awesome-icon>
      <span>Kimossab#6954</span>
    </span>
  </footer>
</template>