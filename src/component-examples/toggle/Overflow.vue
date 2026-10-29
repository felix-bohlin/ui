<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>

<template>
  <div style="display: grid; gap: var(--ui-space-4); max-inline-size: 14rem">
    <div style="display: grid; gap: var(--ui-space-1)">
      <p>Wrap</p>
      <ToggleGroup multiple name="overflow-wrap">
        <ToggleButton value="all">Everything</ToggleButton>
        <ToggleButton value="mentions">Mentions</ToggleButton>
        <ToggleButton value="none">Nothing at all</ToggleButton>
      </ToggleGroup>
    </div>
    <div style="display: grid; gap: var(--ui-space-1)">
      <p>Scroll</p>
      <ToggleGroup multiple name="overflow-scroll" overflow="scroll">
        <ToggleButton value="all">Everything</ToggleButton>
        <ToggleButton value="mentions">Mentions</ToggleButton>
        <ToggleButton value="none">Nothing at all</ToggleButton>
      </ToggleGroup>
    </div>
    <div style="display: grid; gap: var(--ui-space-1)">
      <p>Shrink</p>
      <ToggleGroup multiple name="overflow-shrink" overflow="shrink">
        <ToggleButton value="all">Everything</ToggleButton>
        <ToggleButton value="mentions">Mentions</ToggleButton>
        <ToggleButton value="none">Nothing at all</ToggleButton>
      </ToggleGroup>
    </div>
  </div>
</template>
