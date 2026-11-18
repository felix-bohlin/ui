<script setup lang="ts">
import { ref } from "vue"
import { Range } from "opui-css/vue"

const value = ref("21")
</script>

<template>
  <Range
    v-model="value"
    :aria-valuetext="`${value}°`"
    id="range-value-text-1"
    label="Temperature"
    max="30"
    min="10"
  >
    <template #value-text
      ><b>{{ value }}°</b></template
    >
  </Range>
</template>
