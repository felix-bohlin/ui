<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField
    endText="Up to 8 per table."
    for="number-field-spread-1"
    label="Guests"
    spread
    startText="Count children too."
  >
    <input
      aria-describedby="number-field-spread-1-start-text number-field-spread-1-end-text"
      id="number-field-spread-1"
      max="8"
      min="1"
      type="number"
      value="2"
    />
  </NumberField>
  <NumberField
    for="number-field-spread-2"
    label="Nights"
    spread
    startText="Check-out is at 11:00."
    variant="filled"
  >
    <input
      aria-describedby="number-field-spread-2-start-text"
      id="number-field-spread-2"
      max="14"
      min="1"
      type="number"
      value="3"
    />
  </NumberField>
</template>
