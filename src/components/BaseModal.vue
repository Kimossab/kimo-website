<script setup lang="ts">
interface Emits {
  (e: "close"): void;
}
defineEmits<Emits>();
</script>

<template>
  <Teleport to="body">
    <div
      class="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-75 overflow-scroll"
      @click="$emit('close')"
    >
      <div class="w-[90%] m-auto my-20" @click="$emit('close')">
        <div
          class="bg-stone-300 dark:bg-neutral-800 w-full rounded-2xl"
          @click.stop=""
        >
          <div
            class="border-b border-solid text-2xl font-bold m-2 p-2 border-stone-500"
          >
            <slot name="header"></slot>
          </div>
          <div class="m-2 p-2">
            <slot></slot>
          </div>
          <div
            class="border-t border-solid text-2xl font-bold m-2 p-2 border-stone-500"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
