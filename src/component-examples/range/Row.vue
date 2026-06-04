<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
  <Range spread>
    Spread Layout
    <template #start-text>Start text</template>
    <template #end-text>End text</template>
  </Range>

  <Range spread disabled>
    Disabled
    <template #start-text>Start text</template>
    <template #end-text>End text</template>
  </Range>

  <Range spread data-invalid endText="This value is incorrect.">
    Invalid Range
    <template #start-text>Start text</template>
  </Range>

  <Range
    label="Tick marks with labels"
    list="labeled-markers-spread"
    spread
    :options="[
      { value: 0, label: '0%' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' },
    ]"
  />
</template>
