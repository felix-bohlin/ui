<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox-supporting-text" endText="Supporting text">
    Default
  </Checkbox>
  <Checkbox stack name="checkbox-supporting-text" endText="Supporting text">
    Stack
  </Checkbox>
</template>
