<script setup lang="ts">
interface Props {
  videoSrc: string;
}

defineProps<Props>();
interface Emits {
  (e: "close"): void;
}

defineEmits<Emits>();
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-600 bg-opacity-50 z-50"
      @click="$emit('close')"
    >
      <video autoplay controls @click.stop>
        <source :src="videoSrc" />
      </video>
    </div>
  </Teleport>
</template>
