import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/font-awesome-icons";
import LazyImgLoadDirective from "@/directives/lazy-img-loading";
import Vue3TouchEvents from "vue3-touch-events";
import "./assets/css/base.css";

createApp(App)
  .directive("lazyimg", LazyImgLoadDirective)
  .use(createPinia())
  .use(Vue3TouchEvents)
  .use(router)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .mount("#app");
