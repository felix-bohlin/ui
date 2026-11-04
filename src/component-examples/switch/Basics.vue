<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch checked hideLabel name="switch-basics">Label</Switch>
  <Switch hideLabel name="switch-basics">Label</Switch>
  <Switch checked disabled hideLabel name="switch-basics">Label</Switch>
  <Switch disabled hideLabel name="switch-basics">Label</Switch>
</template>
