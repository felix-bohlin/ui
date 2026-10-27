<script setup lang="ts">
import { NumberStepper } from "opui-css/vue"
</script>

<template>
  <NumberStepper
    id="number-stepper-step-1"
    label="Opacity"
    :max="1"
    :min="0"
    :step="0.1"
    :value="0.5"
  />
</template>
