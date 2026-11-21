<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField for="number-field-sizes-1" label="X-small" size="x-small">
    <input id="number-field-sizes-1" type="number" value="1" />
  </NumberField>
  <NumberField for="number-field-sizes-2" label="Small" size="small">
    <input id="number-field-sizes-2" type="number" value="1" />
  </NumberField>
  <NumberField for="number-field-sizes-3" label="Medium">
    <input id="number-field-sizes-3" type="number" value="1" />
  </NumberField>
  <NumberField for="number-field-sizes-4" label="Large" size="large">
    <input id="number-field-sizes-4" type="number" value="1" />
  </NumberField>
</template>
