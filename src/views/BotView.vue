<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import { html as bot } from "@/assets/markdown/bot.md";
import { html as technology } from "@/assets/markdown/technology.md";
import { html as commands } from "@/assets/markdown/commands.md";
import { html as anilist } from "@/assets/markdown/commands/anilist.md";
import { html as birthday } from "@/assets/markdown/commands/birthday.md";
import { html as wiki } from "@/assets/markdown/commands/wiki.md";
import { html as sauce } from "@/assets/markdown/commands/sauce.md";
import { html as settings } from "@/assets/markdown/commands/settings.md";
import { html as achievements } from "@/assets/markdown/commands/achievements.md";
import { html as vn } from "@/assets/markdown/commands/vn.md";
import { html as misc } from "@/assets/markdown/commands/misc.md";
import { html as badges } from "@/assets/markdown/commands/badges.md";

setTimeout(() => {
  const details = document.querySelectorAll("details");

  for (const el of details) {
    // eslint-disable-next-line no-new
    new DetailsAnimation(el);
  }
});

const parseBot = (source: string) => {
  let src = source;

  src = src.replace(/{{technology}}/g, parseDetails(technology));
  src = src.replace(/{{commands}}/g, parseDetails(commands));
  src = src.replace(/{{anilist}}/g, parseDetails(anilist));
  src = src.replace(/{{birthday}}/g, parseDetails(birthday));
  src = src.replace(/{{wiki}}/g, parseDetails(wiki));
  src = src.replace(/{{sauce}}/g, parseDetails(sauce));
  src = src.replace(/{{settings}}/g, parseDetails(settings));
  src = src.replace(/{{achievements}}/g, parseDetails(achievements));
  src = src.replace(/{{vn}}/g, parseDetails(vn));
  src = src.replace(/{{misc}}/g, parseDetails(misc));
  src = src.replace(/{{badges}}/g, parseDetails(badges));

  return src;
};

const parseDetails = (source: string) => {
  const experiences = source.split("{{new-entry}}");
  return experiences
    .map((experience) => `<div class="details-content">${experience}</div>`)
    .join("");
};

const src = parseBot(bot);
</script>

<template>
  <div class="content bot">
    <Markdown :source="src" :html="true" />
  </div>
</template>

<style>
.commands details {
  margin-left: var(--size-medium);
}
</style>
