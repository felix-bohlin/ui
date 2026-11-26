<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Checkbox name="checkbox-validation" required>I accept the terms</Checkbox>
    <Checkbox name="checkbox-validation" orientation="vertical" required
      >I am 18 or older</Checkbox
    >
  </div>
  <div class="example-row">
    <Checkbox checked error name="checkbox-validation">
      Daily backups
      <template #end-text>Not available on the free plan.</template>
    </Checkbox>
    <Checkbox error name="checkbox-validation" orientation="vertical">
      I accept the terms
      <template #end-text>Accept the terms to continue.</template>
    </Checkbox>
  </div>
</template>
