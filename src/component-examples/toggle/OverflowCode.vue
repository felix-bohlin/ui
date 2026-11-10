<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>

<template>
  <ToggleGroup aria-label="Notifications" name="overflow-wrap">
    <ToggleButton value="all">Everything</ToggleButton>
    <ToggleButton value="mentions">Mentions</ToggleButton>
    <ToggleButton value="none">Nothing at all</ToggleButton>
  </ToggleGroup>
  <ToggleGroup
    aria-label="Notifications"
    name="overflow-scroll"
    overflow="scroll"
  >
    <ToggleButton value="all">Everything</ToggleButton>
    <ToggleButton value="mentions">Mentions</ToggleButton>
    <ToggleButton value="none">Nothing at all</ToggleButton>
  </ToggleGroup>
  <ToggleGroup
    aria-label="Notifications"
    name="overflow-shrink"
    overflow="shrink"
  >
    <ToggleButton value="all">Everything</ToggleButton>
    <ToggleButton value="mentions">Mentions</ToggleButton>
    <ToggleButton value="none">Nothing at all</ToggleButton>
  </ToggleGroup>
</template>
