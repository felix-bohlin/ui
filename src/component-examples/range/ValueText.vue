<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
  <Range
    id="range-value-text-1"
    label="Temperature"
    max="30"
    min="10"
    value="21"
  >
    <template #value-text="{ value }"
      ><b>{{ value }}°</b></template
    >
  </Range>
</template>
