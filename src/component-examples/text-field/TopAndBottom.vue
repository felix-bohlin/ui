<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Name" placeholder="Hakki Hälinen">
    <template #top>Shown on your profile</template>
  </TextField>

  <TextField
    characterCount
    label="Tagline"
    :maxlength="80"
    placeholder="A short description"
  >
    <template #bottom>Plain text, no links</template>
  </TextField>
</template>
