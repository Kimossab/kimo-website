enum ToolType {
  Language = 'lang',
  DB = 'db',
  Framework = 'frame',
  Other = 'other'
}

export enum Experiences {
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

export interface ToolData {
  tool: Tool,
  name: string,
  icon: string,
  type: ToolType
}

type ToolExperience = Record<Tool, Set<Experiences>>;

interface DateSpan {
  start: Date,
  end?: Date
}

type ExperienceDate = Record<Experiences, DateSpan>;

export const tools: ToolData[] = [
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

export const toolExp: ToolExperience = {
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

export const experienceTools = Object.values(Experiences).reduce<Record<string, ToolData[]>>((accumulator, experience) => {
  accumulator[experience] = tools.filter(t => toolExp[t.tool].has(experience as Experiences));
  return accumulator;
}, {})

export const experienceDates: ExperienceDate = {
  [Experiences.None]: { start: new Date(2013, 8) },
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
