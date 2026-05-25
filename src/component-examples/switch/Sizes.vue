<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
<div class="example-row">
  <Switch small checked hideLabel>Small</Switch>
  <Switch checked hideLabel>Default</Switch>
</div>
<div class="example-row">
  <Switch small checked>Small</Switch>
  <Switch checked>Default</Switch>
</div>
</template>
