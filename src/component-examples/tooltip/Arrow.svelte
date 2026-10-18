<script lang="ts">
  import { Button, Tooltip, TooltipContent } from "opui-css/svelte"
</script>

<Tooltip arrow id="tooltip-arrow-1">
  <Button
    interestfor="tooltip-arrow-1"
    commandfor="tooltip-arrow-1"
    command="toggle-popover">Save</Button
  >
  <TooltipContent>Save your changes</TooltipContent>
</Tooltip>
