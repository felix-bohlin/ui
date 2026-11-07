<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField id="number-field-validation-1" label="Seats" :min="1" required />
  <NumberField
    endText="Only 4 left in stock."
    error
    id="number-field-validation-2"
    label="Quantity"
    :min="1"
    :value="6"
  />
</template>
