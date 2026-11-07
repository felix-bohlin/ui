<script setup lang="ts">
import { ToggleButton } from "opui-css/vue"
</script>

<template>
  <ToggleButton disabled name="disabled-demo-1">Disabled</ToggleButton>
  <ToggleButton aria-disabled="true" name="disabled-demo-2">
    Aria-disabled
  </ToggleButton>
</template>
