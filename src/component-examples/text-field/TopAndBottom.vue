<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField for="text-field-top-and-bottom-1" label="Name">
    <input
      aria-describedby="text-field-top-and-bottom-1-top"
      id="text-field-top-and-bottom-1"
      placeholder="Holly Humbucker"
    />
    <template #top>Shown on your profile</template>
  </TextField>

  <TextField
    characterCount
    for="text-field-top-and-bottom-2"
    label="Bass motto"
  >
    <input
      aria-describedby="text-field-top-and-bottom-2-bottom text-field-top-and-bottom-2-end-text"
      id="text-field-top-and-bottom-2"
      :maxlength="80"
      placeholder="Turn it up, not down"
    />
    <template #bottom>Plain text, no links</template>
  </TextField>
</template>
