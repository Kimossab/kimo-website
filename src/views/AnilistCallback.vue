<script setup lang="ts">
import LoadSpinner from "@/components/LoadSpinner.vue";
import { useAnilist } from "@/stores/anilist";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();
const anilist = useAnilist();
const route = useRoute();

const params = route.hash
  .split("&")
  .reduce<Record<string, string>>((acc, cur) => {
    const split = cur.split("=");
    return { ...acc, [split[0].replace("#", "")]: split[1] };
  }, {});

anilist.load(params.access_token).then(() => {
  router.push({ name: "amqDashboard" });
});
</script>
<template>
  <LoadSpinner />
</template>
