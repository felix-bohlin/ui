<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-variants" checked hideLabel>Label</Switch>
  <Switch name="switch-variants" hideLabel>Label</Switch>
  <Switch name="switch-variants" checked disabled hideLabel>Label</Switch>
  <Switch name="switch-variants" disabled hideLabel>Label</Switch>
</template>
