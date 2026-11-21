<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField for="number-field-stretch-1" label="Quantity" stretch>
    <input
      id="number-field-stretch-1"
      max="10"
      min="1"
      type="number"
      value="1"
    />
  </NumberField>
</template>
