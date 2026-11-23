<script setup lang="ts">
import { Button, Tooltip } from "opui-css/vue"
</script>

<template>
  <Tooltip arrow label="Save your changes" id="tooltip-arrow">
    <Button
      interestfor="tooltip-arrow"
      commandfor="tooltip-arrow"
      command="toggle-popover"
      >Save</Button
    >
  </Tooltip>
</template>
