<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio
    checked
    endText="Arrives in 3 to 5 days."
    name="radio-end-text"
    value="standard"
  >
    Standard delivery
  </Radio>
  <Radio
    endText="Arrives tomorrow."
    name="radio-end-text"
    orientation="vertical"
    value="express"
  >
    Express delivery
  </Radio>
</template>
