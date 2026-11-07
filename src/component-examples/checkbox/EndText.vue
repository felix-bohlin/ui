<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox endText="Supporting text" name="checkbox-end-text">
    Default
  </Checkbox>
  <Checkbox
    endText="Supporting text"
    name="checkbox-end-text"
    orientation="vertical"
  >
    Stack
  </Checkbox>
</template>
