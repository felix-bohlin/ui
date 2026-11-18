<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Switch name="switch-validation" required>Two-step login</Switch>
    <Switch name="switch-validation" orientation="vertical" required
      >Usage reports</Switch
    >
  </div>

  <div class="example-row">
    <Switch checked error name="switch-validation">
      Public profile
      <template #end-text
        >Your organization keeps profiles private. Turn it off.</template
      >
    </Switch>
    <Switch error name="switch-validation" orientation="vertical">
      Cloud backup
      <template #end-text
        >Sync needs cloud backup. Turn it on to continue.</template
      >
    </Switch>
  </div>
</template>
