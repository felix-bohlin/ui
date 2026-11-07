<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio
    checked
    endText="Supporting text"
    name="radio-end-text"
    value="default"
  >
    Default
  </Radio>
  <Radio
    endText="Supporting text"
    name="radio-end-text"
    orientation="vertical"
    value="stack"
  >
    Stack
  </Radio>
</template>
