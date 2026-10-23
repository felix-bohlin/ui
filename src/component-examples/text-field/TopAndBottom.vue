<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Name" placeholder="Ada Lovelace">
    <template #top>Shown on your profile</template>
  </TextField>

  <TextField label="Tagline" placeholder="A short description">
    <template #bottom>0 / 80</template>
  </TextField>
</template>
