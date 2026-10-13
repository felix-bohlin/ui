<script setup lang="ts">
import { Button, Tooltip, TooltipContent } from "opui-css/vue"
</script>

<template>
  <Tooltip id="tooltip-rich">
    <Button
      interestfor="tooltip-rich"
      commandfor="tooltip-rich"
      command="toggle-popover"
      >Keyboard shortcuts</Button
    >
    <TooltipContent>
      Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
    </TooltipContent>
  </Tooltip>
</template>
