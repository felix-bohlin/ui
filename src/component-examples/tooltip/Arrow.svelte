<script lang="ts">
  import { Button, Tooltip, TooltipContent } from "opui-css/svelte"
</script>

<Tooltip arrow id="tooltip-arrow-1">
  <Button aria-describedby="tooltip-arrow-1" interestfor="tooltip-arrow-1"
    >Save</Button
  >
  <TooltipContent>Save your changes</TooltipContent>
</Tooltip>
