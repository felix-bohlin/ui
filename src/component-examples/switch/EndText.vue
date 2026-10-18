<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-end-text" endText="Supporting text"> Default </Switch>
  <Switch name="switch-end-text" stack endText="Supporting text">
    Stack
  </Switch>
</template>
