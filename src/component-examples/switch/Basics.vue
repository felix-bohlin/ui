<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch checked hideLabel name="switch-basics" value="wifi">Wi-Fi</Switch>
  <Switch hideLabel name="switch-basics" value="bluetooth">Bluetooth</Switch>
  <Switch checked disabled hideLabel name="switch-basics" value="location"
    >Location</Switch
  >
  <Switch disabled hideLabel name="switch-basics" value="airplane-mode"
    >Airplane mode</Switch
  >
</template>
