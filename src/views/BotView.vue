<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import { html as bot } from "@/assets/markdown/bot.md";
import { html as technology } from "@/assets/markdown/technology.md";
import { html as commands } from "@/assets/markdown/commands.md";
import { html as anilist } from "@/assets/markdown/commands/anilist.md";
import { html as birthday } from "@/assets/markdown/commands/birthday.md";
import { html as fandom } from "@/assets/markdown/commands/fandom.md";
import { html as sauce } from "@/assets/markdown/commands/sauce.md";
import { html as settings } from "@/assets/markdown/commands/settings.md";
import { html as achievements } from "@/assets/markdown/commands/achievements.md";
import { html as vndb } from "@/assets/markdown/commands/vndb.md";
import { html as misc } from "@/assets/markdown/commands/misc.md";
import { html as badges } from "@/assets/markdown/commands/badges.md";
import { html as voting } from "@/assets/markdown/commands/voting.md";
import { onUnmounted } from "vue";

let detailsList: DetailsAnimation[] = [];
setTimeout(() => {
  const details = document.querySelectorAll("details");

  for (const el of details) {
    detailsList.push(new DetailsAnimation(el));
  }
});
onUnmounted(() => {
  for (const details of detailsList) {
    details.destructor();
  }

  detailsList = [];
});

const parseBot = (source: string) => {
  let src = source;

  src = src.replace(/{{technology}}/g, parseDetails(technology));
  src = src.replace(/{{commands}}/g, parseDetails(commands));
  src = src.replace(/{{anilist}}/g, parseDetails(anilist));
  src = src.replace(/{{birthday}}/g, parseDetails(birthday));
  src = src.replace(/{{fandom}}/g, parseDetails(fandom));
  src = src.replace(/{{sauce}}/g, parseDetails(sauce));
  src = src.replace(/{{settings}}/g, parseDetails(settings));
  src = src.replace(/{{achievements}}/g, parseDetails(achievements));
  src = src.replace(/{{vndb}}/g, parseDetails(vndb));
  src = src.replace(/{{misc}}/g, parseDetails(misc));
  src = src.replace(/{{badges}}/g, parseDetails(badges));
  src = src.replace(/{{voting}}/g, parseDetails(voting));

  return src;
};

const parseDetails = (source: string) => {
  const experiences = source.split("{{new-entry}}");
  return experiences
    .map(
      (experience) =>
        `<div class="details-content flex flex-col gap-2">${experience}</div>`
    )
    .join("");
};

const src = parseBot(bot);
</script>

<template>
  <div class="w-full px-content-padding mx-auto h-full about overflow-y-auto">
    <Markdown
      class="mb-4 mt-2 flex flex-col gap-4"
      :source="src"
      :html="true"
    />
  </div>
</template>
