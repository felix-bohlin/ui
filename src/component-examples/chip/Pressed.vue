<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Chip aria-pressed="true" as="button" label="All" variant="outlined" />
    <Chip aria-pressed="false" as="button" label="Open" variant="outlined" />
    <Chip aria-pressed="false" as="button" label="Closed" variant="outlined" />
  </div>
  <div class="example-row">
    <Chip aria-pressed="true" as="button" label="Paid" />
    <Chip aria-pressed="false" as="button" label="Unpaid" />
  </div>
</template>
