<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-spread" spread>
    Notifications
    <template #end-text>Receive alerts when someone mentions you.</template>
  </Switch>

  <Switch name="switch-spread" required spread>
    Required
    <template #end-text>You must accept this to proceed.</template>
  </Switch>

  <Switch disabled name="switch-spread" spread>
    Disabled
    <template #end-text>This switch is disabled.</template>
  </Switch>

  <Switch error name="switch-spread" spread>
    Invalid Switch
    <template #end-text>Turn this on to continue.</template>
  </Switch>
</template>
