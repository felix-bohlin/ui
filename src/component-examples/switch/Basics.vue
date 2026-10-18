<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-basics" checked hideLabel>Label</Switch>
  <Switch name="switch-basics" hideLabel>Label</Switch>
  <Switch name="switch-basics" checked disabled hideLabel>Label</Switch>
  <Switch name="switch-basics" disabled hideLabel>Label</Switch>
</template>
