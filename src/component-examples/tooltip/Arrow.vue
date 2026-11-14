<script setup lang="ts">
import { Button, Tooltip, TooltipContent } from "opui-css/vue"
</script>

<template>
  <Tooltip arrow id="tooltip-arrow-1">
    <Button aria-describedby="tooltip-arrow-1" interestfor="tooltip-arrow-1"
      >Save</Button
    >
    <TooltipContent>Save your changes</TooltipContent>
  </Tooltip>
</template>
