<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch checked hideLabel>Label</Switch>
  <Switch hideLabel>Label</Switch>
  <Switch checked disabled hideLabel>Label</Switch>
  <Switch disabled hideLabel>Label</Switch>
</template>
