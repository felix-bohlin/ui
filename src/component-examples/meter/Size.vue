<script setup lang="ts">
import { Meter } from "opui-css/vue"
</script>

<template>
  <Meter
    aria-label="Battery"
    max="100"
    style="--_block-size: var(--ui-space-3)"
    value="80"
  />
</template>
