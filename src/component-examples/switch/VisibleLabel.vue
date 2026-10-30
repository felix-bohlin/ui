<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-visible-label">Label</Switch>
  <Switch disabled name="switch-visible-label">Disabled</Switch>
  <Switch name="switch-visible-label">
    Long text bacon ipsum dolor amet prosciutto tenderloin biltong leberkas
    ribeye short ribs shankle tri-tip doner buffalo chislic meatloaf meatball.
  </Switch>
</template>
