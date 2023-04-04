import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import AboutView from "../views/AboutView.vue";
import BotView from "../views/BotView.vue";
import LunaView from "../views/LunaView.vue";
import MangaView from "../views/MangaView.vue";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView
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
    path: "/manga/:mangaId?/:chapterId?/:pageId?",
    name: "manga",
    component: MangaView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
