<script setup lang="ts" generic="D extends Record<string, string | number>">
import { computed, ref, type UnwrapRef } from "vue";

interface Header {
  title: string;
  key: keyof D;
  size?: string;
  sortable?: boolean;
}
interface Sort {
  header: keyof D;
  direction: "ASC" | "DESC";
}

interface Props {
  id: string;
  headers: Header[];
  data: D[];
  initialSort?: Sort;
}

const props = defineProps<Props>();

const sort = ref(props.initialSort);

const getIcon = (header: keyof D) => {
  if (header !== sort.value?.header) {
    return "sort";
  }

  if (sort.value.direction === "ASC") {
    return "sort-up";
  }

  return "sort-down";
};

const toggleSort = (header: keyof D) => {
  if (!sort.value || sort.value.header !== header) {
    sort.value = {
      direction: "ASC",
      header: header as UnwrapRef<keyof D>,
    };
  } else if (sort.value.direction === "ASC") {
    sort.value.direction = "DESC";
  } else if (sort.value.direction === "DESC") {
    sort.value = undefined;
  }
};

const sorted = computed(() => {
  if (!sort.value) {
    return props.data;
  }
  return [...props.data].sort((a, b) => {
    if (typeof a[sort.value!.header as keyof D] === "number") {
      return sort.value!.direction === "ASC"
        ? (a[sort.value!.header] as number) - (b[sort.value!.header] as number)
        : (b[sort.value!.header] as number) - (a[sort.value!.header] as number);
    }

    return sort.value!.direction === "ASC"
      ? (a[sort.value!.header] as string).localeCompare(
          b[sort.value!.header] as string
        )
      : (b[sort.value!.header] as string).localeCompare(
          a[sort.value!.header] as string
        );
  });
});
</script>

<template>
  <table>
    <tr
      class="border-b grid"
      :style="`grid-template-columns: repeat(${headers.length}, minmax(0, 1fr));`"
    >
      <th
        v-for="header of headers"
        :key="String(header.key)"
        :class="[`no-select`, { 'cursor-pointer': header.sortable }]"
        @click="toggleSort(header.key)"
      >
        <span>{{ header.title }}</span>
        <font-awesome-icon
          v-if="header.sortable"
          class="ml-2"
          :icon="getIcon(header.key)"
        ></font-awesome-icon>
      </th>
    </tr>
    <tr
      v-for="d of sorted"
      :key="String(d[headers[0].key])"
      class="grid"
      :style="`grid-template-columns: repeat(${headers.length}, minmax(0, 1fr));`"
    >
      <td
        v-for="header of headers"
        :key="`${d[headers[0].key]}-${String(header.key)}`"
        class="text-center"
      >
        {{ d[header.key] }}
      </td>
    </tr>
  </table>
</template>
