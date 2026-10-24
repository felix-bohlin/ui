<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
  <Range>
    <template #label
      ><code>outlined</code> (default) =
      <code>var(--ui-field-border-color)</code></template
    >
  </Range>
  <Range variant="filled">
    <template #label
      ><code>filled</code> = <code>var(--ui-surface-filled)</code></template
    >
  </Range>
  <Range variant="tonal">
    <template #label
      ><code>tonal</code> = <code>var(--ui-surface-tonal)</code></template
    >
  </Range>
</template>
