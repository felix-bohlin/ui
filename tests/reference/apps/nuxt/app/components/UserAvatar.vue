<script setup lang="ts">
import { Avatar } from "opui-css/vue"
import type { User } from "reference-shared"

const {
  link = false,
  size,
  user,
} = defineProps<{ link?: boolean; size?: "large" | "small"; user: User }>()
</script>

<template>
  <NuxtLink v-if="link" v-slot="{ navigate }" custom :to="`/u/${user.handle}`">
    <Avatar
      v-if="user.photo"
      alt=""
      aria-hidden="true"
      :href="`/u/${user.handle}`"
      :size="size"
      :src="user.photo"
      :tabindex="-1"
      @click="navigate"
    />
    <Avatar
      v-else
      aria-hidden="true"
      :href="`/u/${user.handle}`"
      :size="size"
      :tabindex="-1"
      @click="navigate"
      >{{ user.initials }}</Avatar
    >
  </NuxtLink>
  <Avatar v-else-if="user.photo" alt="" :size="size" :src="user.photo" />
  <Avatar v-else aria-hidden="true" :size="size">{{ user.initials }}</Avatar>
</template>
