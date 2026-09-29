<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-spread" spread>
    Notifications
    <template #end-text>Receive alerts when someone mentions you.</template>
  </Switch>

  <Switch name="switch-spread" spread required>
    Required
    <template #end-text>You must accept this to proceed.</template>
  </Switch>

  <Switch name="switch-spread" spread disabled>
    Disabled
    <template #end-text>This switch is disabled.</template>
  </Switch>

  <Switch name="switch-spread" spread error>
    Invalid Switch
    <template #end-text>There is an error with this switch.</template>
  </Switch>
</template>
