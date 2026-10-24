<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Switch name="switch-validation" required>Default</Switch>
    <Switch name="switch-validation" required orientation="vertical"
      >Stack</Switch
    >
  </div>

  <div class="example-row">
    <Switch name="switch-validation" error checked>
      Default
      <template #end-text>Supporting text</template>
    </Switch>
    <Switch name="switch-validation" error orientation="vertical">
      Stack
      <template #end-text>Supporting text</template>
    </Switch>
  </div>
</template>
