<script setup lang="ts">
import { Button, Tooltip } from "opui-css/vue"
</script>

<template>
<Tooltip id="tooltip-rich">
  <Button
    interestfor="tooltip-rich"
    commandfor="tooltip-rich"
    command="toggle-popover">Keyboard shortcuts</Button
  >
  <template #content>
    Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
  </template>
</Tooltip>
</template>
