<script lang="ts" setup>
import { computed, useTemplateRef, watch } from 'vue';

const props = defineProps<{
  start: Date,
  end?: Date
}>();

const beginning = +new Date(2013, 9);
const finish = new Date();
const max = +finish - beginning;

const startDateLine = useTemplateRef('start-date');
const startDatePoint = useTemplateRef('start-point');
const endDateLine = useTemplateRef('end-date');
const endDatePoint = useTemplateRef('end-point');
const timeLineBar = useTemplateRef('timeline-bar');
const timeLineBarFilled = useTemplateRef('timeline-bar-filled');

watch(props, (value) => {
  const startLine = (+value.start - beginning) * 100 / max;
  const endLine = (+(value.end || finish) - beginning) * 100 / max;
  const maxWidth = timeLineBar.value!.clientWidth
  const diff = (endLine / 100 * maxWidth) - (startLine / 100 * maxWidth);

  startDatePoint.value!.style.left = `${startLine}%`;
  endDatePoint.value!.style.left = `${endLine}%`;

  const width = startDateLine.value!.getClientRects()[0].width;

  let buffer = 0;

  if (diff <= width) {
    buffer = ((width - diff) / 2 + 5) * 100 / maxWidth;
  }

  startDateLine.value!.style.left = `${startLine - buffer}%`;
  endDateLine.value!.style.left = `${endLine + buffer}%`;

  timeLineBarFilled.value!.style.left = `${startLine}%`;
  timeLineBarFilled.value!.style.width = `${endLine - startLine}%`;

});
</script>

<template>
  <div class="flex justify-center sticky top-0 bg-[url(@/assets/bg.png)] bg-base-white dark:bg-base-dark">
    <div class="time-line">
      <div class="relative w-full h-full flex items-end">
        <div class="time-line-bar" ref="timeline-bar"></div>
        <div class="time-line-check" ref="start-date">
          {{ start.getFullYear() }} - {{ (start.getMonth() + 1).toString().padStart(2, "0") }}
        </div>
        <div class="time-line-check-bar" ref="start-point"></div>
        <div class="time-line-bar-filled" ref="timeline-bar-filled"></div>
        <div class="time-line-check" ref="end-date">
          {{ (end || finish).getFullYear() }} - {{ ((end || finish).getMonth() + 1).toString().padStart(2, "0") }}
        </div>
        <div class="time-line-check-bar" ref="end-point"></div>
      </div>
    </div>
  </div>
</template>

<style>
@reference "@/assets/css/base.css";

.time-line {
  width: calc(100% - 8rem);
  @apply h-12;
}

.time-line-bar {
  @apply rounded-2xl h-2 bg-base-dark/25 dark:bg-base-white/25 mt-auto w-full absolute;
}

.time-line-check {
  @apply absolute mb-1 top-0;
  @apply whitespace-nowrap;
  @apply -translate-x-1/2;
}
.time-line-check-bar {
  @apply absolute top-6;
  @apply border-l h-6;
}
.time-line-bar-filled {
  @apply  h-2 mt-auto bg-base-dark dark:bg-base-white absolute;
}
</style>