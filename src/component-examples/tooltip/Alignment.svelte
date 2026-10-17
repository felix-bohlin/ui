<script lang="ts">
  import { Button, Tooltip, TooltipContent } from "opui-css/svelte"
</script>

<div class="tooltip-alignment-grid">
  <Tooltip alignment="block-start" id="tooltip-alignment-1">
    <Button
      interestfor="tooltip-alignment-1"
      commandfor="tooltip-alignment-1"
      command="toggle-popover">Top</Button
    >
    <TooltipContent>Above</TooltipContent>
  </Tooltip>
  <Tooltip alignment="inline-start" id="tooltip-alignment-2">
    <Button
      interestfor="tooltip-alignment-2"
      commandfor="tooltip-alignment-2"
      command="toggle-popover">Start</Button
    >
    <TooltipContent>Before</TooltipContent>
  </Tooltip>
  <Tooltip alignment="inline-end" id="tooltip-alignment-3">
    <Button
      interestfor="tooltip-alignment-3"
      commandfor="tooltip-alignment-3"
      command="toggle-popover">End</Button
    >
    <TooltipContent>After</TooltipContent>
  </Tooltip>
  <Tooltip alignment="block-end" id="tooltip-alignment-4">
    <Button
      interestfor="tooltip-alignment-4"
      commandfor="tooltip-alignment-4"
      command="toggle-popover">Bottom</Button
    >
    <TooltipContent>Below</TooltipContent>
  </Tooltip>
</div>

<style>
  :global {
    .tooltip-alignment-grid {
      align-items: center;
      display: grid;
      gap: var(--size-3);
      grid-template-areas:
        ".     top    .  "
        "start .      end"
        ".     bottom .  ";
      justify-items: center;
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
  }
</style>
