<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField for="number-field-validation-1" label="Bandmates">
    <input id="number-field-validation-1" min="1" required type="number" />
  </NumberField>
  <NumberField
    endText="Only 4 sets of flatwounds left, whoops."
    for="number-field-validation-2"
    label="Quantity"
  >
    <input
      aria-describedby="number-field-validation-2-end-text"
      aria-invalid="true"
      id="number-field-validation-2"
      min="1"
      type="number"
      value="6"
    />
  </NumberField>
</template>
