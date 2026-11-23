<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Switch name="switch-sizes" small checked hideLabel>Small</Switch>
    <Switch name="switch-sizes" checked hideLabel>Default</Switch>
  </div>
  <div class="example-row">
    <Switch name="switch-sizes" small checked>Small</Switch>
    <Switch name="switch-sizes" checked>Default</Switch>
  </div>
</template>
