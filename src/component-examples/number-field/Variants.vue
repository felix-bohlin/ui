<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField for="number-field-variants-1" label="Guests">
    <input id="number-field-variants-1" type="number" value="1" />
  </NumberField>
  <NumberField for="number-field-variants-2" label="Nights" variant="filled">
    <input id="number-field-variants-2" type="number" value="1" />
  </NumberField>
</template>
