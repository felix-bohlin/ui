<script setup lang="ts">
import { NumberField } from "opui-css/vue"
</script>

<template>
  <NumberField
    id="number-field-basics-1"
    label="Quantity"
    :max="10"
    :min="1"
    :value="1"
  />
</template>
