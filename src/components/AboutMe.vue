<script setup lang="ts">
import { html as about } from "@/assets/markdown/about.md";
import { html as education } from "@/assets/markdown/education.md";
import { html as cazoo } from "@/assets/markdown/experience-cazoo.md";
import { html as sms } from "@/assets/markdown/experience-sms.md";
import { html as tamanna } from "@/assets/markdown/experience-tamanna.md";
import { html as tblx } from "@/assets/markdown/experience-tblx.md";
import { html as tomiIntern } from "@/assets/markdown/experience-tomi-intern.md";
import { html as tomi } from "@/assets/markdown/experience-tomi.md";
import { html as wtx } from "@/assets/markdown/experience-wtx.md";
import { html as xgeeks } from "@/assets/markdown/experience-xgeeks.md";
import TimeLine from "@/components/TimeLine.vue";
import ExperienceDetails from "./ExperienceDetails.vue";
import { tools, experienceDates, experienceTools, toolExp, Experiences } from "@/helpers/experience";
import { useTemplateRef, ref, watch } from "vue";

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

  return src;
};

const aboutMd = await parseAbout(about);

const aboutMe = useTemplateRef('about-me');
const tblxEl = useTemplateRef('tblx-exp');
const wtxEl = useTemplateRef('wtx-exp');
const cazooEl = useTemplateRef('cazoo-exp');
const smsEl = useTemplateRef('sms-exp');
const tamannaEl = useTemplateRef('tamanna-exp');
const xgeeksEl = useTemplateRef('xgeeks-exp');
const tomiEl = useTemplateRef('tomi-exp');
const tomiInternEl = useTemplateRef('tomiIntern-exp');
const educationEl = useTemplateRef('education-exp');

const activeElement = ref<Experiences>(Experiences.None);
const aboutMeLoaded = ref(false);
const tblxLoaded = ref(false);
const wtxLoaded = ref(false);
const cazooLoaded = ref(false);
const smsLoaded = ref(false);
const tamannaLoaded = ref(false);
const xgeeksLoaded = ref(false);
const tomiLoaded = ref(false);
const tomiInternLoaded = ref(false);
const educationLoaded = ref(false);

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.intersectionRatio >= 0.1) {
      switch (entry.target) {
        case tblxEl.value:
          activeElement.value = Experiences.tblx;
          break;
        case wtxEl.value:
          activeElement.value = Experiences.wtx;
          break;
        case cazooEl.value:
          activeElement.value = Experiences.cazoo;
          break;
        case smsEl.value:
          activeElement.value = Experiences.sms;
          break;
        case tamannaEl.value:
          activeElement.value = Experiences.tamanna;
          break;
        case xgeeksEl.value:
          activeElement.value = Experiences.xgeeks;
          break;
        case tomiEl.value:
          activeElement.value = Experiences.tomi;
          break;
        case tomiInternEl.value:
          activeElement.value = Experiences.tomiIntern;
          break;
        case educationEl.value:
          activeElement.value = Experiences.education;
          break;
        default:
          activeElement.value = Experiences.None;
      }
    }
  },
  {
    root: null,
    threshold: 0.1,
    rootMargin: '-50% 0px -30% 0px'
  }
);

watch(aboutMe, (value) => {
  if (!aboutMeLoaded.value && !!value) {
    aboutMeLoaded.value = true;
    observer.observe(value);
  }
});
watch(tblxEl, (value) => {
  if (!tblxLoaded.value && !!value) {
    tblxLoaded.value = true;
    observer.observe(value);
  }
});
watch(wtxEl, (value) => {
  if (!wtxLoaded.value && !!value) {
    wtxLoaded.value = true;
    observer.observe(value)
  }
});
watch(cazooEl, (value) => {
  if (!cazooLoaded.value && !!value) {
    cazooLoaded.value = true;
    observer.observe(value)
  }
});
watch(smsEl, (value) => {
  if (!smsLoaded.value && !!value) {
    smsLoaded.value = true;
    observer.observe(value)
  }
});
watch(tamannaEl, (value) => {
  if (!tamannaLoaded.value && !!value) {
    tamannaLoaded.value = true;
    observer.observe(value)
  }
});
watch(xgeeksEl, (value) => {
  if (!xgeeksLoaded.value && !!value) {
    xgeeksLoaded.value = true;
    observer.observe(value)
  }
});
watch(tomiEl, (value) => {
  if (!tomiLoaded.value && !!value) {
    tomiLoaded.value = true;
    observer.observe(value)
  }
});
watch(tomiInternEl, (value) => {
  if (!tomiInternLoaded.value && !!value) {
    tomiInternLoaded.value = true;
    observer.observe(value)
  }
});
watch(educationEl, (value) => {
  if (!educationLoaded.value && !!value) {
    educationLoaded.value = true;
    observer.observe(value)
  }
});

const toolList = useTemplateRef('tool-list');

const toolListTop = ref<number>(0);

watch(toolList, (value) => {
  const rect = value?.getClientRects()[0];
  const v = window.innerHeight - (rect?.height ?? 0);

  toolListTop.value = v / 2;
})
</script>

<template>
  <div id="about-me" class="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2 m-4 mt-16 relative">
    <div class="about-me">
      <TimeLine :start="experienceDates[activeElement].start" :end="experienceDates[activeElement].end" />

      <div ref="about-me">
        <ExperienceDetails :markdown="aboutMd" :tools="experienceTools[Experiences.None]" />
      </div>

      <h3 class="mt-12 md:mt-64">My experience</h3>
      <div ref="tblx-exp">
        <ExperienceDetails :markdown="tblx" :tools="experienceTools[Experiences.tblx]" />
      </div>
      <div ref="wtx-exp">
        <ExperienceDetails :markdown="wtx" :tools="experienceTools[Experiences.wtx]" />
      </div>
      <div ref="cazoo-exp">
        <ExperienceDetails :markdown="cazoo" :tools="experienceTools[Experiences.cazoo]" />
      </div>
      <div ref="sms-exp">
        <ExperienceDetails :markdown="sms" :tools="experienceTools[Experiences.sms]" />
      </div>
      <div ref="tamanna-exp">
        <ExperienceDetails :markdown="tamanna" :tools="experienceTools[Experiences.tamanna]" />
      </div>
      <div ref="xgeeks-exp">
        <ExperienceDetails :markdown="xgeeks" :tools="experienceTools[Experiences.xgeeks]" />
      </div>
      <div ref="tomi-exp">
        <ExperienceDetails :markdown="tomi" :tools="experienceTools[Experiences.tomi]" />
      </div>
      <div ref="tomiIntern-exp">
        <ExperienceDetails :markdown="tomiIntern" :tools="experienceTools[Experiences.tomiIntern]" />
      </div>
      <div ref="education-exp">
        <ExperienceDetails :markdown="education" :tools="experienceTools[Experiences.education]" />
      </div>

    </div>
    <!-- <div class="w-0.5 h-full bg-base-white"></div> -->
    <div class="h-fit sticky items-stretch bottom-0 hidden md:flex" :style="`top: ${toolListTop}px;`" ref="tool-list">
      <div class="grid grid-cols-3 text-sm lg:text-base lg:grid-cols-4 gap-6 content-center w-full">
        <div v-for="tool in tools" :key="tool.name"
          :class="[`tool tool-${tool.type}`, { 'active': toolExp[tool.tool].has(activeElement) }]">
          {{ tool.name }} <i :class="tool.icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>