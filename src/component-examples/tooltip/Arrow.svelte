<script lang="ts">
  import { Button } from "@opui/svelte"
  import { Tooltip } from "@opui/svelte"
</script>

<Tooltip arrow label="Save your changes" id="tooltip-arrow">
  <Button
    interestfor="tooltip-arrow"
    commandfor="tooltip-arrow"
    command="toggle-popover">Save</Button
  >
</Tooltip>
