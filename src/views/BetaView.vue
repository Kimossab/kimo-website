<script setup lang="ts">
import Markdown from "vue3-markdown-it";
import { html as about } from "@/assets/markdown/about2.md";
import { html as tblx } from "@/assets/markdown/experience-tblx.md";
import { html as xgeeks } from "@/assets/markdown/experience-xgeeks.md";
import { html as cazoo } from "@/assets/markdown/experience-cazoo.md";
import { html as sms } from "@/assets/markdown/experience-sms.md";
import { html as tamanna } from "@/assets/markdown/experience-tamanna.md";
import { html as tomiIntern } from "@/assets/markdown/experience-tomi-intern.md";
import { html as tomi } from "@/assets/markdown/experience-tomi.md";
import { html as wtx } from "@/assets/markdown/experience-wtx.md";
import { html as education } from "@/assets/markdown/education2.md";
import { html as website } from "@/assets/markdown/website.md";
import { html as bot } from "@/assets/markdown/bot.md";
import { html as rega } from "@/assets/markdown/rega.md";
import TimeLine from "@/components/TimeLine.vue";
import { ref, useTemplateRef, watch } from "vue";
import PersonalProject from "@/components/PersonalProject.vue";
import websiteImg from "@/assets/website.png";
import botImg from "@/assets/bot.png";

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

const src = await parseAbout(about);

enum ToolType {
  Language = 'lang',
  DB = 'db',
  Framework = 'frame',
  Other = 'other'
}

enum Experiences {
  None,
  tblx,
  wtx,
  cazoo,
  sms,
  tamanna,
  xgeeks,
  tomi,
  tomiIntern,
  education
}

enum Tool {
  js = "javascript",
  ts = "typescript",
  c = "c",
  cpp = "cplusplus",
  cs = "csharp",
  php = "php",
  kt = "kotlin",
  html = "html5",
  css = "css3",
  mysql = "mysql",
  psql = "postgresql",
  sql = "sqlite",
  mdb = "mongodb",
  dndb = "dynamodb",
  spring = "spring",
  laravel = "laravel",
  express = "express",
  next = "nextjs",
  nest = "nestjs",
  react = "react",
  vue = "vuejs",
  dotnet = "dotnetcore",
  electron = "electron",
  oapi = "openapi",
  gql = "graphql",
  aws = "amazonwebservices",
  terra = "terraform",
  gha = "githubactions",
  azd = "azuredevops",
}

