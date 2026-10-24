<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox-end-text" endText="Supporting text">
    Default
  </Checkbox>
  <Checkbox
    orientation="vertical"
    name="checkbox-end-text"
    endText="Supporting text"
  >
    Stack
  </Checkbox>
</template>
