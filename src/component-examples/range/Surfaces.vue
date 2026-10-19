<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
  <Range>No variant = <code>var(--ui-field-border-color)</code></Range>
  <Range variant="filled">
    <code>filled</code> = <code>var(--ui-surface-filled)</code>
  </Range>
  <Range variant="tonal">
    <code>tonal</code> = <code>var(--ui-surface-tonal)</code>
  </Range>
</template>
