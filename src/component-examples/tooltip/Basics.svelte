<script lang="ts">
  import { Button, Tooltip, TooltipContent } from "opui-css/svelte"
</script>

<Tooltip id="tooltip-basic">
  <Button
    interestfor="tooltip-basic"
    commandfor="tooltip-basic"
    command="toggle-popover">Save</Button
  >
  <TooltipContent>Save your changes</TooltipContent>
</Tooltip>
