<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-spread" spread value="notifications">
    Notifications
    <template #end-text>Receive alerts when someone mentions you.</template>
  </Switch>

  <Switch name="switch-spread" required spread value="two-step-login">
    Two-step login
    <template #end-text>Your organization requires it for admins.</template>
  </Switch>

  <Switch disabled name="switch-spread" spread value="location">
    Location access
    <template #end-text>Turned off by your administrator.</template>
  </Switch>

  <Switch error name="switch-spread" spread value="backup">
    Cloud backup
    <template #end-text
      >Sync needs cloud backup. Turn it on to continue.</template
    >
  </Switch>
</template>
