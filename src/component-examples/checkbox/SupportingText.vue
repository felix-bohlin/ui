<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox name="checkbox-supporting-text">
    Default
    <template #end-text>Supporting text</template>
  </Checkbox>
  <Checkbox stack name="checkbox-supporting-text">
    Stack
    <template #end-text>Supporting text</template>
  </Checkbox>
</template>
