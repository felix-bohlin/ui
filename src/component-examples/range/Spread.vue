<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
  <Range label="Spread Layout" spread>
    <template #start-text>Start text</template>
    <template #end-text>End text</template>
  </Range>

  <Range label="Disabled" spread disabled>
    <template #start-text>Start text</template>
    <template #end-text>End text</template>
  </Range>

  <Range label="Invalid Range" spread error endText="Pick a value below 50.">
    <template #start-text>Start text</template>
  </Range>

  <Range
    label="Tick marks with labels"
    spread
    :items="[
      { value: 0, label: '0%' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' },
    ]"
  />
</template>
