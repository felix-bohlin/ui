<script lang="ts">
  import { Button } from "@opui/svelte"
  import { Tooltip } from "@opui/svelte"
</script>

<Tooltip label="Save your changes" id="tooltip-basic">
  <Button
    interestfor="tooltip-basic"
    commandfor="tooltip-basic"
    command="toggle-popover">Save</Button
  >
</Tooltip>
