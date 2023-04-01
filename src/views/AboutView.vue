<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import { html as about } from "@/assets/markdown/about.md";
import { html as education } from "@/assets/markdown/education.md";
import { html as workExperience } from "@/assets/markdown/work_experience.md";
import DetailsAnimation from "@/helpers/DetailsAnimation";

const getAge = () => {
  const bDay = +new Date(1995, 11, 30);

  const ageDifMs = Date.now() - bDay;
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const parseAbout = (source: string) => {
  const age = getAge();
  let src = source;

  src = src.replace(/{{age}}/g, age.toString());
  src = src.replace(/{{work_experience}}/g, parseDetails(workExperience));
  src = src.replace(/{{education}}/g, parseDetails(education));

  return src;
};

const parseDetails = (source: string) => {
  const child = source.startsWith("<p>") ? source.slice(3, -5) : source;
  const experiences = child.split("{{new-entry}}");
  return experiences
    .map((experience) => {
      const xp = experience.split("{{description}}");

      return `<div class="details-content flex"><div class="period">${xp[0]}</div><div class="description">${xp[1]}</div></div>`;
    })
    .join("");
};

setTimeout(() => {
  const details = document.querySelectorAll("details");
  for (const el of details) {
    // eslint-disable-next-line no-new
    new DetailsAnimation(el);
  }
});

const src = parseAbout(about);
</script>

<template>
  <div class="content about">
    <Markdown :source="src" :html="true" />
  </div>
</template>

<style lang="scss">
.details-content.flex {
  display: flex;
}

.period {
  border-right: 1px solid grey;
  margin-right: 1rem;
  padding-right: 1rem;
  flex-shrink: 0;
  width: 10rem;
}

.date {
  font-weight: bold;
}

.about H4 {
  margin: 0;
}
</style>
