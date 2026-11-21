<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField for="text-field-variants-1" label="Outlined">
    <input id="text-field-variants-1" placeholder="Your name" />
  </TextField>
  <TextField for="text-field-variants-2" label="Filled" variant="filled">
    <input id="text-field-variants-2" placeholder="Your name" />
  </TextField>
</template>
