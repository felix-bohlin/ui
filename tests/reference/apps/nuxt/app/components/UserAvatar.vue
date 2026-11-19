<script setup lang="ts">
import { Avatar } from "opui-css/vue"
import type { User } from "reference-shared"

const { size, user } = defineProps<{
  size?: "large" | "small"
  user: User
}>()
</script>

<template>
  <Avatar :size="size" :src="user.photo">{{ user.initials }}</Avatar>
</template>
