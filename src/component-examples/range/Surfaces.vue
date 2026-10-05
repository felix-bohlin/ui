<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
  <Range>No variant = <code>var(--field-border-color)</code></Range>
  <Range variant="filled">
    <code>filled</code> = <code>var(--surface-filled)</code>
  </Range>
  <Range variant="surface">
    <code>surface</code> = <code>var(--surface-default)</code>
  </Range>
  <Range variant="tonal">
    <code>tonal</code> = <code>var(--surface-tonal)</code>
  </Range>
</template>
