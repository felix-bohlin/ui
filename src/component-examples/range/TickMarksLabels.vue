<script setup lang="ts">
import { Range } from "opui-css/vue"
</script>

<template>
  <Range
    label="Tick marks with labels"
    :options="[
      { value: 0, label: '0%' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' },
    ]"
  />
  <Range label="Quality" max="2">
    <template #datalist>
      <option value="0" label="Low" />
      <option value="1" label="Medium" />
      <option value="2" label="High" />
    </template>
  </Range>
</template>
