<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>

<template>
  <div style="display: grid; gap: var(--size-4); max-inline-size: 14rem">
    <div style="display: grid; gap: var(--size-1)">
      <p>Wrap</p>
      <ToggleGroup name="overflow-wrap">
        <ToggleButton value="all">Everything</ToggleButton>
        <ToggleButton value="mentions">Mentions</ToggleButton>
        <ToggleButton value="none">Nothing at all</ToggleButton>
      </ToggleGroup>
    </div>
    <div style="display: grid; gap: var(--size-1)">
      <p>Scroll</p>
      <ToggleGroup name="overflow-scrollable" scrollable>
        <ToggleButton value="all">Everything</ToggleButton>
        <ToggleButton value="mentions">Mentions</ToggleButton>
        <ToggleButton value="none">Nothing at all</ToggleButton>
      </ToggleGroup>
    </div>
    <div style="display: grid; gap: var(--size-1)">
      <p>Shrink</p>
      <ToggleGroup name="overflow-shrink" shrink>
        <ToggleButton value="all">Everything</ToggleButton>
        <ToggleButton value="mentions">Mentions</ToggleButton>
        <ToggleButton value="none">Nothing at all</ToggleButton>
      </ToggleGroup>
    </div>
  </div>
</template>
