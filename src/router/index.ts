import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import AboutView from "../views/AboutView.vue";
import BotView from "../views/BotView.vue";
import LunaView from "../views/LunaView.vue";
import OtherStuffView from "../views/OtherStuffView.vue";
import MangaView from "../views/MangaView.vue";
import HomeView from "../views/HomeView.vue";
import AMQDashboardView from "../views/AMQDashboardView.vue";
import AMQView from "../views/AMQView.vue";
import TournamentView from "../views/TournamentView.vue";
import TournamentManagementView from "../views/TournamentManagementView.vue";
import AnilistCallback from "@/views/AnilistCallback.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/bot",
    name: "bot",
    component: BotView,
  },
  {
    path: "/luna",
    name: "luna",
    component: LunaView,
  },
  {
    path: "/misc",
    name: "misc",
    component: OtherStuffView,
  },
  {
    path: "/manga/:mangaId?/:chapterId?/:pageId?",
    name: "manga",
    component: MangaView,
  },
  {
    path: "/amq",
    name: "amq",
    component: AMQView,
  },
  {
    path: "/amq/tournament/create",
    name: "tournament-create",
    component: TournamentManagementView,
  },
  {
    path: "/amq/tournament/edit/:tournament",
    name: "tournament-edit",
    component: TournamentManagementView,
  },
  {
    path: "/amq/tournament/:tournamentId?",
    name: "tournament",
    component: TournamentView,
  },
  {
    path: "/amq/dashboard",
    name: "amqDashboard",
    component: AMQDashboardView,
  },
  {
    path: "/amq/anilist",
    name: "anilistLogin",
    component: AnilistCallback,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
