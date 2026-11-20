<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField
    for="text-field-start-text-1"
    label="Name"
    startText="As it appears on your ID"
  >
    <input
      aria-describedby="text-field-start-text-1-start-text"
      id="text-field-start-text-1"
    />
  </TextField>
</template>
