<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField
    hideLabel
    id="number-field-hidden-label-1"
    label="Quantity"
    :min="1"
    :value="1"
  />
</template>
