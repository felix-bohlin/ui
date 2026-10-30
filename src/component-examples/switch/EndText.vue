<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch endText="Supporting text" name="switch-end-text"> Default </Switch>
  <Switch
    endText="Supporting text"
    name="switch-end-text"
    orientation="vertical"
  >
    Stack
  </Switch>
</template>
