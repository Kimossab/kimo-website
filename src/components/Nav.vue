<template>
  <nav :class="$route.name">
    <router-link to="/">
      <button>
        <div class="bg-cover"></div>
        <div class="nav-background">
          <font-awesome-icon icon="home"></font-awesome-icon>
        </div>
        <div class="nav-content">Home</div>
      </button>
    </router-link>
    <router-link to="/about">
      <button class="about">
        <div class="bg-cover"></div>
        <div class="nav-content">
          About
        </div>
      </button>
    </router-link>
    <router-link to="/bot">
      <button class="bot">
        <div class="bg-cover"></div>
        <div class="nav-content">
          Bot
        </div>
      </button>
    </router-link>
    <router-link to="/luna">
      <button class="luna">
        <div class="bg-cover"></div>
        <div class="nav-content">
          Luna
        </div>
      </button>
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  height: $nav-small-height;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: $speed-fast;
  color: $color-light;

  &.home {
    height: auto;
    flex-grow: 1;
    a {
      height: $nav-btn-height;
    }
  }

  a {
    width: 100%;
    height: $nav-small-height;
    max-width: $nav-btn-width;
    max-height: $nav-btn-height;
    transition: $speed-faster;
    @media (orientation: portrait) {
      max-height: $nav-btn-height-portrait;
    }

    &:not(:last-child) {
      margin-right: $len-medium;
    }
    &:hover {
      transform: $normal-scale;
    }

    button {
      width: 100%;
      height: 100%;
      transform: skewX(-15deg);
      border-radius: 1rem;
      overflow: hidden;
      cursor: pointer;
      background-size: 100% auto;
      background-position: center;

      .nav-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        opacity: 0.25;

        svg {
          width: 85%;
          height: 100vh;
        }
      }

      .nav-content {
        font-size: $font-big;
        transform: skewX(15deg);
      }

      .bg-cover {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        background-color: $opacity-85;
      }

      &.about {
        background-image: url("~@/assets/about.png");
      }
      &.bot {
        background-image: url("~@/assets/bot.png");
      }
      &.luna {
        background-image: url("~@/assets/luna.png");
      }
    }
  }
}
</style>
