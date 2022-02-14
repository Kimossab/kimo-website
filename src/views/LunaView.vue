<script setup lang="ts">
import LunaGallery from "@/components/luna/LunaGallery.vue";
import { useLuna } from "@/stores/luna";

const luna = useLuna();

luna.getPictures();
luna.selectPicture(null);
</script>

<template>
  <div class="content luna">
    <div>
      <h1>Luna</h1>
      <p>
        Luna is the name of my dog, it's a Labrador.
        <br />Feel free to look at all these images I took of her over the
        years. Click to see the full picture.
      </p>
    </div>
    <LunaGallery />
  </div>
</template>
