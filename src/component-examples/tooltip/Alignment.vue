<script setup lang="ts">
import { Button, Tooltip } from "opui-css/vue"
</script>

<template>
<div class="tooltip-alignment-grid">
  <Tooltip label="Above" alignment="block-start" id="tooltip-top">
    <Button
      interestfor="tooltip-top"
      commandfor="tooltip-top"
      command="toggle-popover">Top</Button
    >
  </Tooltip>
  <Tooltip label="Before" alignment="inline-start" id="tooltip-start">
    <Button
      interestfor="tooltip-start"
      commandfor="tooltip-start"
      command="toggle-popover">Start</Button
    >
  </Tooltip>
  <Tooltip label="After" alignment="inline-end" id="tooltip-end">
    <Button
      interestfor="tooltip-end"
      commandfor="tooltip-end"
      command="toggle-popover">End</Button
    >
  </Tooltip>
  <Tooltip label="Below" alignment="block-end" id="tooltip-bottom">
    <Button
      interestfor="tooltip-bottom"
      commandfor="tooltip-bottom"
      command="toggle-popover">Bottom</Button
    >
  </Tooltip>
</div>

<style>
  .tooltip-alignment-grid {
    display: grid;
    gap: var(--size-3);
    grid-template-areas:
      ".     top    .  "
      "start .      end"
      ".     bottom .  ";
    justify-items: center;
    align-items: center;
  }

  .tooltip-alignment-grid > :nth-child(1) {
    grid-area: top;
  }
  .tooltip-alignment-grid > :nth-child(2) {
    grid-area: start;
  }
  .tooltip-alignment-grid > :nth-child(3) {
    grid-area: end;
  }
  .tooltip-alignment-grid > :nth-child(4) {
    grid-area: bottom;
  }
</style>
</template>
