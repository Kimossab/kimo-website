<script setup lang="ts">
import IconDetail from './IconDetail.vue';

</script>

<template>
  <div class="w-screen h-dvh grid grid-rows-[1fr_6rem] gap-2 justify-center">
    <div class="flex flex-col justify-center items-center gap-6">
      <div class="text-center">
        <h2>Luís Pereira</h2>
        <h1>Software Engineer</h1>
      </div>
      <div class="flex gap-2 justify-center">
        <IconDetail link="mailto:kimossab+kmcom@outlook.pt" icon="envelope">Email</IconDetail>
        <IconDetail link="https://github.com/Kimossab" :icon="['fab', 'github']">Github</IconDetail>
        <IconDetail link="https://www.linkedin.com/in/luis-mc-pereira/" :icon="['fab', 'linkedin']">
          LinkedIn
        </IconDetail>
        <IconDetail :icon="['fab', 'discord']">@kimossab</IconDetail>
      </div>
    </div>
    <a href="#about-me"
      class="text-center pb-3 h-16 relative after:content-['⌄'] after:absolute after:top-2 after:text-3xl after:left-1/2 after:-translate-x-1/2 after:size-9">
      More
      details
    </a>
  </div>
</template>