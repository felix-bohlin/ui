<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-end-text">
    Default
    <template #end-text>Supporting text</template>
  </Switch>
  <Switch name="switch-end-text" stack>
    Stack
    <template #end-text>Supporting text</template>
  </Switch>
</template>
