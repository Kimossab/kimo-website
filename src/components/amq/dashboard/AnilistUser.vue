<script setup lang="ts">
import SimpleButton from "@/components/SimpleButton.vue";
import { useAnilist } from "@/stores/anilist";
import { ButtonVariants } from "@/types";

const anilist = useAnilist();
const anilistId = import.meta.env.VITE_API_ANILIST_ID;
anilist.getUser();
</script>

<template>
  <div v-if="!anilist.token">
    <a
      :href="`https://anilist.co/api/v2/oauth/authorize?client_id=${anilistId}&response_type=token`"
    >
      <SimpleButton :variant="ButtonVariants.Small">
        Login to anilist
      </SimpleButton>
    </a>
  </div>
  <div v-else>
    <div class="border rounded-lg p-2 flex gap-2 items-center">
      <span>Anilist user: </span>
      <img
        v-if="anilist.user?.avatar"
        class="h-12 rounded-full border"
        :src="anilist.user.avatar.medium"
        :alt="`${anilist.user.name}'s avatar`"
      />
      <span>{{ anilist.user?.name }}</span>
    </div>
  </div>
</template>
