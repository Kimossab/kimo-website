<script setup lang="ts">
import { ButtonVariants } from "@/types";

interface Props {
  disabled?: boolean;
  variant?: ButtonVariants;
}

interface Emits {
  (e: "click"): void;
}

defineProps<Props>();
defineEmits<Emits>();

const commonStyle =
  "bg-slate-800/40 transition border border-solid border-slate-950 drop-shadow-lg cursor-pointer overflow-hidden no-select";
const hoverStyle = "hover:scale-105";
const disabledStyle =
  "disabled:cursor-inherit disabled:hover:scale-100 disabled:cursor-not-allowed disabled:opacity-50";

const variantMap = {
  [ButtonVariants.Normal]: `${commonStyle} ${hoverStyle} ${disabledStyle} rounded-2xl p-4`,
  [ButtonVariants.Small]: `${commonStyle} ${hoverStyle} ${disabledStyle} text-sm rounded-lg p-1`,
};
</script>

<template>
  <button
    :class="variantMap[variant ?? ButtonVariants.Normal]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
