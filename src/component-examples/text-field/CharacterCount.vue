<script setup lang="ts">
import { TextField } from "opui-css/vue"
</script>

<template>
  <TextField
    characterCount
    endText="Up to 20 letters, numbers and dashes."
    label="Username"
    :maxlength="20"
  />
</template>
