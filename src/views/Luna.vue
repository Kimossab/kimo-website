<template>
  <div class="content luna">
    <h1>Luna</h1>
    <p>
      Luna is the name of my dog, it's a Labrador.<br />
      Feel free to look at all these images I took of her over the years. Click
      to see the full picture.
    </p>
    <LunaGallery />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LunaGallery from "@/components/LunaGallery.vue";
import { ActionTypes } from "@/store/action-types";

@Options({
  components: {
    LunaGallery
  }
})
export default class Luna extends Vue {
  mounted() {
    this.$store.dispatch(ActionTypes.GET_LUNA_PICTURES, undefined);
  }
}
</script>
