<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Name" placeholder="Ada Lovelace">
    <template #header>Shown on your profile</template>
  </TextField>

  <TextField label="Tagline" placeholder="A short description">
    <template #footer>0 / 80</template>
  </TextField>
</template>
