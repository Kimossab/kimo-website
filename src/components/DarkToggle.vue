<script setup lang="ts">
import { useAppStore } from "@/stores/app";

const store = useAppStore();

const toggle = () => {
  store.darkMode = !store.darkMode;
};
</script>

<template>
  <div class="dark__toggle" @click="toggle">
    <transition name="scroll-dark-mode">
      <div class="light" v-if="store.darkMode">
        <font-awesome-icon icon="sun"></font-awesome-icon>
      </div>
      <div class="dark" v-else>
        <font-awesome-icon icon="moon"></font-awesome-icon>
      </div>
    </transition>
  </div>
</template>

<style>
.dark__toggle {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 2rem;
  z-index: 10;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
}

.dark__toggle div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 500ms;
}
</style>
