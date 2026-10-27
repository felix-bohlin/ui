<script setup lang="ts">
import { NumberStepper } from "opui-css/vue"
</script>

<template>
  <NumberStepper
    endText="Up to 8 per table."
    id="number-stepper-end-text-1"
    label="Guests"
    :max="8"
    :min="1"
    :value="2"
  />
</template>
