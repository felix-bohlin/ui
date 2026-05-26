<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
<Range label="Default" />
<Range variant="default">
  <code>default</code> = <code>var(--surface-default)</code>
</Range>
<Range variant="filled">
  <code>filled</code> = <code>var(--surface-filled)</code>
</Range>
<Range variant="tonal">
  <code>tonal</code> = <code>var(--surface-tonal)</code>
</Range>
</template>
