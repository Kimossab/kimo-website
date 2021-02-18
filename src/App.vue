<template>
  <DarkToggle />
  <LunaViewer />
  <Header></Header>
  <Nav></Nav>
  <div :class="['content-container', $route.name]">
    <router-view v-slot="{ Component }">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <Footer />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import LunaViewer from "@/components/LunaViewer.vue";
import Footer from "@/components/Footer.vue";
import DarkToggle from "@/components/DarkToggle.vue";
import { fixBodyHeight } from "@/helpers/common";

@Options({
  watch: {
    darkMode: value => {
      document
        .getElementsByTagName("BODY")[0]
        .classList.replace(value ? "light" : "dark", value ? "dark" : "light");
    }
  },
  components: {
    Nav,
    Header,
    LunaViewer,
    Footer,
    DarkToggle
  }
})
export default class App extends Vue {
  private get darkMode() {
    return this.$store.state.darkMode;
  }

  mounted() {
    document.body.classList.add("dark");
  }

  beforeEnter(el: HTMLElement) {
    el.style.opacity = "0";
    el.style.transform = "translateX(50%)";
  }

  enter(el: HTMLElement, done: () => void) {
    setTimeout(() => {
      console.log("enter", el.getBoundingClientRect());
      el.style.opacity = "1";
      el.style.transform = "translateX(-50%)";

      this.$nextTick(() => {
        fixBodyHeight();
      });

      setTimeout(() => {
        done();
      }, 500);
    }, 10);
  }
  leave(el: HTMLElement, done: () => void) {
    el.style.opacity = "0";
    el.style.transform = "translateX(-150%)";
    setTimeout(done, 500);
  }
}
</script>

<style lang="scss">
@import "~@/scss/roboto.scss";

button {
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
}
a {
  color: inherit; /* blue colors for links too */
}

code {
  background-color: $color-light-25;
  padding: 0.1rem;
}

body {
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  transition: 100ms, color $speed-fast, background-color $speed-fast;
  overflow-x: hidden;

  background-color: $color-dark;
  color: $color-light;

  font-family: "roboto";
  position: relative;

  &.dark {
    background: url("~@/assets/bg.png") $color-dark;
    color: $color-light;
    code {
      background-color: $color-light-25;
      padding: 0.1rem;
    }
  }

  &.light {
    background: url("~@/assets/bg.png") $color-light;
    color: $color-dark;
    code {
      background-color: $color-dark-25;
      padding: 0.1rem;
    }
  }

  #app {
    width: 100vw;
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    details {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      summary {
        cursor: pointer;
      }

      .details-content {
        margin-top: 1rem;
      }
    }

    .content-container {
      width: 100vw;
      position: relative;
      min-height: calc(100vh - 3.5rem - 6rem - 3rem);
      transition: $speed-fast;

      &.home {
        min-height: 0;

        .content {
          padding: 0;
        }
      }

      .content {
        width: 54rem;
        margin: 0 auto;
        transition: $speed-fast;

        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        min-height: calc(100% - 3rem);
        padding-bottom: 3rem;

        @media screen and (max-width: 54rem) {
          width: 100vw;
        }
      }
    }
  }
}
</style>
