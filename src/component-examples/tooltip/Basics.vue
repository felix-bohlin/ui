<script setup lang="ts">
import { Button, Tooltip } from "opui-css/vue"
</script>

<template>
<Tooltip label="Save your changes" id="tooltip-basic">
  <Button
    interestfor="tooltip-basic"
    commandfor="tooltip-basic"
    command="toggle-popover">Save</Button
  >
</Tooltip>
</template>
