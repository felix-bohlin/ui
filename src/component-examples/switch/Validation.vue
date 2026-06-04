<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <div class="example-row ui-spacious">
    <Switch required>Default</Switch>
    <Switch required stack>Stack</Switch>
  </div>

  <div class="example-row ui-spacious">
    <Switch error>
      Default
      <template #end-text>Supporting text</template>
    </Switch>
    <Switch error stack>
      Stack
      <template #end-text>Supporting text</template>
    </Switch>
  </div>
</template>
