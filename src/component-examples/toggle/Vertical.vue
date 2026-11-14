<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>

<template>
  <ToggleGroup aria-label="View" name="view" orientation="vertical">
    <ToggleButton value="day">Day</ToggleButton>
    <ToggleButton checked value="week">Week</ToggleButton>
    <ToggleButton value="month">Month</ToggleButton>
  </ToggleGroup>
</template>
