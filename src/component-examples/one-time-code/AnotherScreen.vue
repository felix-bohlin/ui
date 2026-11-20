<script setup lang="ts">
import { OneTimeCode } from "opui-css/vue"
</script>

<template>
  <OneTimeCode
    autocomplete="off"
    endText="The code is on your TV, under Settings and Link a device."
    label="Code from your TV"
    name="code"
    required
  />
</template>
