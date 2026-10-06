<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Chip as="button" variant="tonal" label="Tonal" disabled />
    <Chip as="button" variant="outlined" label="Outlined" disabled />
  </div>
</template>
