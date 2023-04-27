<script setup lang="ts">
interface Header {
  title: string;
  key: string;
  size?: string;
  sortable?: boolean;
}
interface Sort {
  header: string;
  direction: "ASC" | "DESC";
}

interface Props {
  id: string;
  headers: Header[];
  dataLength: number;
  sort?: Sort;
}

interface Emits {
  (e: "sort", header: string): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const colSpan = `grid-column: span ${props.headers.length} / span ${props.headers.length};`;

const getIcon = (header: string) => {
  if (header !== props.sort?.header) {
    return "sort";
  }

  if (props.sort.direction === "ASC") {
    return "sort-up";
  }

  return "sort-down";
};
</script>

<template>
  <div class="overflow-x-auto overflow-y-hidden grid gap-4 items-center">
    <div
      v-for="header of headers"
      :key="`table-${id}-${header}`"
      :class="[
        'text-center select-none',
        { 'cursor-pointer': header.sortable },
      ]"
      @click="
        () => {
          if (header.sortable) {
            $emit('sort', header.key);
          }
        }
      "
    >
      <span>{{ header.title }}</span>
      <font-awesome-icon
        v-if="header.sortable"
        class="ml-2"
        :icon="getIcon(header.key)"
      ></font-awesome-icon>
    </div>
    <hr :style="colSpan" />
    <slot></slot>
  </div>
</template>
