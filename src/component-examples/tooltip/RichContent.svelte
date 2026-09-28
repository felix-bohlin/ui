<script lang="ts">
  import { Button, Tooltip } from "@opui/svelte"
</script>

<Tooltip id="tooltip-rich">
  <Button
    {...{ interestfor: "tooltip-rich" }}
    commandfor="tooltip-rich"
    command="toggle-popover">Keyboard shortcuts</Button
  >
  {#snippet content()}
    Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
  {/snippet}
</Tooltip>
