<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
<div class="example-row spacious">
  <Switch required>Default</Switch>
  <Switch required stack>Stack</Switch>
</div>

<div class="example-row spacious">
  <Switch critical>
    Default
    <template #end-text>Supporting text</template>
  </Switch>
  <Switch critical stack>
    Stack
    <template #end-text>Supporting text</template>
  </Switch>
</div>
</template>
