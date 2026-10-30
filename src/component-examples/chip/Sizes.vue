<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip label="x-small" size="x-small" />
  <Chip label="Small" size="small" />
  <Chip label="Medium" />
  <Chip label="Large" size="large" />
  <Chip
    label="Free returns within 30 days on every order"
    multiline
    style="max-inline-size: 30ch"
  />
</template>
