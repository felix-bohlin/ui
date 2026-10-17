<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Switch name="switch-sizes" size="x-small" checked hideLabel
      >x-small</Switch
    >
    <Switch name="switch-sizes" size="small" checked hideLabel>Small</Switch>
    <Switch name="switch-sizes" checked hideLabel>Default</Switch>
    <Switch name="switch-sizes" size="large" checked hideLabel>Large</Switch>
  </div>
  <div class="example-row">
    <Switch name="switch-sizes" size="x-small" checked>x-small</Switch>
    <Switch name="switch-sizes" size="small" checked>Small</Switch>
    <Switch name="switch-sizes" checked>Default</Switch>
    <Switch name="switch-sizes" size="large" checked>Large</Switch>
  </div>
</template>
