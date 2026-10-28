<script setup lang="ts">
import { NumberStepper } from "opui-css/vue"
</script>

<template>
  <NumberStepper
    id="number-stepper-stretch-1"
    label="Quantity"
    :max="10"
    :min="1"
    stretch
    :value="1"
  />
</template>
