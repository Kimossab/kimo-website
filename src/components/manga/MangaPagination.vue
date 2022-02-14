<script setup lang="ts">
import { ref } from "vue";

interface Props {
  selectedPage: number;
  pages: number;
  top: boolean;
}
interface Emits {
  (e: "previous"): void;
  (e: "next"): void;
  (e: "setPage", page: number): void;
}

const emit = defineEmits<Emits>();

defineProps<Props>();

const showPages = ref(false);
</script>

<template>
  <div class="manga-pagination">
    <div :class="['pagination', { top: top }]">
      <div class="button previous" @click="emit('previous')">
        <font-awesome-icon icon="angle-left"></font-awesome-icon>
      </div>
      <div class="page" @click="showPages = !showPages">
        {{ selectedPage }}/{{ pages }}
      </div>
      <div class="button next" @click="emit('next')">
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
      </div>
    </div>

    <transition name="grow">
      <div :class="['pages-box-container', { top: top }]" v-show="showPages">
        <div class="pages-box">
          <template
            v-for="i in pages"
            :key="`btn-page-${top ? 'top' : 'bottom'}-${i}`"
          >
            <div
              :class="['button', { selected: i === selectedPage }]"
              @click="emit('setPage', i)"
            >
              {{ i }}
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.grow-enter-active,
.grow-leave-active {
  width: 51rem;
}

.grow-enter-from,
.grow-leave-to {
  width: 0;
}

.manga-pagination {
  width: 100%;
  padding: 0.5rem;
  position: relative;
}
.manga-pagination .pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.manga-pagination .pagination .button {
  font-size: 1.5rem;
  border: 1px solid var(--color-light);
  border-radius: 0.2rem;
  height: 2rem;
  width: 2rem;
  text-align: center;

  cursor: pointer;
}
.manga-pagination .pagination .page {
  margin: 0 0.5rem;
  cursor: pointer;
}

.manga-pagination .pages-box-container {
  overflow: hidden;

  display: grid;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, calc(-100% - 1rem));
  margin-top: 1rem;

  transition: var(--speed-faster);
}
.manga-pagination .pages-box-container.top {
  top: auto;
  bottom: 0;
  transform: translate(-50%, 100%);
}

.manga-pagination .pages-box-container .pages-box {
  display: flex;
  flex-wrap: wrap;
  width: 50rem;

  justify-content: center;

  border: 1px solid var(--color-light);
  border-radius: 0.2rem;
  background-color: var(--color-dark);
}
.manga-pagination .pages-box-container .pages-box .button {
  margin: 0.2rem;
  cursor: pointer;

  font-size: 1rem;
  line-height: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
}
.manga-pagination .pages-box-container .pages-box .button.selected {
  background-color: var(--color-light);
  color: var(--color-dark);
}
</style>
