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
        <div class="nav-content">About</div>
      </button>
    </router-link>
    <router-link to="/bot">
      <button class="bot">
        <div class="bg-cover"></div>
        <div class="nav-content">Bot</div>
      </button>
    </router-link>
    <router-link to="/luna">
      <button class="luna">
        <div class="bg-cover"></div>
        <div class="nav-content">Luna</div>
      </button>
    </router-link>
  </nav>
</template>

<style>
nav {
  height: var(--nav-min-height);
  width: 100%;
  max-width: var(--nav-max-width);

  padding: 0 var(--nav-x-pad);
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 2rem;
  align-content: center;

  transition: var(--speed-fast);

  color: var(--color-light);
}

nav.home {
  margin-top: calc(
    (100vh - var(--header-size) - var(--footer-size) - var(--nav-max-height)) /
      2
  );
  height: var(--nav-max-height);
}

nav a {
  transition: var(--speed-faster);
}
nav a:hover {
  transform: var(--normal-scale);
}

nav a > button {
  width: 100%;
  height: 100%;
  transform: var(--nav-skew);
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  background-size: cover;
  background-position: center;
}
nav a > button.about {
  background-image: url("@/assets/about.png");
}
nav a > button.bot {
  background-image: url("@/assets/bot.png");
}
nav a > button.luna {
  background-image: url("@/assets/luna.png");
}

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
}

.nav-background > svg {
  width: 85% !important;
  height: 100vh;
}

.nav-content {
  font-size: var(--font-big);
  transform: skewX(15deg);
}

@media screen and (max-width: 640px) {
  nav {
    grid-gap: 1rem;
  }
  .nav-content {
    font-size: 1rem;
  }
}

.bg-cover {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  background-color: var(--opacity-85);
}
</style>
