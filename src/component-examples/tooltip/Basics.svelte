<script lang="ts">
  import { Button, Tooltip, TooltipContent } from "opui-css/svelte"
</script>

<Tooltip id="tooltip-basics-1">
  <Button
    interestfor="tooltip-basics-1"
    commandfor="tooltip-basics-1"
    command="toggle-popover">Save</Button
  >
  <TooltipContent>Save your changes</TooltipContent>
</Tooltip>
