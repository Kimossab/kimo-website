<template>
  <figure v-lazyimg class="image__wrapper">
    <img class="image__item" :data-url="src" :alt="alt" />
  </figure>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
class Props {
  src = prop({
    type: String,
    required: true,
    validator: (v: string) => v !== ""
  });
  alt = prop({
    type: String,
    required: true,
    validator: (v: string) => v !== ""
  });
}

export default class LazyImage extends Vue.with(Props) {}
</script>
