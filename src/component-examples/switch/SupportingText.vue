<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
<Switch>
  Default
  <template #end-text>Supporting text</template>
</Switch>
<Switch stack>
  Stack
  <template #end-text>Supporting text</template>
</Switch>
</template>
