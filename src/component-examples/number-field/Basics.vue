<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField for="number-field-basics-1" label="Quantity">
    <input
      id="number-field-basics-1"
      max="10"
      min="1"
      type="number"
      value="1"
    />
  </NumberField>
</template>
