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
  <div class="w-full p-2 relative">
    <div :class="['flex justify-center items-center w-full']">
      <button
        class="text-2xl border border-solid border-stone-300 rounded h-8 w-8 text-center previous"
        @click="emit('previous')"
      >
        <font-awesome-icon icon="angle-left"></font-awesome-icon>
      </button>
      <button class="my-0 mx-2" @click="showPages = !showPages">
        {{ selectedPage }}/{{ pages }}
      </button>
      <button
        class="text-2xl border border-solid border-stone-300 rounded h-8 w-8 text-center next"
        @click="emit('next')"
      >
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
      </button>
    </div>

    <transition name="grow">
      <div
        v-show="showPages"
        :class="[
          'overflow-hidden grid justify-center absolute left-1/2 -translate-x-1/2 duration-200 z-20',
          top ? 'bottom-0 translate-y-full' : 'top-0 -translate-y-full',
        ]"
      >
        <div
          class="flex flex-wrap w-[50rem] justify-center border border-solid border-stone-300 bg-neutral-800 rounded"
        >
          <template
            v-for="i in pages"
            :key="`btn-page-${top ? 'top' : 'bottom'}-${i}`"
          >
            <button
              :class="[
                'm-1 w-6 h-6 rounded',
                { 'bg-stone-300 text-neutral-800': i === selectedPage },
              ]"
              @click="emit('setPage', i)"
            >
              {{ i }}
            </button>
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
  @apply w-0;
}
</style>
