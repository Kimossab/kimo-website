import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Store, store } from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faSpinner,
  faExpand,
  faWindowClose,
  faEnvelope,
  faSun,
  faMoon
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faDiscord,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LazyImgLoadDirective from "@/directives/lazy-img-loading";

declare module "@vue/runtime-core" {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store;
  }
}
library.add(
  faHome,
  faSpinner,
  faExpand,
  faWindowClose,
  faEnvelope,
  faSun,
  faMoon,
  faGithub,
  faDiscord,
  faLinkedin
);

createApp(App)
  .directive("lazyimg", LazyImgLoadDirective)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
