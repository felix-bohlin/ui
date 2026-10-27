<script setup lang="ts">
import { NumberStepper } from "opui-css/vue"
</script>

<template>
  <NumberStepper id="number-stepper-variants-1" label="Outlined" :value="1" />
  <NumberStepper
    id="number-stepper-variants-2"
    label="Filled"
    :value="1"
    variant="filled"
  />
</template>
