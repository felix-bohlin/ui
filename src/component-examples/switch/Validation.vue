<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <div class="example-row ui-spacious">
    <Switch name="switch-validation" required>Default</Switch>
    <Switch name="switch-validation" required stack>Stack</Switch>
  </div>

  <div class="example-row ui-spacious">
    <Switch name="switch-validation" error>
      Default
      <template #end-text>Supporting text</template>
    </Switch>
    <Switch name="switch-validation" error stack>
      Stack
      <template #end-text>Supporting text</template>
    </Switch>
  </div>
</template>
