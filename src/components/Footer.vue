<template>
  <footer>
    <div class="single">
      <a href="https://github.com/Kimossab" target="_blank">
        <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
        Github
      </a>
      <a href="mailto:kimossab@outlook.pt" target="_blank">
        <font-awesome-icon icon="envelope"></font-awesome-icon>
        Email
      </a>
      <a href="https://www.linkedin.com/in/luis-mc-pereira/" target="_blank">
        <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
        LinkedIn
      </a>
      <span>
        <font-awesome-icon :icon="['fab', 'discord']"></font-awesome-icon>
        Kimossab#6954
      </span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: 100vw;
  height: 3rem;
  background: #0000001f;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  span,
  a {
    margin: 0 0.5rem;
    text-decoration: inherit;
  }

  @media screen and (max-width: 54rem) {
    height: 3rem;
    font-size: 0.8rem;
  }
}
</style>
