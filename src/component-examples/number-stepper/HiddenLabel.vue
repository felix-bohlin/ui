<script setup lang="ts">
import { NumberStepper } from "opui-css/vue"
</script>

<template>
  <NumberStepper
    hideLabel
    id="number-stepper-hidden-label-1"
    label="Quantity"
    :min="1"
    :value="1"
  />
</template>
