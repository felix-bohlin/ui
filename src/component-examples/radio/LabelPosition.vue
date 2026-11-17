<script setup lang="ts">
import { Radio } from "opui-css/vue"
</script>

<template>
  <Radio checked name="radio-label-position" value="standard"
    >Standard delivery</Radio
  >
  <Radio name="radio-label-position" orientation="vertical" value="express"
    >Express delivery</Radio
  >
</template>
