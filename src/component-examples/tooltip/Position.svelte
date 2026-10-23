<script lang="ts">
  import { Button, Tooltip, TooltipContent } from "opui-css/svelte"
</script>

<div class="example-compass">
  <Tooltip positionArea="block-start" id="tooltip-position-1">
    <Button
      interestfor="tooltip-position-1"
      commandfor="tooltip-position-1"
      command="toggle-popover">Top</Button
    >
    <TooltipContent>Above</TooltipContent>
  </Tooltip>
  <Tooltip positionArea="inline-start" id="tooltip-position-2">
    <Button
      interestfor="tooltip-position-2"
      commandfor="tooltip-position-2"
      command="toggle-popover">Start</Button
    >
    <TooltipContent>Before</TooltipContent>
  </Tooltip>
  <Tooltip positionArea="inline-end" id="tooltip-position-3">
    <Button
      interestfor="tooltip-position-3"
      commandfor="tooltip-position-3"
      command="toggle-popover">End</Button
    >
    <TooltipContent>After</TooltipContent>
  </Tooltip>
  <Tooltip positionArea="block-end" id="tooltip-position-4">
    <Button
      interestfor="tooltip-position-4"
      commandfor="tooltip-position-4"
      command="toggle-popover">Bottom</Button
    >
    <TooltipContent>Below</TooltipContent>
  </Tooltip>
</div>
