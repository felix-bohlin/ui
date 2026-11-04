<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Switch name="switch-validation" required>Default</Switch>
    <Switch name="switch-validation" orientation="vertical" required
      >Stack</Switch
    >
  </div>

  <div class="example-row">
    <Switch checked error name="switch-validation">
      Default
      <template #end-text>Supporting text</template>
    </Switch>
    <Switch error name="switch-validation" orientation="vertical">
      Stack
      <template #end-text>Supporting text</template>
    </Switch>
  </div>
</template>
