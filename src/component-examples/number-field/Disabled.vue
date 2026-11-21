<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField for="number-field-disabled-1" label="Quantity">
    <input disabled id="number-field-disabled-1" type="number" value="1" />
  </NumberField>
</template>
