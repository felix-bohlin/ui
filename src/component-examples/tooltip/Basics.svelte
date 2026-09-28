<script lang="ts">
  import { Button, Tooltip } from "@opui/svelte"
</script>

<Tooltip label="Save your changes" id="tooltip-basic">
  <Button
    {...{ interestfor: "tooltip-basic" }}
    commandfor="tooltip-basic"
    command="toggle-popover">Save</Button
  >
</Tooltip>