const tools = [
  { tool: Tool.js, name: "JavaScript", icon: "devicon-javascript-plain", type: ToolType.Language },
  { tool: Tool.ts, name: "TypeScript", icon: "devicon-typescript-plain", type: ToolType.Language },
  { tool: Tool.c, name: "C", icon: "devicon-c-plain", type: ToolType.Language },
  { tool: Tool.cpp, name: "C++", icon: "devicon-cplusplus-plain", type: ToolType.Language },
  { tool: Tool.cs, name: "C#", icon: "devicon-csharp-plain", type: ToolType.Language },
  { tool: Tool.php, name: "PHP", icon: "devicon-php-plain", type: ToolType.Language },
  { tool: Tool.kt, name: "Kotlin", icon: "devicon-kotlin-plain", type: ToolType.Language },
  { tool: Tool.html, name: "HTML", icon: "devicon-html5-plain", type: ToolType.Language },
  { tool: Tool.css, name: "CSS", icon: "devicon-css3-plain", type: ToolType.Language },

  { tool: Tool.mysql, name: "MySQL", icon: "devicon-mysql-plain", type: ToolType.DB },
  { tool: Tool.psql, name: "PostgreSQL", icon: "devicon-postgresql-plain", type: ToolType.DB },
  { tool: Tool.sql, name: "Sqlite", icon: "devicon-sqlite-plain", type: ToolType.DB },
  { tool: Tool.mdb, name: "MongoDB", icon: "devicon-mongodb-plain", type: ToolType.DB },
  { tool: Tool.dndb, name: "DynamoDB", icon: "devicon-dynamodb-plain", type: ToolType.DB },

  { tool: Tool.spring, name: "Spring", icon: "devicon-spring-plain", type: ToolType.Framework },
  { tool: Tool.laravel, name: "Laravel", icon: "devicon-laravel-original", type: ToolType.Framework },
  { tool: Tool.express, name: "Express", icon: "devicon-express-original", type: ToolType.Framework },
  { tool: Tool.next, name: "Next.js", icon: "devicon-nextjs-plain", type: ToolType.Framework },
  { tool: Tool.nest, name: "NestJS", icon: "devicon-nestjs-plain", type: ToolType.Framework },
  { tool: Tool.react, name: "React", icon: "devicon-react-original", type: ToolType.Framework },
  { tool: Tool.vue, name: "Vue.js", icon: "devicon-vuejs-plain", type: ToolType.Framework },
  { tool: Tool.dotnet, name: ".NET Core", icon: "devicon-dotnetcore-plain", type: ToolType.Framework },
  { tool: Tool.electron, name: "Electron", icon: "devicon-electron-original", type: ToolType.Framework },

  { tool: Tool.oapi, name: "OpenAPI", icon: "devicon-openapi-plain", type: ToolType.Other },
  { tool: Tool.gql, name: "GraphQL", icon: "devicon-graphql-plain", type: ToolType.Other },
  { tool: Tool.aws, name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark", type: ToolType.Other },
  { tool: Tool.terra, name: "Terraform", icon: "devicon-terraform-plain", type: ToolType.Other },
  { tool: Tool.gha, name: "GitHub Actions", icon: "devicon-githubactions-plain", type: ToolType.Other },
  { tool: Tool.azd, name: "Azure DevOps", icon: "devicon-azuredevops-plain", type: ToolType.Other },
];

const toolExp = {
  [Tool.js]: new Set([Experiences.None, Experiences.tomi, Experiences.tomi, Experiences.education]),
  [Tool.ts]: new Set([Experiences.None, Experiences.cazoo, Experiences.sms, Experiences.tamanna, Experiences.tblx, Experiences.tomi, Experiences.wtx, Experiences.xgeeks]),
  [Tool.c]: new Set([Experiences.None, Experiences.education]),
  [Tool.cpp]: new Set([Experiences.None, Experiences.education]),
  [Tool.cs]: new Set([Experiences.None, Experiences.tomiIntern, Experiences.tomi, Experiences.education]),
  [Tool.php]: new Set([Experiences.None, Experiences.tomi, Experiences.education]),
  [Tool.kt]: new Set([Experiences.None, Experiences.xgeeks, Experiences.tblx]),
  [Tool.html]: new Set([Experiences.None, Experiences.cazoo, Experiences.sms, Experiences.tamanna, Experiences.tblx, Experiences.tomi, Experiences.wtx, Experiences.xgeeks, Experiences.education]),
  [Tool.css]: new Set([Experiences.None, Experiences.cazoo, Experiences.sms, Experiences.tamanna, Experiences.tblx, Experiences.tomi, Experiences.wtx, Experiences.xgeeks, Experiences.education]),
  [Tool.mysql]: new Set([Experiences.None, Experiences.tomi]),
  [Tool.psql]: new Set([Experiences.None, Experiences.xgeeks, Experiences.tblx, Experiences.wtx]),
  [Tool.sql]: new Set([Experiences.None, Experiences.tomiIntern]),
  [Tool.mdb]: new Set([Experiences.None, Experiences.tomi]),
  [Tool.dndb]: new Set([Experiences.None, Experiences.xgeeks, Experiences.cazoo]),
  [Tool.spring]: new Set([Experiences.None, Experiences.xgeeks, Experiences.tblx]),
  [Tool.laravel]: new Set([Experiences.None, Experiences.tomi]),
  [Tool.express]: new Set([Experiences.None, Experiences.tomi]),
  [Tool.next]: new Set([Experiences.None, Experiences.xgeeks, Experiences.cazoo]),
  [Tool.nest]: new Set([Experiences.None, Experiences.xgeeks, Experiences.wtx]),
  [Tool.react]: new Set([Experiences.None, Experiences.cazoo, Experiences.sms, Experiences.tamanna, Experiences.tblx, Experiences.wtx, Experiences.xgeeks]),
  [Tool.vue]: new Set([Experiences.None, Experiences.tomi]),
  [Tool.dotnet]: new Set([Experiences.None, Experiences.tomi, Experiences.education]),
  [Tool.electron]: new Set([Experiences.None, Experiences.tomi]),
  [Tool.oapi]: new Set([Experiences.None, Experiences.xgeeks, Experiences.tblx]),
  [Tool.gql]: new Set([Experiences.None, Experiences.xgeeks, Experiences.tblx]),
  [Tool.aws]: new Set([Experiences.None, Experiences.xgeeks, Experiences.cazoo]),
  [Tool.terra]: new Set([Experiences.None, Experiences.xgeeks, Experiences.cazoo, Experiences.tblx]),
  [Tool.gha]: new Set([Experiences.None, Experiences.xgeeks, Experiences.cazoo]),
  [Tool.azd]: new Set([Experiences.None, Experiences.xgeeks, Experiences.sms, Experiences.tblx]),
}

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

const dates = {
  [Experiences.None]: { start: new Date(2013, 8), end: undefined },
  [Experiences.tblx]: { start: new Date(2023, 2), end: new Date(2025, 5) },
  [Experiences.wtx]: { start: new Date(2023, 0), end: new Date(2023, 2) },
  [Experiences.cazoo]: { start: new Date(2021, 7), end: new Date(2022, 11) },
  [Experiences.sms]: { start: new Date(2021, 2), end: new Date(2024, 11) },
  [Experiences.tamanna]: { start: new Date(2021, 2), end: new Date(2021, 7) },
  [Experiences.xgeeks]: { start: new Date(2021, 2), end: undefined },
  [Experiences.tomi]: { start: new Date(2016, 5), end: new Date(2021, 1) },
  [Experiences.tomiIntern]: { start: new Date(2016, 1), end: new Date(2016, 5) },
  [Experiences.education]: { start: new Date(2013, 9), end: new Date(2016, 7) }
}

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
  <div class="w-screen h-dvh grid grid-rows-[1fr_auto] gap-2 justify-center">
    <div class="flex flex-col justify-center items-center gap-6">
      <div class="text-center">
        <h2>Luís Pereira</h2>
        <h1>Software Engineer</h1>
      </div>
      <div class="flex gap-2 justify-center">
        <a href="mailto:kimossab+kmcom@outlook.pt"
          class="flex items-center gap-0.5 !no-underline border p-2 rounded hover:scale-105" target="_blank">
          <font-awesome-icon icon="envelope"></font-awesome-icon>
          <span>Email</span>
        </a>
        <a href="https://github.com/Kimossab"
          class="flex items-center gap-0.5 !no-underline border p-2 rounded hover:scale-105" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
          <span>Github</span>
        </a>
        <a href="https://www.linkedin.com/in/luis-mc-pereira/"
          class="flex items-center gap-0.5 !no-underline border p-2 rounded hover:scale-105" target="_blank">
          <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
          <span>LinkedIn</span>
        </a>
        <span class="cursor-default flex items-center gap-0.5 !no-underline border p-2 rounded hover:scale-105">
          <font-awesome-icon :icon="['fab', 'discord']"></font-awesome-icon>
          <span>@kimossab</span>
        </span>
      </div>
    </div>
    <div
      class="text-center pb-3 h-16 relative after:content-['⌄'] after:absolute after:top-2 after:text-3xl after:left-1/2 after:-translate-x-1/2 after:size-9">
      More
      details
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2 m-4 mt-16 relative">
    <div class="about-me">
      <TimeLine :start="dates[activeElement].start" :end="dates[activeElement].end" />

      <div ref="about-me" class="md:mt-32">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="src" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.None))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
      </div>
      <h3 class="mt-12 md:mt-64">My experience</h3>

      <div ref="tblx-exp" class="experience">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="tblx" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.tblx))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
      </div>

      <div ref="wtx-exp" class="experience">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="wtx" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.wtx))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
      </div>

      <div ref="cazoo-exp" class="experience">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="cazoo" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.cazoo))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
      </div>

      <div ref="sms-exp" class="experience">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="sms" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.sms))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
      </div>

      <div ref="tamanna-exp" class="experience">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="tamanna" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.tamanna))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
      </div>

      <div ref="xgeeks-exp" class="experience">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="xgeeks" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.xgeeks))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
      </div>

      <div ref="tomi-exp" class="experience">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="tomi" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.tomi))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
      </div>

      <div ref="tomiIntern-exp" class="experience">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="tomiIntern" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.tomiIntern))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
      </div>

      <div ref="education-exp" class="experience">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4 " :source="education" :html="true" />

        <div class="grid-cols-3 sm:grid-cols-4 gap-2 text-sm content-center w-full grid md:hidden">
          <div v-for="tool in tools.filter(t => toolExp[t.tool].has(Experiences.education))" :key="tool.name"
            :class="`tool tool-${tool.type} active`">
            {{ tool.name }} <i :class="tool.icon"></i>
          </div>
        </div>
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

  <div class="mt-12">
    <h3>Personal Projects</h3>
    <div class="grid gap-6 grid-cols-1 p-6">
      <PersonalProject :image="websiteImg">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4" :source="website" :html="true" />
      </PersonalProject>
      <PersonalProject :image="botImg">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4" :source="bot" :html="true" />
      </PersonalProject>
      <PersonalProject image="/rega-pcb.png">
        <Markdown class="mb-4 mt-2 flex flex-col gap-4" :source="rega" :html="true" />
      </PersonalProject>
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/base.css";

h3 {
  @apply text-center;
}

.tool {
  @apply duration-500;
  @apply opacity-20;
  @apply border rounded p-2 flex items-center justify-center gap-2 h-16;

  @apply hover:scale-105;
}
.tool.active {
  @apply opacity-100;
}
.tool i {
  @apply text-2xl
}

.tool-lang {
  @apply border-emerald-300 shadow-lg bg-radial from-emerald-300/25 to-transparent;
}
.tool-frame {
  @apply border-orange-300 shadow-lg bg-radial from-orange-300/25 to-transparent;
}
.tool-db {
  @apply border-sky-300 shadow-lg bg-radial from-sky-300/25 to-transparent;
}
.tool-other {
  @apply border-amber-300 shadow-lg bg-radial from-amber-300/25 to-transparent;
}

.experience {
  @apply  md:min-h-[50vh] py-6;
}
</style>