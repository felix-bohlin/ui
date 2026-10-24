<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>

<template>
  <ToggleGroup name="view" orientation="vertical">
    <ToggleButton value="day"> Day </ToggleButton>
    <ToggleButton value="week" checked> Week </ToggleButton>
    <ToggleButton value="month"> Month </ToggleButton>
  </ToggleGroup>
</template>
