<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch endText="A summary every morning." name="switch-end-text">
    Daily digest
  </Switch>
  <Switch
    endText="Only when someone mentions you."
    name="switch-end-text"
    orientation="vertical"
  >
    Mentions
  </Switch>
</template>
