<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio checked name="radio-label-position" value="default">Default</Radio>
  <Radio name="radio-label-position" orientation="vertical" value="stack"
    >Stack</Radio
  >
</template>
