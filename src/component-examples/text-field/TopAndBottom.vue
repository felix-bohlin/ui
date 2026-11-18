<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField label="Name" placeholder="Holly Humbucker">
    <template #top>Shown on your profile</template>
  </TextField>

  <TextField
    characterCount
    label="Bass motto"
    :maxlength="80"
    placeholder="Turn it up, not down"
  >
    <template #bottom>Plain text, no links</template>
  </TextField>
</template>
