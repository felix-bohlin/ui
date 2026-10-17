<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>

<template>
  <ToggleGroup selection="single" name="view" orientation="vertical">
    <ToggleButton value="day">Day</ToggleButton>
    <ToggleButton value="week" pressed>Week</ToggleButton>
    <ToggleButton value="month">Month</ToggleButton>
  </ToggleGroup>
</template>
