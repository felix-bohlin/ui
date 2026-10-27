<script setup lang="ts">
import { Button, Tooltip, TooltipContent } from "opui-css/vue"
</script>

<template>
  <Tooltip id="tooltip-rich-content-1">
    <Button interestfor="tooltip-rich-content-1">Keyboard shortcuts</Button>
    <TooltipContent>
      Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
    </TooltipContent>
  </Tooltip>
</template>
