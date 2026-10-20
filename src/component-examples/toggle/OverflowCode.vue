<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>

<template>
  <ToggleGroup name="overflow-wrap">
    <ToggleButton value="all">Everything</ToggleButton>
    <ToggleButton value="mentions">Mentions</ToggleButton>
    <ToggleButton value="none">Nothing at all</ToggleButton>
  </ToggleGroup>
  <ToggleGroup name="overflow-scrollable" scrollable>
    <ToggleButton value="all">Everything</ToggleButton>
    <ToggleButton value="mentions">Mentions</ToggleButton>
    <ToggleButton value="none">Nothing at all</ToggleButton>
  </ToggleGroup>
  <ToggleGroup name="overflow-shrink" shrink>
    <ToggleButton value="all">Everything</ToggleButton>
    <ToggleButton value="mentions">Mentions</ToggleButton>
    <ToggleButton value="none">Nothing at all</ToggleButton>
  </ToggleGroup>
</template>
