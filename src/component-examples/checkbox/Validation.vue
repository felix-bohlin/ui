<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Checkbox name="checkbox-validation" required>Default</Checkbox>
    <Checkbox name="checkbox-validation" orientation="vertical" required
      >Stack</Checkbox
    >
  </div>
  <div class="example-row">
    <Checkbox checked error name="checkbox-validation">
      Default
      <template #end-text>Check yourself</template>
    </Checkbox>
    <Checkbox error name="checkbox-validation" orientation="vertical">
      Stack
      <template #end-text>Before you wreck yourself</template>
    </Checkbox>
  </div>
</template>
