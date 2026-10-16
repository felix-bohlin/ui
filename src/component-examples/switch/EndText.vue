<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-supporting-text">
    Default
    <template #end-text>Supporting text</template>
  </Switch>
  <Switch name="switch-supporting-text" stack>
    Stack
    <template #end-text>Supporting text</template>
  </Switch>
</template>
