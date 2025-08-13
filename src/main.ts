import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/font-awesome-icons";
import LazyImgLoadDirective from "@/directives/lazy-img-loading";
import "./assets/css/base.css";
import "devicon/devicon.min.css";

createApp(App)
  .directive("lazyimg", LazyImgLoadDirective)
  .use(createPinia())
  .use(router)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .mount("#app");
