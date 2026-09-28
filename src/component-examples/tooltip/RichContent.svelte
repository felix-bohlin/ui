<script lang="ts">
  import { Button } from "@opui/svelte"
  import { Tooltip } from "@opui/svelte"
</script>

<Tooltip id="tooltip-rich">
  <Button
    interestfor="tooltip-rich"
    commandfor="tooltip-rich"
    command="toggle-popover">Keyboard shortcuts</Button
  >
  {#snippet content()}
    Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
  {/snippet}
</Tooltip>
