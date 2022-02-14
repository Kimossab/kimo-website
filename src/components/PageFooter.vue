<script setup lang="ts">
import MalIcon from "@/components/icons/MalIcon.vue";
</script>

<template>
  <footer>
    <a href="https://github.com/Kimossab" target="_blank">
      <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
      <span>Github</span>
    </a>
    <a href="mailto:kimossab@outlook.pt" target="_blank">
      <font-awesome-icon icon="envelope"></font-awesome-icon>
      <span>Email</span>
    </a>
    <a href="https://www.linkedin.com/in/luis-mc-pereira/" target="_blank">
      <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
      <span>LinkedIn</span>
    </a>
    <a href="https://myanimelist.net/profile/Kimossab" target="_blank">
      <MalIcon style="width: 1em" />
      <span>MyAnimeList</span>
    </a>
    <span>
      <font-awesome-icon :icon="['fab', 'discord']"></font-awesome-icon>
      <span>Kimossab#6954</span>
    </span>
  </footer>
</template>

<style>
footer {
  width: 100vw;
  height: var(--footer-size);
  background: #0000001f;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
footer > * > span {
  margin: 0 0.2rem;
}
footer > a,
footer > span {
  margin: 0 0.5rem;
  text-decoration: inherit;
  white-space: nowrap;
}

@media screen and (max-width: 54rem) {
  footer {
    height: var(--footer-size);
    font-size: 0.8rem;
  }
}
</style>
