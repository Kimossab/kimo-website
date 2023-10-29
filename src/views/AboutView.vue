<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import { html as about } from "@/assets/markdown/about.md";
import DetailsAnimation from "@/helpers/DetailsAnimation";
import { onUnmounted } from "vue";

const getAge = () => {
  const bDay = +new Date(1995, 11, 30);

  const ageDifMs = Date.now() - bDay;
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const parseAbout = async (source: string) => {
  const age = getAge();
  let src = source;

  src = src.replace(/{{var:age}}/g, age.toString());
  const regex = /{{(?!var:)[^}]*}}/gm;

  for (const match of src.match(regex) ?? []) {
    const file = match.substring(2, match.length - 2);

    const { html } = await import(`@/assets/markdown/${file}.md`);

    src = src.replace(match, parseDetails(html));
  }

  return src;
};

const parseDetails = (source: string) => {
  const child = source.startsWith("<p>") ? source.slice(3, -5) : source;
  const experiences = child.split("{{new-entry}}");
  return experiences
    .map((experience) => {
      const xp = experience.split("{{description}}");

      if (xp.length === 2) {
        return `<div class="details-content flex">
        <div class="border-r-2 border-solid border-gray-600 mr-4 pr-4 flex-shrink-0 w-40">${xp[0]}</div>
        <div class="flex flex-col gap-2">${xp[1]}</div>
        </div>`;
      }

      return `<div class="details-content flex">${xp}</div>`;
    })
    .join("");
};

let detailsList: DetailsAnimation[] = [];

onUnmounted(() => {
  for (const details of detailsList) {
    details.destructor();
  }

  detailsList = [];
});

const src = await parseAbout(about);

setTimeout(() => {
  const details = document.querySelectorAll("details");
  for (const el of details) {
    detailsList.push(new DetailsAnimation(el));
  }
});
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
